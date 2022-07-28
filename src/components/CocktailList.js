import React, { useEffect } from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'
import { Link } from 'react-router-dom'
const CocktailList = () => {
  const {
    isLoading,
    isError,
    isEmpty,
    fetchCocktails,
    cocktailsList,
    searchValue,
  } = useGlobalContext()
  useEffect(() => {
    fetchCocktails()
  }, [searchValue, fetchCocktails])
  if (isLoading) return <Loading />
  else if (isError)
    return (
      <section className='section error-page'>
        <div className='error-container'>
          <h1>oops! can't fetch cocktails</h1>
          <button onClick={fetchCocktails} className='btn btn-primary'>
            retry
          </button>
        </div>
      </section>
    )
  else if (isEmpty)
    return (
      <section className='section'>
        <h2 className='section-title'>
          No Cocktails Matched Your Search Criteria
        </h2>
      </section>
    )
  else
    return (
      <section className='section'>
        <h2 className='section-title'>cocktails</h2>
        <div className='cocktails-center'>
          {cocktailsList.map((cocktail) => {
            return <Cocktail key={cocktail.id} {...cocktail} />
          })}
        </div>
      </section>
    )
}

export default CocktailList
