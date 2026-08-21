"use client"

import { useState } from "react"

import { ProfileContext } from "../model/profile-context"
import type { Profile } from "../model/types"

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

export { ProfileProvider }
