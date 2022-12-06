import { useContext } from "react"
import { GolemContext, GolemState } from "../components/Golem"

export const useGolem = (): GolemState => {
    const gc = useContext(GolemContext)
    return gc
}