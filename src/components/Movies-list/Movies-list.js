import React, { Component } from 'react'
import './Movies-list.css'
import { Alert } from 'antd'
import PropTypes from 'prop-types'

import { MovieItem } from '../Movie-Item'

class MoviesList extends Component {
  static defaultProps = {
    films: [],
    inRate: () => {},
  }
  static propTypes = {
    films: PropTypes.arrayOf(PropTypes.object),
    inRate: PropTypes.func,
  }
  render() {
    const { films, error, inRate } = this.props
    const elem = films.map((item) => {
      return <MovieItem key={item.id} {...item} inRate={inRate} />
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
