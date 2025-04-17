import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const ArtworkCardDetail = ({objectId}) => {

    const [cardData, setCardData] = useState(null)
    let router = useRouter()
    
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

<h2>    <strong>Title: </strong>{cardData.title || 'N/A'}</h2>
        {/* Full-size image */}
        <section className='w-full flex justify-center items-center overflow-auto'>
            {cardData.primaryImage ? (
            <img
                alt='artwork'
                src={cardData.primaryImage}
                className='w-1/2 h-auto border border-red-600'
            />
            ) : (
            <img
                alt='Not available'
                src='https://placehold.co/300x200?text=Not+Available&font=roboto'
                className='w-1/2 h-auto border border-red-600'
            />
            )}
        </section>


         {/* Details */}

         <section className='flex flex-col justify-start items-start text-left gap-2'>
            {cardData.objectDate ? <p><strong>Date: </strong>{cardData.objectDate}</p> : <p><strong>Date: </strong>N/A</p>}
            {cardData.classification ?<p><strong>Classification: </strong>{cardData.classification}</p> : <p><strong>Classification: </strong>N/A</p>}
            {cardData.medium ? <p><strong>Medium: </strong>{cardData.medium}</p> : <p><strong>Medium: </strong>N/A</p>}

            {cardData.artistDisplayName ? <p><strong>Artist: </strong>{cardData.artistDisplayName}</p> : <p><strong>Artist: </strong>N/A</p>}
            {cardData.artistWikidata_URL ? 
                <p>
                    <strong>Wiki: </strong>
                    <Link href={cardData.artistWikidata_URL}>
                    <button className='cursor-pointer'>{cardData.artistDisplayName ? cardData.artistDisplayName : 'N/A'}
                        </button>
                    </Link>
                </p>
                : 
                <p><strong>Artist: </strong>N/A</p>}
            {cardData.creditLine ? <p><strong>Credit: </strong>{cardData.creditLine}</p> : <p><strong>Credit: </strong>N/A</p>}
            {cardData.dimensions ? <p><strong>Dimensions: </strong>{cardData.dimensions}</p> : <p><strong>Dimensions: </strong>N/A</p>}
            <br></br>
            <button className='cursor-pointer px-4 py-2 border-2 rounded bg-white border-red-600 text-red-600 hover:bg-red-600 hover:text-white'>+ Favourite (added)</button>
            
        </section>
    </div>
  )
}

export default ArtworkCardDetail
