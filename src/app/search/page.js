'use client'
import React, {useState} from 'react'
import { useRouter } from 'next/navigation'

const Search = () => {

    
    const router = useRouter()
    
    const submitForm = async (formData) => {
        let q = formData.get('searchQuery')
        let searchBy =  formData.get('searchBy')
        let geoLocation = formData.get('geoLocation')
        let medium = formData.get('medium')
        let isHighlight = formData.get('highlighted')
        let isOnView = formData.get('currentlyOnView')

        let queryString = `${searchBy}=true`;

        if (geoLocation) queryString += `&geoLocation=${geoLocation}`;
        if (medium) queryString += `&medium=${medium}`;
        if (isOnView !== null && isOnView !== undefined) queryString += `&isOnView=${isOnView}`;
        if (isHighlight !== null && isHighlight !== undefined) queryString += `&isHighlight=${isHighlight}`;

        queryString += `&q=${q}`;


        console.log('The query string is: ', queryString)
        router.push(`/artwork?${queryString}`)

        // router.push(`/artwork?artistOrCulture=true&q=mother`)
    }

  return (
    <main className='flex flex-col items-center h-screen w-full mt-10 gap-6'>
        <header className='flex flex-col border w-3/4 p-6 gap-2 rounded border-slate-600 bg-slate-50'>
            <h1 className='text-3xl'>Advanced Search</h1>
            <h2>Enter Advanced Search Criteria</h2>
        </header>
        <form
            action={submitForm}
            className='flex flex-col rounded border border-slate-600 bg-slate-50 p-4 justify-start text-start w-3/4 gap-6'>
            {/* Search Query Container */}
            <div className='flex flex-col'>
                <label>Search Query</label>             
                <input 
                    type='text' 
                    name='searchQuery'
                    className='border rounded w-full text-black h-10 border-slate-300 bg-white p-4' 
                    required>
                </input>
            </div>

            {/* Search Options Container */}
            <div className='flex flex-row justify-between gap-2'>
                <div className='flex flex-col'>
                    <label>Search By</label>             
                    <select 
                        defaultValue=""
                        name="searchBy"
                        className="border rounded w-full h-10 border-slate-300 bg-white py-2"
                        >
                        <option value="" disabled hidden>
                            Select an Option
                        </option>
                        <option value="title">Title</option>
                        <option value="tags">Tags</option>
                        <option value="artistOrCulture">Artist or Culture</option>
                    </select>
                </div>

                <div className='flex flex-col'>
                    <label>Geolocation</label>             
                    <input 
                        type='text' 
                        name='geoLocation'
                        className='border rounded w-full text-black h-10 border-slate-300 bg-white p-4'>
                    </input>
                </div>

                <div className='flex flex-col'>
                    <label>Medium</label>             
                    <input 
                        type='text' 
                        name='medium'
                        className='border rounded w-full text-black h-10 border-slate-300 bg-white p-4'>  
                    </input>
                </div>
            </div>

            {/* Checkbox Options Container */}
            <div className='flex flex-col justify-start items-start gap-2'>
                <div className='flex flex-row gap-2 justify-center'>
                    <input type='checkbox' name='highlighted'></input>
                    <label>Highlighted</label>
                </div>
                <div className='flex flex-row gap-2 justify-center'>
                    <input type='checkbox' name='currentlyOnView'></input>
                    <label>Currently On View</label>
                </div>

            </div>
            
            {/* Submit Button Container */}
            <div>
                <button 
                    type='submit' 
                    className='text-red-600 hover:text-white border-2 rounded mr-2 w-30 border-red-600 bg-white hover:bg-red-600  h-10'
                    >
                        Search
                </button>
            </div>
        </form>
    </main>
  )
}

export default Search
