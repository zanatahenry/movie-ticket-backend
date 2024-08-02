import { QueryOptions, Types } from "mongoose";
import { Repository } from "../../factory/Repository";
import GenreModel, { GenreType, IGenre } from "./GenreModel";

interface IFind {
  skip: number
  limit: number
}

export class GenreRepository extends Repository<IGenre, GenreModel> {
  async create (model: GenreModel, options?: QueryOptions<any>): Promise<GenreModel | null> {
    const created = await this.mongoDB.create([model], options)
    if (!created) return null

    return new GenreModel(created[0])
  }

  async find ({ limit, skip }: IFind): Promise<Array<GenreModel>> {
    const documents = await this.mongoDB.find({ type: GenreType.movie }).skip(skip).limit(limit)
    const models = (documents || []).map(
      (document) => new GenreModel(document)
    )

    return models
  }

  async findById (id: Types.ObjectId): Promise<GenreModel | null> {
    const document = await this.mongoDB.findById(id)
    if (!document) return null

    return new GenreModel(document)
  }


  async count () {
    const documents = await this.mongoDB.countDocuments({})
    return documents
  }
}