"use client"

import { useState } from "react"

import type { CustomerProfile } from "@/entities/customer"

import type { CustomerDetailData } from "../model/types"

const useCustomerDetail = (initialCustomer: CustomerDetailData) => {
  const [customer, setCustomer] = useState(initialCustomer)
  const updateCustomer = (updatedCustomer: CustomerProfile) => {
    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      ...updatedCustomer,
    }))
  }

  return {
    customer,
    updateCustomer,
  }
}

export { useCustomerDetail }
