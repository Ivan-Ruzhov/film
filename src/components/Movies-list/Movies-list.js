import React, { Component } from 'react'
import './Movies-list.css'
import { Alert } from 'antd'

import { MovieItem } from '../Movie-Item'

class MoviesList extends Component {
  render() {
    const { films, error, questId, inRate } = this.props
    const elem = films.map((item) => {
      return <MovieItem key={item.id} {...item} questId={questId} inRate={inRate} />
    })
    return (
      <ul className="movies-list">
        {!error && elem}
        {error && (
          <Alert message={'error'} type={'error'} banner={true} description={'Sorry, please wait any moments, thx'} />
        )}
      </ul>
    )
  }
}
export { MoviesList }
