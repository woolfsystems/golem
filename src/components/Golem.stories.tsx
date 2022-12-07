import React, { useContext, useEffect } from 'react'
import { useGolem } from '../hooks/useGolem'
import { Golem } from './Golem'

export default {
  component: Golem,
  title: 'Golem'
}

export const Inactive = ()=>
  <Golem>
    <div>test</div>
  </Golem>

export const NoConfig = ()=>{
  const gc = useGolem()
  useEffect(()=>{
    console.log('GC',gc)
  },[gc])
  return <Golem requireAuth>
    <div>test</div>
  </Golem>
}

const ValidChild = ()=>{
  const gc = useGolem()
  
  useEffect(()=>{
    console.log('GC',gc)
  },[gc])
  return <div>test</div>
}

export const Valid = ()=>{
  

  return <Golem loader={<div>loading...</div>} requireAuth getToken config={{
    domain: 'fnord.eu.auth0.com',
    clientId: 'x4fUKiuDY8cetGbvsWIBnI1Hnoash5cS'
  }}>
  <ValidChild />
  </Golem>
}
