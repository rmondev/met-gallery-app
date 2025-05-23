'use client'
import React from 'react'
import { authenticateUser } from '@/lib/authenticate'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { favouritesAtom, searchHistoryAtom } from '@/store'
import { useAtom } from 'jotai'
import { getHistory, getFavourites } from "@/lib/userData";

const Login = () => {

    const router = useRouter()
    const [searchHistory, setSearchHistory ] = useAtom(searchHistoryAtom);
    const [favouritesList, setFavouritesList ] = useAtom(favouritesAtom);

    async function updateAtoms() {
        const faves = await getFavourites();
        const history = await getHistory();
        console.log("Fetched faves:", faves);
        console.log("Fetched history:", history);
        setFavouritesList(faves); 
        setSearchHistory(history);
    }

    const handleSubmit = async (formData) => {
        let user = formData.get('user')
        let pass = formData.get('pass')

       

        try {
            await authenticateUser(user, pass)

            console.log(`Before atom updated (faves): ${favouritesList} (history): ${searchHistory}`)
            await updateAtoms()
            console.log(`After atom updated (faves): ${favouritesList} (history): ${searchHistory}`)
            toast.success(`${user} Successfully Logged In!`)
            router.push('/')
        } catch(error) {
            toast.error(error.message)
        }
    }

  return (
    <main className='flex flex-col min-h-screen w-full bg-white pt-12'>
      <section className='flex flex-col justify-center items-center mt-10 gap-6'>
      {/* Login Header */}
      <header className='flex flex-col border w-11/12 p-6 gap-2 rounded border-slate-600 bg-slate-50'>
        <h1 className='text-3xl'>Login</h1>
        <h2>Enter your login information below</h2>
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

            {/* Submit Button Container */}
            <div>
                <button type='submit' className='cursor-pointer text-red-600 hover:text-white border-2 rounded mr-2 w-30 border-red-600 bg-white hover:bg-red-600  h-10'>
                    Login
                </button>
            </div>
        </section>
      </form>


      {/* Login Form */}
      </section>

    </main>
  )
}

export default Login
