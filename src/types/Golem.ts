import { createContext } from 'react'
import { User } from '@auth0/auth0-spa-js'

export enum GolemStage {
    Pending = 0,
    Authenticating = 1,
    Error = 2,
    Complete = 3
}

export type GolemState = {
    stage: GolemStage
    user?: User
    token?: string
    error?: Error
}

export const GOLEM_DEFAULT_STATE: GolemState = {
    stage: GolemStage.Pending,
    user: undefined,
    token: undefined,
    error: undefined
}

export const GolemContext = createContext<GolemState>(GOLEM_DEFAULT_STATE)
