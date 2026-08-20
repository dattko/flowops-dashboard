"use client"

import { createContext, useContext, useState } from "react"

import type { Profile } from "../model/types"

type ProfileContextValue = {
  profile: Profile
  setProfile: React.Dispatch<React.SetStateAction<Profile>>
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

type ProfileProviderProps = {
  initialProfile: Profile
  children: React.ReactNode
}

const ProfileProvider = ({
  initialProfile,
  children,
}: ProfileProviderProps) => {
  const [profile, setProfile] = useState(initialProfile)

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

const useProfile = () => {
  const context = useContext(ProfileContext)

  if (!context) {
    throw new Error("useProfile은 ProfileProvider 안에서 사용해야 합니다.")
  }

  return context
}

export { ProfileProvider, useProfile }
