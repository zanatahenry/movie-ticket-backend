import mongoose from "mongoose"
import PlanModel from "../../models/Plans/PlanModel"
import { PlanRepositoryImp } from "../../models/Plans/PlanMongoDB"
import { DEFAULT_PAGE_SIZE, paginatedDocs } from "../../factory/Pagination"

interface IList {
  search?: any
  page: number
  pageSize?: number
}

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

  async countPlans () {
    const document = await this.plansRepositoryImp.count()
    return document
  }

  async list ({ page, pageSize, search }: IList) {
    const totalDocs = await this.countPlans()
    const size = pageSize || DEFAULT_PAGE_SIZE

    const genres = await this.plansRepositoryImp.find({
      search,
      limit: size,
      skip: page === 1 ? 0 : ((page - 1) * size)
    })

    const data = paginatedDocs<PlanModel>({
      data: genres,
      page,
      size,
      totalDocs
    })

    return data
  }
}

export const plansServiceImp = new PlansService(PlanRepositoryImp)