class MoviesServes {
  _apiBaseSearch = 'https://api.themoviedb.org/3/'
  id
  async getMovies(title, page) {
    const params = new URL('search/movie', this._apiBaseSearch)
    params.searchParams.set('api_key', '9e952eee16b032bd58884df526b3d600')
    params.searchParams.set('query', title)
    params.searchParams.set('page', page)
    const res = await fetch(params)
    if (!res.ok) {
      throw new Error(`WARNING!!!! ${res.status}, please check your internet and title films`)
    }
    return await res.json()
  }
  async getGenre() {
    const params = new URL('genre/movie/list', this._apiBaseSearch)
    params.searchParams.set('api_key', '9e952eee16b032bd58884df526b3d600')
    const res = await fetch(params)
    if (!res.ok) {
      throw new Error(`WARNING!!!! ${res.status}, please check your internet and title films`)
    }
    return await res.json()
  }
  async getQuest() {
    const params = new URL('authentication/guest_session/new', this._apiBaseSearch)
    params.searchParams.set('api_key', '9e952eee16b032bd58884df526b3d600')
    const res = await fetch(params)
    if (!res.ok) {
      throw new Error(`WARNING!!!! ${res.status}, please check your internet and title films`)
    }
    return await res.json().then(({ guest_session_id }) => {
      localStorage.setItem('id', guest_session_id)
      this.id = guest_session_id
    })
  }
  async getRateMovies(id, rating) {
    const params = new URL(`movie/${id}/rating`, this._apiBaseSearch)
    params.searchParams.set('api_key', '9e952eee16b032bd58884df526b3d600')
    params.searchParams.set('guest_session_id', localStorage.getItem('id'))
    const res = await fetch(params, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        value: rating,
      }),
    })
    if (!res.ok) {
      throw new Error(`WARNING!!!! ${res.status}, please check your internet and title films`)
    }
    return res
  }
  async getQuestRate(page) {
    const params = new URL(`guest_session/${localStorage.getItem('id')}/rated/movies`, this._apiBaseSearch)
    params.searchParams.set('api_key', '9e952eee16b032bd58884df526b3d600')
    params.searchParams.set('page', page)
    const res = await fetch(params)
    if (!res.ok) {
      throw new Error(`WARNING!!!! ${res.status}, please check your internet and title films`)
    }
    return await res.json()
  }
}

export { MoviesServes }
