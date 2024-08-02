import mongoose, { Model } from "mongoose";
import Schema from "../../factory/Schema";
import { Document } from "mongoose";
import { IWatchedMovies } from "./WatchedMoviesModel";

export interface IWatchedMoviesDocument extends Document, Omit<IWatchedMovies, '_id'> {}
export interface IWatchedMoviesMongoDB extends Model<IWatchedMoviesDocument> {}

class WatchedMoviesSchema extends Schema {
  constructor () {
    const watchedMoviesData: mongoose.SchemaDefinition = {
      movieId: {
        type: String,
        required: true
      },

      movieTitle: {
        type: String,
        required: true
      },

      movieGenreIds: {
        type: Array,
        required: true,
        default: []
      },

      userId: {
        type: String,
        required: true
      },

      createdAt: Date,
      updatedAt: Date,
    }

    super([watchedMoviesData])
  }
}

export default new WatchedMoviesSchema()