'use client'
import React, {useEffect} from 'react'
import Image from 'next/image'
import MetFacadeImage from '@/public/Metropolitan_Museum_of_Art_(The_Met)_-_Central_Park,_NYC.jpg'


export default function Home() {



  return (
    <main className='flex flex-col h-screen w-full bg-white'>
      <section className='flex justify-center items-center m-10'>
        <Image
          src={MetFacadeImage}
          alt="Logo"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full max-w-[1150px] h-auto"
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
            Plan your visit to The Met in New York City. Stroll through iconic galleries, attend special exhibitions, and experience art like never before. Whether you're a lifelong art lover or a curious traveler, there's something here for everyone.
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
