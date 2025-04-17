import React from 'react'

const Search = () => {
  return (
    <main className='flex flex-col w-3/4'>
        <form className='flex flex-col justify-start text-start'>
            {/* Search Query Container */}
            <div className='flex flex-col'>
                <label>Search Query</label>             
                <input type='text' name='searchQuery'></input>
            </div>

            {/* Search Options Container */}
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col'>
                    <label>Search Query</label>             
                    <input type='text' name='searchBy'></input>
                </div>

                <div className='flex flex-col'>
                    <label>Search Query</label>             
                    <input type='text' name='geoLocation'></input>
                </div>

                <div className='flex flex-col'>
                    <label>Search Query</label>             
                    <input type='text' name='medium'></input>
                </div>
            </div>

            {/* Checkbox Options Container */}
            <div className='flex flex-col'>
                <input type='checkbox' name='highlighted'></input>
                <input type='checkbox' name='currentlyOnView'></input>
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
