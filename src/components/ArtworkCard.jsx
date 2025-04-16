'use client'
import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import ArtworkCard from '@/components/ArtworkCard'

const ArtworkCard = ({objectId}) => {

    const [cardData, setCardData] = useState(null)
    useEffect(() => {
        fetchObjectData = async () => {
            try {
                let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`)
                let data = response.json()
                console.log(data)
                setCardData(data)
            } catch (error) {
                console.log(error)
            }

            fetchObjectData()
        }
    }, [objectId])

    if (!cardData) return null

  return (
    <>
    {cardData && (
        // Card Container
        <div className='flex flex-col border-2 rounded border-red-600 justify-center items-center gap-2'>
            {/* Image Container */}
            <section className='flex justify-center items-center'>
                {data?.primaryImageSmall ? 
                <Image
                alt='artwork-image'
                src={data?.primaryImageSmall}
                width={'18rem'}
                />
                :
                <Image
                alt='image-not-available'
                src='https://placehold.co/200x300?text=Not+Available&font=roboto'
                width={'18rem'}
                />
                }
            </section>

            {/* Card Body Container */}
            <section>
                {/* Card Title */}
                {data?.title ?
                    <h2>{data?.title}</h2>
                    :
                    <h2>N/A</h2>
                }
                {/* Card Text Container */}
                <div>
                    {data?.objectDate ? <p><strong>Date: </strong>{data?.objectDate}</p> : <p><strong>Data: </strong>N/A</p>}
                    {data?.classification ? <p><strong>Classification: </strong>{data?.classification}</p> : <p><strong>Classification: </strong>N/A</p>}
                    {data?.medium ? <p><strong>Classification: </strong>{data?.medium}</p> : <p><strong>Medium: </strong>N/A</p>}
                </div>

            </section>
        </div>
    )}
    </>
  )
}

export default ArtworkCard
