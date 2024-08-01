import { Types } from 'mongoose'

export default abstract class Model<T> {
  public _id?: Types.ObjectId

  protected createdAt?: Date
  protected updatedAt?: Date

  constructor (model: T & {
    _id?: Types.ObjectId
    createdAt?: Date,
    updatedAt?: Date
  }) {
    this._id = model?._id
    this.createdAt = model?.createdAt
    this.updatedAt = model?.updatedAt
  }
}
