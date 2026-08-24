export type AdminSettings = {
  store: {
    storeName: string
    supportEmail: string
    supportPhone: string
    businessNumber: string
  }
  shipping: {
    defaultShippingFee: number
    freeShippingThreshold: number
    defaultCarrier: string
    returnShippingFee: number
    shippingAddress: string
    returnAddress: string
  }
  account: {
    displayName: string | null
    email: string
    avatarUrl: string | null
  }
}
