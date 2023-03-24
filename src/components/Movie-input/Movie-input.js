import React, { Component } from 'react'
import { debounce } from 'lodash'
import './Movie-input.css'

class MovieInput extends Component {
  state = {
    text: '',
  }
  onMovies = this.props.onMovies
  page = this.props.page
  onDebounce = debounce(() => {
    this.onMovies(this.state.text, 1)
  }, 700)
  onChange = (e) => {
    if (!e.target.value) {
      return null
    }
    this.setState({
      text: e.target.value,
    })
    this.onDebounce()
  }
  onInput = () => {
    const input = document.querySelector('.movie-form__input')
    if (input.value.charAt(0) === ' ') {
      input.value = ''
    }
  }

  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          placeholder="Type to search..."
          className="movie-form__input"
          onInput={this.onInput}
          onChange={this.onChange}
        />
      </React.Fragment>
    )
  }
}

export { MovieInput }
