import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
import { useGlobalContext } from '../context'

const SingleCocktail = () => {
  const { fetchCocktail, cocktail, isLoading, isError, isEmpty } =
    useGlobalContext()
  const { cocktailId } = useParams()
  useEffect(() => {
    fetchCocktail(cocktailId)
  }, [cocktailId, fetchCocktail])
  const {
    id,
    name,
    category,
    image,
    info,
    ingredients,
    instructions,
    glassType,
  } = cocktail
  if (isLoading) return <Loading />
  else if (isError)
    return (
      <section className='section error-page'>
        <div className='error-container'>
          <h1>oops! can't fetch cocktail</h1>
          <button onClick={fetchCocktail} className='btn btn-primary'>
            retry
          </button>
        </div>
      </section>
    )
  else if (isEmpty)
    return (
      <section className='section'>
        <h2 className='section-title'>No such Cocktail exist</h2>
      </section>
    )
  else
    return (
      <section className='section cocktail-section'>
        <Link className='btn btn-primary' to='/'>
          back home
        </Link>
        <h2 className='section-title'>{name}</h2>
        <div className='drink'>
          <img src={image} alt={name} />
          <div className='drink-info'>
            <p>
              <span className='drink-data'>name:</span>
              {name}
            </p>
            <p>
              <span className='drink-data'>category:</span>
              {category}
            </p>
            <p>
              <span className='drink-data'>info:</span>
              {info}
            </p>
            <p>
              <span className='drink-data'>glass:</span>
              {glassType}
            </p>
            <p>
              <span className='drink-data'>instrucitons:</span>
              {instructions}
            </p>
            <p>
              <span className='drink-data'>ingredients:</span>
              {ingredients && ingredients.join(', ')}
            </p>
          </div>
        </div>
      </section>
    )
}

export default SingleCocktail
