'use client'
import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'next/navigation';

const Artwork = () => {

    const searchParams = useSearchParams();
    const title = searchParams.get('title');
    const query = searchParams.get('q');
    const finalQuery = `title=${title}&q=${query}`

    const [data, setData] = useState()


    useEffect(()=> {
        if (finalQuery) {
            
            const fetchData = async () =>{ 
            const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`)
            const data = await response.json()
            console.log(data)
            setData(data)
         }
        fetchData()
        }
    }, [finalQuery])
  return (
    <div>
    
    </div>
  )
}

export default Artwork
