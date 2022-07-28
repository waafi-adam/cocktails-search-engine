import React from 'react'
import { Link } from 'react-router-dom'

const Cocktail = ({ id, name, isAlcoholic, glassType, image }) => {
  return (
    <article className='cocktail'>
      <div className='img-container'>
        <img src={image} alt={name} />
      </div>
      <div className='cocktail-footer'>
        <h1>{name}</h1>
        <h4>{glassType}</h4>
        <p>{isAlcoholic}</p>
        <Link className='btn btn-primary btn-details' to={`/cocktail/${id}`}>
          details
        </Link>
      </div>
    </article>
  )
}

export default Cocktail
