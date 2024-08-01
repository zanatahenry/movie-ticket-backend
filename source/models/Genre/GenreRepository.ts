import { QueryOptions, Types } from "mongoose";
import { Repository } from "../../factory/Repository";
import GenreModel, { IGenre } from "./GenreModel";

interface IFind {
  skip: number
  limit: number
}

export class GenreRepository extends Repository<IGenre, GenreModel> {
  async create (model: GenreModel, options?: QueryOptions<any>): Promise<GenreModel | {}> {
    const created = await this.mongoDB.create([model], options)
    return new GenreModel(created[0])
  }

  async find ({ limit, skip }: IFind): Promise<Array<GenreModel>> {
    const documents = await this.mongoDB.find().skip(skip).limit(limit)
    const models = (documents || []).map(
      (document) => new GenreModel(document)
    )

    return models
  }

  async findById (id: Types.ObjectId): Promise<GenreModel | {} | null> {
    const document = await this.mongoDB.findById(id)

    if (!document) return null

    return new GenreModel(document)
  }


  async count () {
    const documents = await this.mongoDB.countDocuments({})
    return documents
  }
}