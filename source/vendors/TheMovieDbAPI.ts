import { AxiosError, AxiosRequestConfig } from "axios";
import TheMovieDB from "../globals/TheMovieDB";

type Genre = "movie" | "tv"

class TheMovieDbAPI extends TheMovieDB {
  async listGenres (genreType: Genre, config?: AxiosRequestConfig) {
    try {
      const response = await this.API.get(`/genre/${genreType}/list`, config)
      return response.data
    } catch (error) {
      return error as AxiosError
    }
  }

  async findMovieByName (genreType: Genre, config?: AxiosRequestConfig) {
    try {
      const response = await this.API.get(`/search/${genreType}`, config)
    } catch (error) {
      return error as AxiosError
    }
  }

  async findAllMovies (genreType: Genre, config: AxiosRequestConfig) {
    try {
      const response = await this.API.get(`/discover/${genreType}`, config)
    } catch (error) {
      return error
    }
  }
}