import React from 'react'
import './Movie-filter.css'
import PropTypes from 'prop-types'

const MovieFilter = ({ onRated, page, onSearch }) => {
  return (
    <div className="movie-filter">
      <button className="movie-filter__button-search movie-filter__buttons" onClick={onSearch}>
        Search
      </button>
      <button className="movie-filter__button-rated movie-filter__buttons" onClick={() => onRated(page)}>
        Rated
      </button>
    </div>
  )
}

MovieFilter.defaultProp = {
  onRated: () => {},
  page: 0,
  onSearch: () => {},
}

MovieFilter.propTypes = {
  onRated: PropTypes.func,
  page: PropTypes.number,
  onSearch: PropTypes.func,
}
export { MovieFilter }
