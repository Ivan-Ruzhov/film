import React from 'react'
import './Movie-filter.css'

const MovieFilter = (props) => {
  const { onRated, id } = props
  return (
    <div className="movie-filter">
      <button className="movie-filter__button-search movie-filter__buttons" onClick={props.onSearch}>
        Search
      </button>
      <button className="movie-filter__button-rated movie-filter__buttons" onClick={() => onRated(id)}>
        Rated
      </button>
    </div>
  )
}
export { MovieFilter }
