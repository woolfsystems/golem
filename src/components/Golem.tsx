import React, { createContext, useEffect, useState } from 'react'
import { Auth0ClientOptions, User } from '@auth0/auth0-spa-js'
import { getUser } from '../lib/getUser'

export type GolemState = {
  user?: User
  token?: string
  error?: Error
}

const defaultState: GolemState = {
    user: undefined,
    token: undefined,
    error: undefined
}

export const GolemContext = createContext<GolemState>(defaultState)

interface GolemProps{
    requireAuth?: boolean
    getToken?: boolean
    config?: Auth0ClientOptions
    children: React.ReactNode
}


export const Golem = ({ children, requireAuth = false, config}: GolemProps) => {
    const [golemState,setGolemState] = useState<GolemState>(defaultState)
    
    useEffect(()=>{
        if(requireAuth){
            if(config!==undefined){
                getUser(config).then((user)=>{
                    console.log('user',user)
                    setGolemState({
                        ...golemState,
                        user
                    })
                })
            }
            else
                throw "Auth0 config missing"
        }
    },[requireAuth])
    
    return (
        <GolemContext.Provider value={golemState}>
        {children}
        </GolemContext.Provider>
    )
}