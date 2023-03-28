class MoviesServes {
  _apiBaseSearch = 'https://api.themoviedb.org/3/search/movie?api_key=9e952eee16b032bd58884df526b3d600&query='
  _apiBaseQuest =
    'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=9e952eee16b032bd58884df526b3d600'
  _apiBaseGenre = 'https://api.themoviedb.org/3/genre/movie/list?api_key=9e952eee16b032bd58884df526b3d600'
  _pageBase = '&page='
  async getMovies(url, page) {
    const res = await fetch(`${this._apiBaseSearch}${url}${this._pageBase}${page}`)
    if (!res.ok) {
      throw new Error(`WARNING!!!! ${res.status}, please check your internet and title films`)
    }
    return await res.json()
  }
  async getQuest() {
    const res = await fetch(this._apiBaseQuest)
    if (!res.ok) {
      throw new Error(`WARNING!!!! ${res.status}, please check your internet and title films`)
    }
    return await res.json()
  }
  async getGenre() {
    const res = await fetch(this._apiBaseGenre)
    if (!res.ok) {
      throw new Error(`WARNING!!!! ${res.status}, please check your internet and title films`)
    }
    return await res.json()
  }
  async getRateMovies(id, questId, rating) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=9e952eee16b032bd58884df526b3d600&guest_session_id=${questId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          value: rating,
        }),
      }
    )
    if (!res.ok) {
      throw new Error(`WARNING!!!! ${res.status}, please check your internet and title films`)
    }
    return res
  }
  async getQuestRate(id) {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${id}/rated/movies?api_key=9e952eee16b032bd58884df526b3d600`
    )
    if (!res.ok) {
      throw new Error(`WARNING!!!! ${res.status}, please check your internet and title films`)
    }
    return await res.json()
  }
}

export { MoviesServes }
