"use client"

import { useEffect } from "react"

import {
  getCustomerCart,
  mergeCustomerCart,
  saveCustomerCart,
} from "../api/cart-client.api"
import { useCartStore } from "../store/use-cart-store"
import { isSameCartItems } from "./is-same-cart-items"
import { useCartHydration } from "./use-cart-hydration"

const SAVE_DELAY = 300

const useCartSession = (userId: string | null) => {
  const hasHydrated = useCartHydration()

  useEffect(() => {
    if (!hasHydrated) return

    let cancelled = false
    let saveTimer: ReturnType<typeof setTimeout> | undefined
    let isSaving = false
    let saveQueued = false
    let unsubscribe: () => void = () => undefined

    const initializeSession = async () => {
      const store = useCartStore.getState()
      store.setSessionReady(false)

      if (!userId) {
        if (store.ownerId) store.resetCart()
        useCartStore.getState().setSessionReady(true)
        return
      }

      try {
        const response =
          store.ownerId === null
            ? await mergeCustomerCart(store.items)
            : store.ownerId === userId && store.isDirty
              ? await saveCustomerCart(store.items)
              : await getCustomerCart()

        if (cancelled) return

        useCartStore.getState().replaceCart(response.items, userId)
      } catch (error) {
        console.error("[web-cart] Cart session initialization failed", error)
      } finally {
        if (!cancelled) useCartStore.getState().setSessionReady(true)
      }

      if (cancelled) return

      const saveLatestCart = async () => {
        saveQueued = true
        if (isSaving) return

        isSaving = true

        while (saveQueued && !cancelled) {
          saveQueued = false
          const snapshot = useCartStore.getState()
          const needsMerge = snapshot.ownerId === null

          if (!needsMerge && (snapshot.ownerId !== userId || !snapshot.isDirty)) {
            continue
          }

          try {
            const response = needsMerge
              ? await mergeCustomerCart(snapshot.items)
              : await saveCustomerCart(snapshot.items)
            if (cancelled) break

            const current = useCartStore.getState()
            if (isSameCartItems(current.items, snapshot.items)) {
              current.replaceCart(response.items, userId)
            } else {
              saveQueued = true
            }
          } catch (error) {
            console.error("[web-cart] Cart save failed", error)
          }
        }

        isSaving = false
      }

      const scheduleSave = () => {
        if (saveTimer) clearTimeout(saveTimer)
        saveTimer = setTimeout(() => void saveLatestCart(), SAVE_DELAY)
      }

      unsubscribe = useCartStore.subscribe((state, previousState) => {
        if (
          (state.ownerId === null ||
            (state.ownerId === userId && state.isDirty)) &&
          state.items !== previousState.items
        ) {
          scheduleSave()
        }
      })

      window.addEventListener("online", scheduleSave)

      unsubscribe = (() => {
        const unsubscribeStore = unsubscribe

        return () => {
          unsubscribeStore()
          window.removeEventListener("online", scheduleSave)
        }
      })()
    }

    void initializeSession()

    return () => {
      cancelled = true
      if (saveTimer) clearTimeout(saveTimer)
      unsubscribe()
    }
  }, [hasHydrated, userId])
}

export { useCartSession }
