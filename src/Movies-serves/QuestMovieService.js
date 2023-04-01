class QuestMovieService {
  _apiBaseQuest = new URL(
    'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=9e952eee16b032bd58884df526b3d600'
  )
  idQuest
  async getQuest() {
    const res = await fetch(this._apiBaseQuest)
    if (!res.ok) {
      throw new Error(`WARNING!!!! ${res.status}, please check your internet and title films`)
    }
    return await res.json().then(({ guest_session_id }) => {
      this.idQuest = guest_session_id
    })
  }
  async getRateMovies(id, rating) {
    const param = new URLSearchParams(`guest_session_id=${this.idQuest}`)
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=9e952eee16b032bd58884df526b3d600&${param}`,
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
  async getQuestRate(page) {
    const param = new URLSearchParams(`page=${page}`)
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${this.idQuest}/rated/movies?api_key=9e952eee16b032bd58884df526b3d600&${param}`
    )
    if (!res.ok) {
      throw new Error(`WARNING!!!! ${res.status}, please check your internet and title films`)
    }
    return await res.json()
  }
}

export { QuestMovieService }
