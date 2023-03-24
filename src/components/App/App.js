import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Alert, Spin, Pagination } from 'antd'

import './App.css'
import { MoviesList } from '../Movies-list'
import { MoviesServes } from '../../Movies-serves/MoviesServes'
import { MovieInput } from '../Movie-input'
import { MovieFilter } from '../Movie-filter'

class App extends Component {
  MoviesServes = new MoviesServes()
  state = {
    films: null,
    loading: true,
    errorStatus: false,
    errorTitle: false,
    page: null,
    title: null,
  }
  componentDidMount() {
    this.onMovies('return', 1)
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.page !== prevState.page) {
      this.onMovies(this.state.title, this.state.page)
    }
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }
  onMovies = (url, page) => {
    this.setState({
      loading: true,
    })
    this.MoviesServes.getMovies(url, page)
      .then((films) => {
        if (films.results.length === 0) {
          this.setState({
            films: null,
            loading: false,
            errorTitle: true,
          })
          return
        }
        this.setState({
          films: films.results,
          loading: false,
          errorTitle: false,
          page: page,
          title: url,
        })
      })
      .catch(this.onError)
  }
  onChange = (e) => {
    console.log(e.target.value)
    this.setState(({ page }) => {
      return {
        page: ++page,
      }
    })
    console.log(this.state)
  }

  render() {
    const { loading, error, films, errorTitle, page } = this.state
    return (
      <React.Fragment>
        <Online>
          <div className="app">
            <MovieFilter />
            <MovieInput onMovies={this.onMovies} page={this.state.page} />
            {loading && <Spin size={'large'} />}
            {!loading && films && <MoviesList films={this.state.films} error={error} />}
            {!loading && films && (
              <div className="pagination">
                <Pagination total={500} current={page} onChange={(page) => this.setState({ page })} />
              </div>
            )}
            {error && (
              <Alert message={'error'} type={'error'} banner={true} description={'Sorry, please check title films'} />
            )}
            {errorTitle && (
              <Alert
                message={'error'}
                type={'error'}
                banner={true}
                description={'Sorry, but films with this title underfined, please rename title'}
              />
            )}
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
