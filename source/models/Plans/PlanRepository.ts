import { QueryOptions, Types, UpdateQuery } from "mongoose";
import { Repository } from "../../factory/Repository";
import PlanModel, { IPlan } from "./PlanModel";
import { FilterQuery } from "mongoose";

interface IFind {
  skip: number
  limit: number
  search?: string
}

export class PlanRepository extends Repository<IPlan, PlanModel> {
  async create (model: PlanModel, options?: QueryOptions<any>): Promise<PlanModel | null> {
    const created = await this.mongoDB.create([model], options)
    if (!created) return null

    return new PlanModel(created[0])
  }

  async findById (id: Types.ObjectId): Promise<PlanModel | null> {
    const document = await this.mongoDB.findById(id)
    if (!document) return null

    return new PlanModel(document)
  }

  async findByIdAndUpdate (id: Types.ObjectId, model: PlanModel): Promise<PlanModel | null> {
    const update: UpdateQuery<IPlan> = {
      $set: { ...model }
    }

    const document = await this.mongoDB.findByIdAndUpdate(id, update, { new: true })
    if (!document) return null

    return new PlanModel(document)
  }

  async find ({ limit, skip, search }: IFind): Promise<Array<PlanModel>> {
    const possibleFilters: FilterQuery<IPlan> = {}

    if (search) Object.assign(possibleFilters, { name: { $regex: search, $options: "i" } })

    const hasActiveFilters = Object.values(possibleFilters).length > 0

    const documents = await this.mongoDB.find(possibleFilters)
    .skip(hasActiveFilters ? 0 : skip)
    .limit(hasActiveFilters ? 0 : limit)
    const models = (documents || []).map(
      (document) => new PlanModel(document)
    )

    return models
  }

  async count () {
    const documents = await this.mongoDB.countDocuments({})
    return documents
  }

  async delete (id: Types.ObjectId) {
    const document = await this.mongoDB.deleteOne({ _id: new Types.ObjectId(id) })
    return document.acknowledged
  }
}