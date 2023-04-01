import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Alert, Spin, Pagination } from 'antd'

import './App.css'
import { MoviesList } from '../Movies-list'
import { MoviesServes } from '../../Movies-serves/MoviesServes'
import { QuestMovieService } from '../../Movies-serves/QuestMovieService'
import { MovieInput } from '../Movie-input'
import { MovieFilter } from '../Movie-filter'
import { MovieProvider } from '../Movie-service/Movie-service'

class App extends Component {
  MoviesServes = new MoviesServes()
  QuestMovieService = new QuestMovieService()
  state = {
    films: null,
    loading: true,
    errorStatus: false,
    errorTitle: false,
    page: null,
    totalPage: 1,
    ratingPage: 0,
    title: null,
    questID: null,
    genre: [],
    search: true,
    rated: false,
    ratedFilms: JSON.parse(localStorage.getItem('films')),
  }
  componentDidMount() {
    this.onRenge()
    this.onQuestMovie()
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.page !== prevState.page && this.state.rated) {
      this.onQuestRate(this.state.page)
    }
    if (this.state.page !== prevState.page && !this.state.rated) {
      this.onMovies(this.state.title, this.state.page)
    }
  }
  componentDidCatch(error, errorInfo) {
    console.error(errorInfo, error)
  }

  onSearch = () => {
    this.setState({
      search: true,
      rated: false,
      films: [],
    })
  }
  onRated = (page) => {
    this.onQuestRate(page)
    this.setState({
      search: false,
      rated: true,
    })
  }
  onQuestRate = (page) => {
    this.QuestMovieService.getQuestRate(page)
      .then(({ results, total_pages }) => {
        if (results.length === 0) {
          return null
        }
        localStorage.setItem('films', JSON.stringify(results))
        this.setState({
          ratedFilms: JSON.parse(localStorage.getItem('films')),
          films: [],
          totalPage: total_pages,
          page: page,
        })
      })
      .catch(this.onError)
  }
  onPage = (page) => {
    this.setState({
      page: page,
    })
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
    this.QuestMovieService.getQuest()
  }
  onRenge = () => {
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
  onMovies = (url, page) => {
    this.setState({
      loading: true,
    })
    this.MoviesServes.getMovies(url, page)
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
          title: url,
          totalPage: total_pages,
        })
      })
      .catch(this.onError)
  }
  inRate = (id, rating) => {
    this.QuestMovieService.getRateMovies(id, rating).then((res) => {
      return res
    })
    this.setState(({ films }) => {
      const idx = films.findIndex((el) => el.id === id)
      const oldItem = films[idx]
      const newItem = { ...oldItem, rating: rating }
      sessionStorage.setItem(id, rating)
      const newArr = [...this.state.films.slice(0, idx), newItem, ...this.state.films.slice(idx + 1)]
      return {
        films: newArr,
      }
    })
  }

  render() {
    const { loading, error, films, errorTitle, page, search, rated, genre, totalPage, ratedFilms } = this.state
    return (
      <React.Fragment>
        <Online>
          <div className="app">
            <MovieProvider value={genre}>
              <MovieFilter onSearch={this.onSearch} onRated={this.onRated} page={page} />
              {search && <MovieInput onMovies={this.onMovies} />}
              {loading && <Spin size={'large'} />}
              {!loading && films && <MoviesList films={films} error={error} inRate={this.inRate} />}
              {!loading && rated && <MoviesList films={ratedFilms} error={error} inRate={this.inRate} />}
              {!loading && (
                <div className="pagination">
                  <Pagination total={totalPage * 10} current={page} onChange={(page) => this.setState({ page })} />
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
                  description={'Sorry, but films with this title undefined, please rename title'}
                />
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
