import React from 'react'
import './Movie-filter.css'

const MovieFilter = () => {
  return (
    <div className="movie-filter">
      <button className="movie-filter__button-search movie-filter__buttons">Search</button>
      <button className="movie-filter__button-rated movie-filter__buttons">Rated</button>
    </div>
  )
}
export { MovieFilter }
