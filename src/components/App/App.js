import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Alert, Spin, Pagination } from 'antd'

import './App.css'
import { MoviesList } from '../Movies-list'
import { MoviesServes } from '../../Movies-serves/MoviesServes'
import { MovieInput } from '../Movie-input'
import { MovieFilter } from '../Movie-filter'
// import { MovieProvider } from "../Movie-service/Movie-service"

class App extends Component {
  MoviesServes = new MoviesServes()
  state = {
    films: null,
    loading: true,
    errorStatus: false,
    errorTitle: false,
    page: null,
    title: null,
    questID: null,
    genre: [],
    search: true,
    rated: false,
    ratedFilms: [],
  }
  componentDidMount() {
    this.onRenge()
    this.onQuestMovie()
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.page !== prevState.page) {
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
      films: null,
    })
  }
  onRated = (id) => {
    this.setState({
      search: false,
      rated: true,
    })
    this.onQuestRate(id)
  }
  onQuestRate = (id) => {
    this.MoviesServes.getQuestRate(id)
      .then((res) => {
        this.setState({
          ratedFilms: res.results,
          films: [],
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
      .then(({ guest_session_id }) => {
        this.setState({
          questID: guest_session_id,
          loading: false,
        })
      })
      .catch(this.onError)
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
  inRate = (id, questId, rating) => {
    this.MoviesServes.getRateMovies(id, questId, rating).then((res) => {
      return res
    })
    this.setState(({ films }) => {
      const idx = films.findIndex((el) => el.id === id)
      const oldItem = films[idx]
      const newItem = { ...oldItem, rating: rating }
      const newArr = [...this.state.films.slice(0, idx), newItem, ...this.state.films.slice(idx + 1)]
      return {
        films: newArr,
      }
    })
    console.log(this.state)
  }
  render() {
    const { loading, error, films, errorTitle, page, search, rated } = this.state
    console.log(this.state)
    return (
      <React.Fragment>
        <Online>
          <div className="app">
            <MovieFilter onSearch={this.onSearch} onRated={this.onRated} id={this.state.questID} />
            {search && <MovieInput onMovies={this.onMovies} page={this.state.page} questID={this.state.questID} />}
            {loading && <Spin size={'large'} />}
            {!loading && films && (
              <MoviesList films={this.state.films} error={error} questId={this.state.questID} inRate={this.inRate} />
            )}
            {!loading && rated && (
              <MoviesList
                films={this.state.ratedFilms}
                error={error}
                questId={this.state.questID}
                inRate={this.inRate}
              />
            )}
            {!loading && films && (
              <div className="pagination">
                <Pagination total={50} current={page} onChange={(page) => this.setState({ page })} />
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
