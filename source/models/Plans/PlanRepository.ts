import { QueryOptions, Types, UpdateQuery } from "mongoose";
import { Repository } from "../../factory/Repository";
import PlanModel, { IPlan } from "./PlanModel";

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

  async delete (id: Types.ObjectId) {
    const document = await this.mongoDB.deleteOne({ _id: new Types.ObjectId(id) })
    return document.acknowledged
  }
}