import { createContext } from "react"

import type { Profile } from "./types"

export type ProfileContextValue = {
  profile: Profile
  setProfile: React.Dispatch<React.SetStateAction<Profile>>
}

export const ProfileContext = createContext<ProfileContextValue | null>(null)
