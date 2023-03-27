import React from 'react'
import './Movie-filter.css'

const MovieFilter = (props) => {
  return (
    <div className="movie-filter">
      <button className="movie-filter__button-search movie-filter__buttons" onClick={props.onSearch}>
        Search
      </button>
      <button className="movie-filter__button-rated movie-filter__buttons" onClick={props.onRated}>
        Rated
      </button>
    </div>
  )
}
export { MovieFilter }
