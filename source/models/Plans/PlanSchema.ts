import mongoose, { Model } from "mongoose";
import Schema from "../../factory/Schema";
import { Document } from "mongoose";
import { IPlan, IPlanGenres } from "./PlanModel";

export interface IPlanDocument extends Document, Omit<IPlan, '_id'> {}
export interface IPlanMongoDB extends Model<IPlanDocument> {}

class PlanSchema extends Schema {
  constructor () {
    const planData: mongoose.SchemaDefinition = {
      name: {
        type: String,
        required: true
      },

      version: {
        type: String,
        required: true,
        default: '0.0.1'
      },

      genres: {
        type: Array<IPlanGenres>,
        default: []
      },

      createdAt: Date,
      updatedAt: Date,
    }

    super([planData])
  }
}

export default new PlanSchema()