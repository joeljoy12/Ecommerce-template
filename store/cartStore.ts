"use client"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartItem {
  _id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        const exists = get().items.find((i) => i._id === item._id)
        if (exists) {
          set({
            items: get().items.map((i) =>
              i._id === item._id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          })
        } else {
          set({ items: [...get().items, item] })
        }
      },

      removeFromCart: (id) =>
        set({ items: get().items.filter((i) => i._id !== id) }),

      updateQuantity: (id, qty) =>
        set({
          items: get().items.map((i) =>
            i._id === id ? { ...i, quantity: qty } : i
          ),
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // key in localStorage
    }
  )
)
