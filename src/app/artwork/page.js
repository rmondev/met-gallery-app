'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation';

const Artwork = () => {

    const searchParams = useSearchParams();
    const title = searchParams.get('title');
    const query = searchParams.get('q');

    const finalQuery = `title=${title}&q=${query}`
    console.log(finalQuery)
  return (
    <div>
      Title: {title}
    </div>
  )
}

export default Artwork
