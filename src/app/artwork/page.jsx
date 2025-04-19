import React, { Suspense } from 'react'
import ArtworkClientComponent from './ArtworkClientComponent'

export default function ArtworkPage() {
  return (
    <Suspense fallback={<p className="p-6">Loading...</p>}>
      <ArtworkClientComponent />
    </Suspense>
  )
}