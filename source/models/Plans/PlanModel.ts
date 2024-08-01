import Model from "../../factory/Model"

export interface IPlanGenres {
  name: string,
  code: string
}

export interface IPlan {
  name: string
  genres: Array<IPlanGenres>
  version: string
  createdAt?: Date
  updatedAt?: Date
}

export default class PlanModel extends Model<Partial<IPlan>> {
  public name?: IPlan['name']
  public genres?: IPlan['genres']
  public version?: IPlan['version']

  constructor (plan: Partial<IPlan>) {
    super(plan)

    this.name = plan.name
    this.genres = plan.genres
    this.version = plan.version
  }
}