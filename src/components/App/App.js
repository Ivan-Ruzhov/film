import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Alert } from 'antd'

import './App.css'
import { MoviesList } from '../Movies-list'
import { MoviesServes } from '../../Movies-serves/MoviesServes'
import { MovieInput } from '../MoovieInput'

class App extends Component {
  MoviesServes = new MoviesServes()
  state = {
    films: [],
    loading: true,
    error: false,
  }
  componentDidMount() {
    this.MoviesServes.getMovies('return')
      .then((films) => {
        this.setState({
          films: films.results,
          loading: false,
        })
      })
      .catch(this.onError)
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }
  onLoad = () => {
    this.setState({ loading: true })
  }
  onMovies = (url) => {
    this.MoviesServes.getMovies(url)
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
    const err = error ? (
      <Alert message={'error'} type={'error'} banner={true} description={'Sorry, please check title films'} />
    ) : null
    return (
      <React.Fragment>
        <Online>
          <div className="app">
            <MovieInput onMovies={this.onMovies} />
            <MoviesList films={this.state.films} loading={loading} error={error} />
            {err}
          </div>
        </Online>
        <Offline>
          <Alert
            message={'error'}
            type={'error'}
            banner={true}
            description={'Please, check your router, you are offline'}
          />
        </Offline>
      </React.Fragment>
    )
  }
}
export { App }
