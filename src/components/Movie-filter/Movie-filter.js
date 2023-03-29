import React from 'react'
import './Movie-filter.css'
import PropTypes from 'prop-types'

const MovieFilter = ({ onRated, id, onSearch }) => {
  return (
    <div className="movie-filter">
      <button className="movie-filter__button-search movie-filter__buttons" onClick={onSearch}>
        Search
      </button>
      <button className="movie-filter__button-rated movie-filter__buttons" onClick={() => onRated(id)}>
        Rated
      </button>
    </div>
  )
}

MovieFilter.defaultProp = {
  onRated: () => {},
  id: '',
  onSearch: () => {},
}

MovieFilter.propTypes = {
  onRated: PropTypes.func,
  id: PropTypes.string,
  onSearch: PropTypes.func,
}
export { MovieFilter }
