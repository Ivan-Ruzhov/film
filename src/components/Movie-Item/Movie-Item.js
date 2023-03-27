import React from 'react'
import './Movie-item.css'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Rate } from 'antd'

const MovieItem = (props) => {
  const { poster_path, original_title, release_date, overview } = props
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
    if (text.length === 0) {
      return 'Sorry this movie has no description'
    }
    const newText = text.trim()
    if (newText.split(' ').length < limit) {
      return newText
    } else {
      return newText.split(' ').splice(0, limit).join(' ') + ' ...'
    }
  }
  return (
    <li className="movie-item">
      <div className="poster-container">
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt="Постер к фильму"
          className="poster-container__image"
        />
      </div>
      <div className="movie-item__container">
        <div className="movie-item__header">
          <header className="movie-item__title">{cutText(original_title, 2)}</header>
        </div>
        <div className="movie-item__date-release">{refactorDate(release_date)}</div>
        <div className="movie-item__categories-container">
          <span className="movie-item__category-first movie-item__categories">Жанр</span>
          <span className="movie-item__category-second movie-item__categories">Жанр2</span>
        </div>
        <p className="movie-item__description">{cutText(overview, 25)}</p>
        <Rate className="movie-item__stars" count={10} allowHalf={true} />
      </div>
    </li>
  )
}
export { MovieItem }
