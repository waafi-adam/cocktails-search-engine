import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const { setSearchValue } = useGlobalContext()
  return (
    <section className='section search'>
      <form className='search-form'>
        <div className='form-control'>
          <label htmlFor='name'>search your favorite cocktail</label>
          <input
            id='name'
            name='name'
            type='text'
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
          />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
