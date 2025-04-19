'use client'
import React, { useEffect } from 'react'
import ArtworkCard from '@/components/ArtworkCard'
import { favouritesAtom } from '@/store'
import { useAtom } from 'jotai'
import { getFavourites } from '@/lib/userData'
import { getToken } from '@/lib/authenticate'
import { useRouter } from 'next/navigation'

const Favourites = () => {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    if (!token) {
      console.warn('🔒 No token found, redirecting to login')
      router.push('/login')
      return
    }

    // Only fetch if atom is not already populated
    if (!favouritesList || favouritesList.length === 0) {
      getFavourites()
        .then((data) => {
          console.log('✅ Re-fetched favourites:', data)
          setFavouritesList(data || [])
        })
        .catch((err) => {
          console.error('❌ Error loading favourites:', err.message)
          router.push('/login') // fallback if token is invalid
        })
    }
  }, [favouritesList, router, setFavouritesList])

  console.log('/favourites Render Faves:', favouritesList)

  return (
    <main className='flex flex-col items-center min-h-screen w-full mt-10'>
      <div className='p-4'>
        <h1 className='text-2xl text-red-600 font-bold mb-4'>Favourites</h1>

        {favouritesList && favouritesList.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {favouritesList.map((id) => (
              <ArtworkCard key={id} objectId={id} />
            ))}
          </div>
        ) : (
          <div className='flex flex-row p-4'>
            <h1>No Favourites</h1>
          </div>
        )}
      </div>
    </main>
  )
}

export default Favourites
