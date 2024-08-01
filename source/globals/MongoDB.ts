import mongoose from 'mongoose'
import Database from './Database'

export const ObjectId = (objectId: string | mongoose.Types.ObjectId) => {
  // eslint-disable-next-line no-throw-literal
  if (!Boolean(mongoose.Types.ObjectId.isValid(objectId))) throw 'Invalid ObjectId'
  return new mongoose.Types.ObjectId(objectId)
}

const MongoDB = new Database(
  process.env.MONGO_DATABASE_USERNAME,
  process.env.MONGO_DATABASE_PASSWORD,
  process.env.MONGO_DATABASE_CLUSTER,
  process.env.MONGO_DATABASE_NAME
)

export default MongoDB.connect()
