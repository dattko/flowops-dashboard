"use client"

import { useEffect, useSyncExternalStore } from "react"

import { useCartStore } from "../store/use-cart-store"

const useCartHydration = () => {
  const hasHydrated = useSyncExternalStore(
    (onStoreChange) => {
      const persistApi = useCartStore.persist

      if (!persistApi) return () => undefined

      const unsubscribeHydrate = persistApi.onHydrate(onStoreChange)
      const unsubscribeFinishHydration =
        persistApi.onFinishHydration(onStoreChange)

      return () => {
        unsubscribeHydrate()
        unsubscribeFinishHydration()
      }
    },
    () => useCartStore.persist?.hasHydrated() ?? false,
    () => false,
  )

  useEffect(() => {
    const persistApi = useCartStore.persist

    if (persistApi && !persistApi.hasHydrated()) {
      void persistApi.rehydrate()
    }
  }, [])

  return hasHydrated
}

export { useCartHydration }
