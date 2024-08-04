import { FilterQuery, QueryOptions, Types } from "mongoose";
import { Repository } from "../../factory/Repository";
import GenreModel, { GenreType, IGenre } from "./GenreModel";

interface IFind {
  skip: number
  limit: number
  search?: string
  id?: string
  code?: string
}

export class GenreRepository extends Repository<IGenre, GenreModel> {
  async create (model: GenreModel, options?: QueryOptions<any>): Promise<GenreModel | null> {
    const created = await this.mongoDB.create([model], options)
    if (!created) return null

    return new GenreModel(created[0])
  }

  async find ({ limit, skip, code, id, search }: IFind): Promise<Array<GenreModel>> {
    const possibleFilters: FilterQuery<IGenre> = {}

    if (search) Object.assign(possibleFilters, { name: { $regex: search, $options: "i" } })
    if (code) Object.assign(possibleFilters, { code })
    if (id) Object.assign(possibleFilters, { _id: id })

    const hasActiveFilters = Object.values(possibleFilters).length > 0

    const documents = await this.mongoDB.find(possibleFilters)
    .skip(hasActiveFilters ? 0 : skip)
    .limit(hasActiveFilters ? 0 : limit)
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

  async findByCode (code: string) {
    const document = await this.mongoDB.findOne({ code })
    if (!document) return null

    return document
  }
}