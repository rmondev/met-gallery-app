'use client'
import React from 'react'
import ArtworkCardDetail from '@/components/ArtworkCardDetail'
import { useParams } from 'next/navigation'


const ArtworkDetails = () => {
    const { objectId } = useParams()
  return (
    <div>
        <ArtworkCardDetail objectId={objectId}/>
    </div>
  )
}

export default ArtworkDetails
