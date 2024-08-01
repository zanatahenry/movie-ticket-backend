import mongoose, { Document, Model, Types } from "mongoose";
import { GenreTypeValues, IGenre } from "./GenreModel";
import Schema from "../../factory/Schema";

export interface IGenreDocument extends Document, Omit<IGenre, '_id'> {}
export interface IGenreMongoDB extends Model<IGenreDocument> {}

class GenreSchema extends Schema {
  constructor () {
    const genreData: mongoose.SchemaDefinition = {
      name: {
        type: String,
        required: true
      },

      code: {
        type: String,
        required: true
      },

      type: {
        type: String,
        enum: GenreTypeValues
      },

      createdAt: Date,
      updatedAt: Date,
    }

    super([genreData])
  }
}

export default new GenreSchema()