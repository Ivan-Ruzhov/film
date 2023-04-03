import React from 'react'
import './Movie-item.css'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Rate } from 'antd'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { MovieConsumer } from '../Movie-service/Movie-service'

const MovieItem = (props) => {
  const { poster_path, original_title, release_date, overview, inRate, id, vote_average, genre_ids } = props
  const refactorDate = (date) => {
    if (date === '') {
      return 'No Release Data'
    }
    const newDate = date.split('-')
    if (newDate[1][0].includes(0)) {
      newDate.splice(1, 1, newDate[1][1])
    }
    if (newDate[2][0].includes(0)) {
      newDate.splice(2, 1, newDate[2][1])
    }
    return format(new Date(newDate), 'MMMM dd, yyyy', { locale: enGB })
  }
  const cutText = (text, limit) => {
    if (!text) {
      return 'Sorry this movie has no description'
    }
    const newText = text.trim()
    if (newText.split(' ').length < limit) {
      return newText
    } else {
      return newText.split(' ').splice(0, limit).join(' ') + ' ...'
    }
  }
  const classBorder = classNames('movie-item__rating', {
    'movie-item__rating_one': vote_average < 3,
    'movie-item__rating_two': vote_average < 5,
    'movie-item__rating_three': vote_average < 7,
    'movie-item__rating_four': vote_average > 7,
  })
  const onGenreFilms = (arr, id) => {
    if (!id) {
      return 'No genre'
    }
    const genre = arr.findIndex((el) => el.id === id)
    return arr[genre].name
  }
  return (
    <MovieConsumer>
      {(genre) => {
        return (
          <li className="movie-item">
            <div className="poster-container">
              {poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                  alt="Постер к фильму"
                  className="poster-container__image"
                />
              )}
              {!poster_path && (
                <img
                  src={'https://www.behance.net/gallery/45513057/Say-No-Poster'}
                  alt="Постер к фильму"
                  className="poster-container__image"
                />
              )}
            </div>
            <div className="movie-item__container">
              <div className="movie-item__container-one">
                <div className="movie-item__header">
                  <header className="movie-item__title">{cutText(original_title, 4)}</header>
                  <div className={classBorder}>{vote_average.toFixed(1)}</div>
                </div>
                <div className="movie-item__date-release">{refactorDate(release_date)}</div>
                <div className="movie-item__categories-container">
                  <span className="movie-item__category-first movie-item__categories">
                    {onGenreFilms(genre, genre_ids[0])}
                  </span>
                  <span className="movie-item__category-second movie-item__categories">
                    {onGenreFilms(genre, genre_ids[1])}
                  </span>
                </div>
                <p className="movie-item__description">{cutText(overview, 20)}</p>
              </div>
              <div className="movie-item__stars">
                <Rate
                  count={10}
                  allowHalf={false}
                  value={localStorage.getItem(id)}
                  style={{ width: '239px', fontSize: '16px' }}
                  onChange={(value) => {
                    inRate(id, value)
                  }}
                />
              </div>
            </div>
          </li>
        )
      }}
    </MovieConsumer>
  )
}

MovieItem.defaultProps = {
  original_title: '',
  release_date: '',
  overview: '',
  inRate: () => {},
  id: 1,
  questId: '',
  vote_average: 0,
}

MovieItem.propTypes = {
  original_title: PropTypes.string,
  release_date: PropTypes.string,
  overview: PropTypes.string,
  inRate: PropTypes.func,
  id: PropTypes.number,
  questId: PropTypes.string,
  vote_average: PropTypes.number,
}

export { MovieItem }
