import { QueryOptions, Types } from "mongoose";
import { Repository } from "../../factory/Repository";
import WatchedMoviesModel, { IWatchedMovies } from "./WatchedMoviesModel";

export class WatchedMoviesRepository extends Repository<IWatchedMovies, WatchedMoviesModel> {
  async create (model: WatchedMoviesModel, options?: QueryOptions<any>): Promise<WatchedMoviesModel | null> {
    const created = await this.mongoDB.create([model], options)
    if (!created) return null

    return new WatchedMoviesModel(created[0])
  }

  async findById (id: Types.ObjectId): Promise<WatchedMoviesModel | null> {
    throw new Error('Not implemented.')
  }

  async findByMovieId (movieId: string) : Promise<WatchedMoviesModel | null> {
    const document = await this.mongoDB.findOne({ movieId })
    if (!document) return null

    return new WatchedMoviesModel(document)
  }

  async deleteByMovieId (movieId: string) {
    const document = await this.mongoDB.deleteOne({ movieId })
    return document.acknowledged
  }
}