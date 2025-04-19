"use client"
import React, {useEffect} from 'react'
import { useAtom } from 'jotai'
import { searchHistoryAtom } from '@/store'
import { getHistory } from '@/lib/userData'
import { getToken } from '@/lib/authenticate'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const parseQueryString = (queryString) => {
    const params = new URLSearchParams(queryString)
    return {
      searchBy: params.get("title") === "true"
        ? "Title"
        : params.get("tags") === "true"
        ? "Tags"
        : params.get("artistOrCulture") === "true"
        ? "Artist or Culture"
        : "Unknown",
      geoLocation: params.get("geoLocation") || "-",
      medium: params.get("medium") || "-",
      isOnView: params.get("isOnView") === "on" ? "Yes" : "No",
      isHighlight: params.get("isHighlight") === "on" ? "Yes" : "No",
      query: params.get("q") || "-",
    }
  }

const History = () => {

    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const router = useRouter()

     useEffect(() => {
        const token = getToken()
        if (!token) {
          console.warn('🔒 No token found, redirecting to login')
          router.push('/login')
          return
        }
    
        // Only fetch if atom is not already populated
        if (!searchHistory || searchHistory.length === 0) {
          getHistory()
            .then((data) => {
              console.log('✅ Re-fetched history:', data)
              setSearchHistory(data || [])
            })
            .catch((err) => {
              console.error('❌ Error loading history:', err.message)
              router.push('/login') // fallback if token is invalid
            })
        }
      }, [])

      
    
  return (
    <main className='flex flex-col items-center min-h-screen w-full mt-10'>
      <div className='p-4 w-full max-w-6xl'>
        <h1 className='text-2xl text-red-600 font-bold mb-4'>Search History</h1>

        {searchHistory && searchHistory.length > 0 ? (
         <div className='w-full overflow-x-auto'>
         <table className='min-w-[700px] md:min-w-full table-auto border border-slate-400 text-left text-sm md:text-base'>
           <thead className='bg-slate-100 text-slate-800 font-semibold'>
             <tr>
               <th className='p-2 border'>Search By</th>
               <th className='p-2 border'>GeoLocation</th>
               <th className='p-2 border'>Medium</th>
               <th className='p-2 border'>Is On View?</th>
               <th className='p-2 border'>Highlighted?</th>
               <th className='p-2 border'>Query</th>
             </tr>
           </thead>
           <tbody>
             {searchHistory.map((queryString, index) => {
               const row = parseQueryString(queryString)
               return (
                 <tr
                   key={index}
                   onClick={() => router.push(`/artwork?${queryString}`)}
                   className='cursor-pointer hover:bg-red-100 even:bg-slate-50 transition-colors duration-200'
                 >
                   <td className='p-2 border'>{row.searchBy}</td>
                   <td className='p-2 border'>{row.geoLocation}</td>
                   <td className='p-2 border'>{row.medium}</td>
                   <td className='p-2 border'>{row.isOnView}</td>
                   <td className='p-2 border'>{row.isHighlight}</td>
                   <td className='p-2 border text-blue-700 underline'>{row.query}</td>
                 </tr>
               )
             })}
           </tbody>
         </table>
       </div>
       
        ) : (
          <div className='flex flex-row p-4'>
            <h1>No History</h1>
          </div>
        )}
      </div>
    </main>
  )
}

export default History
