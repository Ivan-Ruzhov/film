import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Alert } from 'antd'

import './App.css'
import { MoviesList } from '../Movies-list'
import { MoviesServes } from '../../Movies-serves/MoviesServes'

class App extends Component {
  MoviesServes = new MoviesServes()
  state = {
    films: [],
    loading: true,
    error: false,
  }

  constructor(props) {
    super(props)
    this.onMovies()
  }
  onError = () => {
    this.setState({
      loading: false,
      error: true,
    })
  }
  async onMovies() {
    await this.MoviesServes.getMovies('нгенгнпршнгпгн')
      .then((films) => {
        this.setState({
          films: films.results,
          loading: false,
        })
      })
      .catch(this.onError)
  }
  render() {
    const { loading, error } = this.state
    return (
      <React.Fragment>
        <Online>
          <MoviesList films={this.state.films} loading={loading} error={error} />
        </Online>
        <Offline>
          <Alert message={'error'} type={'error'} banner={true} description={'Please, check your router'} />
        </Offline>
      </React.Fragment>
    )
  }
}
export { App }
