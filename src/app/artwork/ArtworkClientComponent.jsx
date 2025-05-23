'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import validObjectIDList from '@/public/data/validObjectIDList.json'
import ArtworkCard from '@/components/ArtworkCard'

const ArtworkClientComponent = () => {
  const [data, setData] = useState(null)
  const [artworkList, setArtworkList] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  const PER_PAGE = 12
  const searchParams = useSearchParams()
  const title = searchParams.get('title')
  const query = searchParams.get('q')
  const finalQuery = `title=${title}&q=${query}`

  // Fetch object IDs from the Met API
  useEffect(() => {
    if (finalQuery) {
      const fetchData = async () => {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`)
        const data = await response.json()
        setData(data)
      }
      fetchData()
    }
  }, [finalQuery])

  // Paginate the filtered valid object IDs
  useEffect(() => {
    if (data?.objectIDs) {
      const filteredResults = validObjectIDList.objectIDs.filter(id =>
        data.objectIDs.includes(id)
      )
  
      if (filteredResults.length === 0) {
        setArtworkList([]) // trigger "No Results"
        return
      }
  
      const paginated = []
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        paginated.push(filteredResults.slice(i, i + PER_PAGE))
      }
  
      setArtworkList(paginated)
    }
  }, [data])
  

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < artworkList.length - 1) {
      setCurrentPage(prev => prev + 1)
    } else if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(prev => prev - 1)
    }
  }

  if (data && (!data.objectIDs || data.objectIDs.length === 0 || artworkList.length === 0)) {
    return (
      <div className='flex justify-center items-center h-64'>
        <h1 className='text-xl font-semibold text-gray-600'>No Results Found</h1>
      </div>
    )
  }

  return (

    
    <div className='p-4'>
      <h1 className='text-2xl text-red-600 font-bold mb-4'>Search Results</h1>

      {/* Artwork Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {artworkList.length > 0 && artworkList[currentPage].map(id => (
          <ArtworkCard key={id} objectId={id} />
        ))}
      </div>

      {/* Pagination Controls */}
      {artworkList.length > 1 && (
        <div className='flex justify-center items-center gap-4 mt-8'>
          <button
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 0}
            className='cursor-pointer px-4 py-2 border-2 rounded disabled:opacity-50 bg-white border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
          >
            Prev
          </button>
          <span>Page {currentPage + 1} of {artworkList.length}</span>
          <button
            onClick={() => handlePageChange('next')}
            disabled={currentPage === artworkList.length - 1}
            className='cursor-pointer px-4 py-2 border-2 rounded disabled:opacity-50 bg-white border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default ArtworkClientComponent
