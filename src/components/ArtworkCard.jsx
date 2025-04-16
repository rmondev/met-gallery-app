'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

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
    <div className='flex flex-col border-2 rounded border-red-600 justify-center items-center gap-2 p-4'>
      {/* Image */}
      <section>
        {cardData.primaryImageSmall ? (
            <img
            alt='artwork'
            src={cardData.primaryImageSmall}
            width={200}
            height={300}
            style={{ height: 'auto' }}
            />
        ) : (
            <img
            alt='Not available'
            src='https://placehold.co/200x300?text=Not+Available&font=roboto'
            width={200}
            height={300}
            style={{ height: 'auto' }}
          />
        )}
      </section>

      {/* Details */}
      <section className='flex flex-col justify-start text-left gap-2'>
        <h2 className='font-bold'>Title: {cardData.title || 'N/A'}</h2>
        <p><strong>Date:</strong> {cardData.objectDate || 'N/A'}</p>
        <p><strong>Classification:</strong> {cardData.classification || 'N/A'}</p>
        <p><strong>Medium:</strong> {cardData.medium || 'N/A'}</p>
      </section>
    </div>
  )
}

export default ArtworkCard
