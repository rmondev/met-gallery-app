'use client'
import React from 'react'
import {useRouter} from 'next/navigation'
import { toast } from 'react-toastify'
import { registerUser } from '@/lib/authenticate'

const Register = () => {

  const router = useRouter()
  
   const handleSubmit = async (formData) => {
          let user = formData.get('user')
          let pass = formData.get('pass')
          let passConfirm = formData.get('passConfirm')
          
          console.log(`Login Info: (User): ${user} (Pass): ${pass} (PassConfirm): ${passConfirm}`)
  
          try {
            await registerUser(user, pass, passConfirm);
            toast.success(`Successfully Registered ${user}!`)
            router.push('/login');
          } catch (error) {
            toast.error(error.message)
          }

      }
  return (
    <main className='flex flex-col max-h-screen w-full bg-white pt-12'>
      <section className='flex flex-col justify-center items-center mt-10 gap-6'>
      {/* Login Header */}
      <header className='flex flex-col border w-11/12 p-6 gap-2 rounded border-slate-600 bg-slate-50'>
        <h1 className='text-3xl'>Register</h1>
        <h2>Register for A New Account</h2>
      </header>

      {/* Login Form */}
      <form 
        className='flex flex-col border w-11/12 rounded border-slate-600 bg-slate-50'
        action={handleSubmit}>
        {/* Inputs Container */}
        <section className='flex flex-col gap-8 p-6 '>
            {/* Username Input */}
            <div className='flex flex-col gap-2'>
                <label className='text-xl'>
                    Username
                </label>
                <input className='border border-slate-300 bg-white h-10 p-4'
                    // placeholder='Search'
                    type='text'
                    name='user'
                    autoComplete="username"
                    required
                >
                </input>
            </div>
            {/* Password Container */}
            <div className='flex flex-col gap-2'>
                <label className='text-xl'>
                    Password
                </label>
                <input className='border border-slate-300 bg-white h-10 p-4'
                    // placeholder='Search'
                    type='password'
                    name='pass'
                    autoComplete="current-password"
                    required
                >
                </input>
            </div>

            {/* Password Confirm Container */}
            <div className='flex flex-col gap-2'>
                <label className='text-xl'>
                    Confirm Password
                </label>
                <input className='border border-slate-300 bg-white h-10 p-4'
                    // placeholder='Search'
                    type='password'
                    name='passConfirm'
                    autoComplete="current-password"
                    required
                >
                </input>
            </div>

            {/* Submit Button Container */}
            <div>
                <button type='submit' className='text-red-600 hover:text-white border-2 rounded mr-2 w-30 border-red-600 bg-white hover:bg-red-600  h-10'>
                    Register
                </button>
            </div>
        </section>
      </form>


      {/* Login Form */}
      </section>

    </main>
  )
}

export default Register
