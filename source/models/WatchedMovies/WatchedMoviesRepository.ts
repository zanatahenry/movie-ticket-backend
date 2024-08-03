import { PipelineStage, QueryOptions, Types } from "mongoose";
import { Repository } from "../../factory/Repository";
import WatchedMoviesModel, { IWatchedMovies } from "./WatchedMoviesModel";
import { IMostWatchedTheme } from "../../features/Movies/MoviesService";

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

  async totalWatchedMoviesByUserId (userId: string) {
    const document = await this.mongoDB.countDocuments({ userId })
    return document
  }

  async findLastWatchedMovie (userId: string) {
    const document = await this.mongoDB.findOne({ userId }).sort({ _id: -1 })
    if (!document) return null

    return new WatchedMoviesModel(document)
  }

  async findMostWatchedTheme (userId: string) {
    const aggegate: PipelineStage[] = [
      { $match: { userId } },
      { $unwind: "$movieGenreIds" },
      { 
        $group: {
          _id: '$movieGenreIds.id',
          count: { $sum: 1 },
          name: { $first: '$movieGenreIds.name' }
        }
      },
      { $sort: { count: -1 } }
    ]

    const document = await this.mongoDB.aggregate(aggegate)

    const mostWatchedTheme: Array<IMostWatchedTheme> = document.map(item => ({
      themeId: item._id,
      themeName: item.name,
      totalWatchedMovies: item.count
    }))

    return mostWatchedTheme?.[0]
  }
}