import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Alert, Spin, Pagination } from 'antd'

import './App.css'
import { MoviesList } from '../Movies-list'
import { MoviesServes } from '../../Movies-serves/MoviesServes'
import { MovieInput } from '../Movie-input'
import { MovieFilter } from '../Movie-filter'
import { MovieProvider } from '../Movie-service/Movie-service'

class App extends Component {
  MoviesServes = new MoviesServes()
  state = {
    films: [],
    loading: true,
    errorStatus: false,
    errorTitle: false,
    page: 1,
    totalPage: 0,
    ratingPage: 0,
    title: null,
    genre: [],
    search: true,
    rated: false,
  }
  componentDidMount() {
    this.onGenge()
    localStorage.getItem('id') ? null : this.onQuestMovie()
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.rated && this.state.page !== prevState.page) {
      this.onQuestRate(this.state.page)
    }
    if (!this.state.rated && this.state.page !== prevState.page) {
      this.onMovies(this.state.title, this.state.page)
    }
  }
  componentDidCatch(error, errorInfo) {
    console.error(errorInfo, error)
  }

  onSearch = () => {
    this.onMovies(this.state.title, 1)
    this.setState({
      search: true,
      rated: false,
    })
  }
  onRated = (page) => {
    this.setState({ films: [], totalPage: 0, page: 1 })
    this.onQuestRate(page)
    this.setState({
      search: false,
      rated: true,
    })
  }
  onQuestRate = (page) => {
    this.MoviesServes.getQuestRate(page)
      .then(({ results, total_pages }) => {
        if (results.length === 0) {
          return null
        }
        this.setState({
          films: results,
          totalPage: total_pages,
          page: page,
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
  onQuestMovie = () => {
    this.setState({
      loading: true,
    })
    this.MoviesServes.getQuest()
  }
  onGenge = () => {
    this.setState({
      loading: true,
    })
    this.MoviesServes.getGenre()
      .then(({ genres }) => {
        this.setState({
          loading: false,
          genre: genres,
        })
      })
      .catch(this.onError)
  }
  onMovies = (title, page) => {
    this.setState({
      loading: true,
    })
    this.MoviesServes.getMovies(title, page)
      .then(({ results, total_pages }) => {
        if (results.length === 0) {
          this.setState({
            films: null,
            loading: false,
            errorTitle: true,
          })
          return
        }
        this.setState({
          films: results,
          loading: false,
          errorTitle: false,
          page: page,
          title: title,
          totalPage: total_pages,
        })
      })
      .catch(this.onError)
  }
  inRate = (id, rating) => {
    this.MoviesServes.getRateMovies(id, rating).then((res) => {
      return res
    })
    this.setState(({ films }) => {
      const idx = films.findIndex((el) => el.id === id)
      const oldItem = films[idx]
      const newItem = { ...oldItem, rating: rating }
      localStorage.setItem(id, rating)
      const newArr = [...this.state.films.slice(0, idx), newItem, ...this.state.films.slice(idx + 1)]
      return {
        films: newArr,
      }
    })
  }

  render() {
    const { loading, error, films, errorTitle, page, search, genre, totalPage } = this.state
    return (
      <React.Fragment>
        <Online>
          <div className="app">
            <MovieProvider value={genre}>
              <MovieFilter onSearch={this.onSearch} onRated={this.onRated} page={page} />
              {search && <MovieInput onMovies={this.onMovies} />}
              {loading && <Spin size={'large'} />}
              {!loading && films && <MoviesList films={films} error={error} inRate={this.inRate} />}
              {error && (
                <Alert message={'error'} type={'error'} banner={true} description={'Sorry, please check title films'} />
              )}
              {errorTitle && (
                <Alert
                  message={'error'}
                  type={'error'}
                  banner={true}
                  description={'Sorry, but films with this title undefined, please rename title'}
                />
              )}
              {!loading && !error && (
                <div className="pagination">
                  <Pagination total={totalPage * 10} current={page} onChange={(page) => this.setState({ page })} />
                </div>
              )}
            </MovieProvider>
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
