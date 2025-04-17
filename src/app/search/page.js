import React from 'react'

const Search = () => {
  return (
    <main className='flex flex-col items-center h-screen w-full'>
        <form className='flex flex-col border border-red-600 p-4 justify-start text-start w-3/4 mt-20 gap-6'>
            {/* Search Query Container */}
            <div className='flex flex-col'>
                <label>Search Query</label>             
                <input 
                    type='text' 
                    name='searchQuery'
                    className='border border-black'>  
                </input>
            </div>

            {/* Search Options Container */}
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col'>
                    <label>Search By</label>             
                    <select 
                        type='text' 
                        name='searchBy'
                        className='border border-black'>  
                    </select>
                </div>

                <div className='flex flex-col'>
                    <label>Geolocation</label>             
                    <input 
                        type='text' 
                        name='geoLocation'
                        className='border border-black'>
                    </input>
                </div>

                <div className='flex flex-col'>
                    <label>Medium</label>             
                    <input 
                        type='text' 
                        name='medium'
                        className='border border-black'>  
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
                <button type='submit'>
                    Submit
                </button>
            </div>
        </form>
    </main>
  )
}

export default Search
