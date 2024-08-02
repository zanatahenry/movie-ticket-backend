import mongoose from "mongoose";
import PlanModel from "../../models/Plans/PlanModel";
import { PlanRepositoryImp } from "../../models/Plans/PlanMongoDB";

export class PlansService {
  constructor (
    private plansRepositoryImp: typeof PlanRepositoryImp
  ) {
    this.plansRepositoryImp = plansRepositoryImp
  }

  async create (model: PlanModel) {
    const createdPlan = await this.plansRepositoryImp.create(model)
    
    return createdPlan
  }

  async findById (id: mongoose.Types.ObjectId) {
    const plan = await this.plansRepositoryImp.findById(id)

    return plan
  }

  async findByIdAndUpdate (id: mongoose.Types.ObjectId, model: PlanModel) {
    const updatedPlan = await this.plansRepositoryImp.findByIdAndUpdate(id, model)

    return updatedPlan
  }

  async deletePlan (id: mongoose.Types.ObjectId) {
    const document = await this.plansRepositoryImp.delete(id)
    return document
  }
}

export const plansServiceImp = new PlansService(PlanRepositoryImp)