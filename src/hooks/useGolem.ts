import { useContext } from "react"
import { GolemContext, GolemState } from "../types/Golem"

export const useGolem = (): GolemState => {
    const gc = useContext(GolemContext)
    return gc
}