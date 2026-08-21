"use client"

import { useContext } from "react"

import { ProfileContext } from "../model/profile-context"

export const useProfile = () => {
  const context = useContext(ProfileContext)

  if (!context) {
    throw new Error("useProfile은 ProfileProvider 안에서 사용해야 합니다.")
  }

  return context
}
