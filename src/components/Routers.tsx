import axios from 'axios'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { Auth } from './pages/Auth'
import { Home } from './pages/Home'

export const Routers = () => {
  const dispatch = useAppDispatch()
  const {isAuth, token} = useAppSelector(state => state.userReducer)

  useEffect(() => {
    const authFetch = async () => {
      try {
        const res = await axios.post('auth', {token})
        console.log(res)
        if(res.status){
          dispatch()
        }
      } catch (error) {
        
      }

    }
    authFetch
  }, [])
  

  return (
    <Routes>
      {isAuth ? 
      <Route path='auth' element={<Auth />} />
      : <Route index element={<Home />} /> 
    }
    </Routes>
  )
}
