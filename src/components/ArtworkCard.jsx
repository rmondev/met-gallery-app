import React, {useEffect, useState} from 'react'

const ArtworkCard = ({objectId}) => {


    useEffect(() => {
        fetchObjectData = async () => {
            try {
                let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`)
                let data = response.json
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
    }, [])

  return (
    <div>
      
    </div>
  )
}

export default ArtworkCard
