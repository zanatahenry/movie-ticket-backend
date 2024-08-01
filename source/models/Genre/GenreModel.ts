import mongoose from "mongoose";
import Model from "../../factory/Model";

export interface IGenre {
  _id?: mongoose.Types.ObjectId | unknown
  name: string
  code: number
  createdAt?: Date
  updatedAt?: Date
}

export default class GenreModel extends Model<IGenre> {
  public _id?: IGenre['_id']
  public name: IGenre['name']
  public code: IGenre['code']

  constructor (genre: IGenre) {
    super(genre)

    this._id = genre._id
    this.name = genre.name
    this.code = genre.code
  }
}