import mongoose, { ClientSession, type Document, Model, Types } from 'mongoose'

export interface UpdateResult {
  acknowledged: boolean
  matchedCount: number
  modifiedCount: number
  upsertedCount: number
  upsertedId: any
}

export interface AggregatePaginate<T> {
  docs: Array<T>
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number
  nextPage: number
}

export interface Paginate {
  limit?: number
  page?: number
  sort?: string | { [key: string]: number }
}

export type SimpleSelectType<T> = { [key in keyof T]-?: number | boolean | string }

export abstract class Repository<Document, Model, MongoDB> {
  readonly featureName: string

  constructor (
    protected mongoDB: MongoDB,
    protected session?: ClientSession
  ) {
    this.mongoDB = mongoDB
    this.session = session
  }

  /**
   *
   * @param id
   * @param projection
   * @param options
   * @returns Model
   */
  abstract findById (id: Types.ObjectId): Promise<Model|{}|null>

  /**
   *
   * @param doc
   * @returns Promise<Model> or Object
   */
  abstract create (model: Model, options?: mongoose.QueryOptions<any>): Promise<Model|{}>

}