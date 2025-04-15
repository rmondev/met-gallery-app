'use client'
import React, {useEffect} from 'react'
import Image from 'next/image'
import MetFacadeImage from '@/public/Metropolitan_Museum_of_Art_(The_Met)_-_Central_Park,_NYC.jpg'


export default function Home() {



  return (
    <main className='flex flex-col h-screen w-full bg-white'>
      <section className='flex justify-center items-center'>
        <Image
          src={MetFacadeImage}
          alt="Logo"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full max-w-[300px] h-auto"
        />
      </section>
    </main>
  );
}
