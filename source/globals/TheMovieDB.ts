import axios from "axios"

export default class TheMovieDB {
  public apiKey = String(process.env.MOVIE_DB_API_KEY)

  public baseUrl = String(process.env.MOVIE_DB_URL)

  protected API = axios.create({
    baseURL: this.baseUrl,
    url: this.baseUrl,
    timeout: 30000,
    headers: {
      Authorization: `Bearer ${this.apiKey}`
    }
  })
}