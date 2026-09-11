"use client"

import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import type { Product } from "@/entities/product"

import type { CartItem } from "../model/types"

type CartStore = {
  items: CartItem[]
  ownerId: string | null
  isDirty: boolean
  isSessionReady: boolean
  addItem: (product: Product, quantity: number) => void
  updateQuantity: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  replaceCart: (items: CartItem[], ownerId: string) => void
  resetCart: () => void
  setSessionReady: (isReady: boolean) => void
}

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      ownerId: null,
      isDirty: false,
      isSessionReady: false,
      addItem: (product, quantity) => {
        if (product.soldOut || product.available <= 0 || quantity <= 0) return

        set((state) => {
          const currentItem = state.items.find((item) => item.id === product.id)
          const nextQuantity = Math.min(
            (currentItem?.quantity ?? 0) + quantity,
            product.available,
          )
          const nextItem: CartItem = {
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            available: product.available,
            label: product.label,
            tone: product.tone,
            quantity: nextQuantity,
          }

          return {
            items: currentItem
              ? state.items.map((item) =>
                  item.id === product.id ? nextItem : item,
                )
              : [...state.items, nextItem],
            isDirty: state.ownerId !== null,
          }
        })
      },
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? {
                  ...item,
                  quantity: Math.min(Math.max(quantity, 1), item.available),
                }
              : item,
          ),
          isDirty: state.ownerId !== null,
        }))
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
          isDirty: state.ownerId !== null,
        }))
      },
      clearCart: () =>
        set((state) => ({
          items: [],
          isDirty: state.ownerId !== null,
        })),
      replaceCart: (items, ownerId) =>
        set({ items, ownerId, isDirty: false }),
      resetCart: () => set({ items: [], ownerId: null, isDirty: false }),
      setSessionReady: (isSessionReady) => set({ isSessionReady }),
    }),
    {
      name: "morrow-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        ownerId: state.ownerId,
        isDirty: state.isDirty,
      }),
      skipHydration: true,
    },
  ),
)

export { useCartStore }
export type { CartStore }
