"use client"

import { baseApiFetcherClient } from "@/shared/api/base/base-fetcher-client"

import type { CartItem, CartItemPayload, CartResponse } from "../model/types"

const createCartPayload = (items: CartItem[]) => ({
  p_items: items.map<CartItemPayload>((item) => ({
    productId: item.id,
    quantity: item.quantity,
  })),
})

const getCustomerCart = () =>
  baseApiFetcherClient.post<CartResponse>("/rest/v1/rpc/get_customer_cart")

const mergeCustomerCart = (items: CartItem[]) =>
  baseApiFetcherClient.post<CartResponse>(
    "/rest/v1/rpc/merge_customer_cart",
    createCartPayload(items),
  )

const saveCustomerCart = (items: CartItem[]) =>
  baseApiFetcherClient.post<CartResponse>(
    "/rest/v1/rpc/save_customer_cart",
    createCartPayload(items),
  )

export { getCustomerCart, mergeCustomerCart, saveCustomerCart }
