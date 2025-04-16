'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ArtworkCard = ({ objectId }) => {
  const [cardData, setCardData] = useState(null)

  useEffect(() => {
    const fetchObjectData = async () => {
      try {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`)
        const data = await response.json()
        setCardData(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchObjectData()
  }, [objectId])

  if (!cardData) return null

  return (


    <div className='flex flex-col border-2 rounded border-red-600 justify-start items-start gap-2 p-4'>
      {/* Image */}
     
      <section className='w-full flex justify-center items-center'>
        {cardData.primaryImageSmall ? (
            <img
            alt='artwork'
            src={cardData.primaryImageSmall}
            width={200}
            height={300}
            style={{ height: 'auto' }}
            className='border border-red-600'
            />
        ) : (
            <img
            alt='Not available'
            src='https://placehold.co/240x150?text=Not+Available&font=roboto'
            width={200}
            height={300}
            style={{ height: 'auto' }}
            className='border border-red-600'
          />
        )}
      </section>
    

    {/* Details */}

        <section className='flex flex-col justify-start items-start text-left gap-2'>
            <h2><strong>Title: </strong>{cardData.title || 'N/A'}</h2>
            <p><strong>Date:</strong> {cardData.objectDate || 'N/A'}</p>
            <p><strong>Classification:</strong> {cardData.classification || 'N/A'}</p>
            <p><strong>Medium:</strong> {cardData.medium || 'N/A'}</p>

            
        </section>

    {/* Button pinned bottom-left */}
        <Link
            href={`/artwork/${objectId}`}
        >
            <button className='cursor-pointer px-4 py-2 border-2 rounded bg-white border-red-600 text-red-600 hover:bg-red-600 hover:text-white'>
            Details
            </button>
        </Link>
    </div>
  )
}

export default ArtworkCard
