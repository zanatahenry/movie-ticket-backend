import { AxiosError, AxiosRequestConfig } from "axios";
import TheMovieDB from "../globals/TheMovieDB";
import { GenreType } from "../models/Genre/GenreModel";

class TheMovieDbAPI extends TheMovieDB {
  async listGenres (genreType: GenreType, config?: AxiosRequestConfig) {
    try {
      const response = await this.API.get(`/genre/${genreType}/list`, config)
      return response.data
    } catch (error) {
      return error as AxiosError
    }
  }

  async findMovieByName (genreType: GenreType, config?: AxiosRequestConfig) {
    try {
      const response = await this.API.get(`/search/${genreType}`, config)
    } catch (error) {
      return error as AxiosError
    }
  }

  async findAllMovies (genreType: GenreType, config: AxiosRequestConfig) {
    try {
      const response = await this.API.get(`/discover/${genreType}`, config)
      return response.data
    } catch (error) {
      return error
    }
  }
}

export default new TheMovieDbAPI()