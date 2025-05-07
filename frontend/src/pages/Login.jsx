import React, { useState } from 'react'
import { useContext } from 'react'
import { NewsContext } from '../context/NewsContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const {backendUrl, token, setToken, setUserData} = useContext(NewsContext)
  const navigate = useNavigate()

  const [state, setState] = React.useState('Sign Up')

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')

  const onSubmitHandler = async (event) => {
      event.preventDefault()


      try {
        
        if(state === 'Sign Up')
        {
            console.log({ name, email, password });
          const {data} = await axios.post(backendUrl + '/api/user/register', {name, email, password})

          if(data.success){
            localStorage.setItem('token', data.token)
            setToken(data.token)
            setUserData(data.user)
            localStorage.setItem('user', JSON.stringify(data.user))
          }
          else{
            toast.error(data.message)
          }
        }

        else{
          const {data} = await axios.post(backendUrl + '/api/user/login', {email, password})

          if(data.success){
            localStorage.setItem('token', data.token)
            setToken(data.token)
            setUserData(data.user)
            localStorage.setItem('user', JSON.stringify(data.user))
          }
          else{
            toast.error(data.message)
          }
        }

      } catch (error) {
        toast.error(error.message)
      }
  }

  useEffect(() => {

    if(token){
        console.log("token set:", token)
       navigate('/')
    }

  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p>Please {state === 'Sign Up' ? "Sign Up" : "log in"} to create notes</p>
        {
          state === 'Sign Up' && <div className='w-full'>
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} required/>
        </div>
        }
        

        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
        </div>
        
        <button type='submit' className='bg-primary text-black border rounded-md w-full py-2 text-base cursor-pointer'>{state === 'Sign Up' ? "Create Account" : "Login"}</button>
        {
          state === 'Sign Up' ? (
            <p className='text-sm'>Already have an account? <span className='text-primary underline cursor-pointer' onClick={() => setState('Login')}>Login</span></p>
          ) : (
            <p className='text-sm'>Don't have an account? <span className='text-primary underline cursor-pointer' onClick={() => setState('Sign Up')}>Sign Up</span></p>
          )
        }
      </div>
        
    </form>
  )
}

export default Login