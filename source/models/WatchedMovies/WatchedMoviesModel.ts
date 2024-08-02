import mongoose from "mongoose"
import Model from "../../factory/Model"

export interface IWatchedMovies {
  movieId: string
  movieTitle: string
  movieGenreIds: Array<number>
  userId: string
}

export default class WatchedMoviesModel extends Model<Partial<IWatchedMovies>> {
  public movieId?: IWatchedMovies['movieId']
  public movieTitle?: IWatchedMovies['movieTitle']
  public movieGenreIds?: IWatchedMovies['movieGenreIds']
  public userId?: IWatchedMovies['userId']

  constructor (model: Partial<IWatchedMovies>) {
    super(model)

    this.movieId = model.movieId
    this.movieTitle = model.movieTitle
    this.movieGenreIds = model.movieGenreIds
    this.userId = model.userId
  }
}