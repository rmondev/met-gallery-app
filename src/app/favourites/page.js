'use client'
import React from 'react'
import ArtworkCard from '@/components/ArtworkCard'
import { favouritesAtom } from '@/store'
import { useAtom } from 'jotai'

const Favourites = () => {


    
    const [ favouritesList, setFavouritesList ] = useAtom(favouritesAtom, [])

    

    // if( !favouritesList ) return null;
    
  return (

    <main className='flex flex-col items-center h-screen w-full mt-10'>
      <div className='p-4'>
      <h1 className='text-2xl text-red-600 font-bold mb-4'>Favourites</h1>
      {favouritesList ? (
        <>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {favouritesList && favouritesList.map(id => (
                <ArtworkCard key={id} objectId={id} />
            ))}
        </div>
        </>
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
