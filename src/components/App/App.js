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
    questID: null,
    genre: [],
    search: true,
    rated: false,
  }
  componentDidMount() {
    this.onQuestMovie()
    this.onRenge()
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.page !== prevState.page) {
      this.onMovies(this.state.title, this.state.page)
    }
  }

  onSearch = () => {
    this.setState({
      search: true,
      rated: false,
    })
  }
  onRated = () => {
    this.setState({
      search: false,
      rated: true,
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
      genre: [],
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
  render() {
    console.log(this.state)
    const { loading, error, films, errorTitle, page, genre, search } = this.state
    const genreElem = genre.map((el) => {
      return <div key={el.id}>{el.name}</div>
    })
    return (
      <React.Fragment>
        <Online>
          <div className="app">
            <MovieFilter onSearch={this.onSearch} onRated={this.onRated} />
            {search && <MovieInput onMovies={this.onMovies} page={this.state.page} />}
            {loading && <Spin size={'large'} />}
            {!loading && films && <MoviesList films={this.state.films} error={error} />}
            {genre && !loading && genreElem}
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
