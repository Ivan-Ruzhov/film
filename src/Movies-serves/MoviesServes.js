import { Alert } from 'antd'

class MoviesServes {
  _apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=9e952eee16b032bd58884df526b3d600&query='
  async getMovies(url) {
    console.log('pip')
    const res = await fetch(`${this._apiBase}${url}`)
    if (!res.ok) {
      return <Alert message={'error'} type={'error'} banner={true} description={`Warning fetch status ${res.status}`} />
    }
    return await res.json()
  }
}

export { MoviesServes }
