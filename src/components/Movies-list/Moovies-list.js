import React from 'react'
import './Movies-list.css'
import { Alert, Spin } from 'antd'

import { MovieItem } from '../Movie-Item'

const MoviesList = (props) => {
  const { films, loading, error } = props
  const elem = films.map((item) => {
    return <MovieItem key={item.id} {...item} />
  })
  const spin = loading ? <Spin size={'large'} /> : null
  const content = !loading ? elem : null
  const errorMessage = error ? (
    <Alert message={'error'} type={'error'} banner={true} description={'Sorry, please wait any moments, thx'} />
  ) : null
  return (
    <ul className="movies-list">
      {spin}
      {content}
      {errorMessage}
    </ul>
  )
}
export { MoviesList }
