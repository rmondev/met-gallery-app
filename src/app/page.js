'use client'
import React, {useEffect} from 'react'
import Image from 'next/image'
import MetFacadeImage from '@/public/Metropolitan_Museum_of_Art_(The_Met)_-_Central_Park,_NYC.jpg'


export default function Home() {



  return (

   
    
    <main className='flex flex-col min-h-screen w-full bg-white pt-12'>
      {/* Title Container */}
      <div className='flex justify-center items-center text-center bg-transparent mt-10'>
          <p className='font-gideon font-bold text-red-600 text-5xl'>The Metropolitan Museum of Art</p>
      </div>
      {/* Image Container */}
      <section className='flex justify-center items-center m-10'>
        <Image
          src={MetFacadeImage}
          alt="Logo"
          width={0}
          height={0}
          sizes="100vw"
          priority
          className="w-full max-w-[1150px] h-auto rounded-2xl"
        />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-10 px-6 py-12 max-w-[1500px] mx-auto">
        {/* Column 1 */}
        <div>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Explore the Collection</h2>
          <p className="text-gray-700 leading-relaxed">
            Dive into one of the world’s largest and most diverse art collections. The Met houses over two million works spanning 5,000 years of human history. From ancient artifacts to contemporary masterpieces, discover the stories that shaped civilizations.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Visit The Met</h2>
          <p className="text-gray-700 leading-relaxed">
            Dive into one of the world&#39;s largest and most diverse art collections. The Met houses over two million works spanning 5,000 years of human history. From ancient artifacts to contemporary masterpieces, discover the stories that shaped civilizations.
          </p>
        </div>

        {/* Column 3 */}
        <div>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">About The Met</h2>
          <p className="text-gray-700 leading-relaxed">
          Explore over two million artworks at The Met, spanning 5,000 years of history — from ancient artifacts to modern masterpieces.          </p>
        </div>

        {/* Column 4 */}
        <div>
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Met History</h2>
          <p className="text-gray-700 leading-relaxed">
          Founded in 1870, The Met aims to bring art and education to the public. Its vast collection spans ancient to modern works, including European Old Masters, American art, and global pieces from Africa, Asia, and the Islamic world. Highlights include musical instruments, costumes, armor, and reconstructed historical interiors.          </p>
        </div>
      </section>
    </main>
  );
}
