import Database from './Database'

const MongoDB = new Database(
  process.env.MONGO_DATABASE_USERNAME,
  process.env.MONGO_DATABASE_PASSWORD,
  process.env.MONGO_DATABASE_CLUSTER,
  process.env.MONGO_DATABASE_NAME
)

export default MongoDB.connect()
