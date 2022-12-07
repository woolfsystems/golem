import React, { useEffect, useState } from 'react'
import { Auth0ClientOptions } from '@auth0/auth0-spa-js'
import { getUser } from '../lib/auth0GetUser'
import { GolemContext, GolemStage, GolemState, GOLEM_DEFAULT_STATE } from '../types/Golem'

interface GolemProps{
    requireAuth?: boolean
    getToken?: boolean
    config?: Auth0ClientOptions
    children?: React.ReactNode
    fallback?: JSX.Element
    loader?: JSX.Element
}

export const Golem = ({ children, fallback, loader, requireAuth = false, config}: GolemProps) => {
    const [golemState,setGolemState] = useState<GolemState>(GOLEM_DEFAULT_STATE)
    
    useEffect(()=>{
        if(requireAuth){
            if(config!==undefined){
                setGolemState({
                    ...golemState,
                    stage: GolemStage.Authenticating
                })
                getUser(config).then((user)=>{
                    console.log('user',user)
                    setGolemState({
                        ...golemState,
                        user,
                        stage: GolemStage.Complete
                    })
                }).catch((e)=>{
                    setGolemState({
                        ...golemState,
                        error: e.toString(),
                        stage: GolemStage.Error
                    })        
                })
            }
            else
                throw "Auth0 config missing"
        }else{
            setGolemState({
                ...golemState,
                stage: GolemStage.Complete
            })
        }
    },[requireAuth])
    
    return golemState.stage===GolemStage.Authenticating
            ? loader || <></>
            : <GolemContext.Provider value={golemState}>
                {golemState.stage===GolemStage.Complete
                    ? children
                    : fallback}
            </GolemContext.Provider>
}