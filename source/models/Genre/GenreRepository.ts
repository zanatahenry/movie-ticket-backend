import { QueryOptions, Types } from "mongoose";
import { Repository } from "../../factory/Repository";
import GenreModel, { IGenre } from "./GenreModel";
import { IGenreDocument } from "./GenreSchema";
import GenreMongoDB from "./GenreMongoDB";

export class GenreRepository extends Repository<IGenreDocument, GenreModel, typeof GenreMongoDB> {
  async create (model: GenreModel, options?: QueryOptions<any>): Promise<GenreModel | {}> {
    const created = await this.mongoDB.create([model], options)
    return new GenreModel(created[0])
  }

  async findById (id: Types.ObjectId): Promise<GenreModel | {} | null> {
    const document = await this.mongoDB.findById(id)

    if (!document) return null

    return new GenreModel(document)
  }
}