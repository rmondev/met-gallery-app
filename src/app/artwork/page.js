'use client'
import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'next/navigation';
import validObjectIDList from '@/public/data/validObjectIDList.json'

const Artwork = () => {

    const [data, setData] = useState()
    const [artworkList, setArtworkList] = useState();

    const PER_PAGE = 12;
    const searchParams = useSearchParams();
    const title = searchParams.get('title');
    const query = searchParams.get('q');
    const finalQuery = `title=${title}&q=${query}`

    


    useEffect(()=>{
        if (finalQuery) {
            const fetchData = async () =>{ 
            const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`)
            const data = await response.json()
            setData(data)
            }
            fetchData()
        }
    })
        
   
    useEffect(()=>{
        if (data) {
            let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
            let results = []
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
            }

            setArtworkList(results)
            console.log(results)
        }
    },[data])
    
    

  return (
    <div>
    
    </div>
  )
}

export default Artwork
