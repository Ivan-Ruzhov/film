class MoviesServes {
  _apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=9e952eee16b032bd58884df526b3d600&query='
  _pageBase = '&page='
  async getMovies(url, page) {
    const res = await fetch(`${this._apiBase}${url}${this._pageBase}${page}`)
    if (!res.ok) {
      throw new Error(`WARNING!!!! ${res.status}, please check your internet and title films`)
    }
    return await res.json()
  }
}

export { MoviesServes }
