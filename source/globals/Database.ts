import { Db, MongoClient, MongoClientOptions } from 'mongodb'
import mongoose from 'mongoose'
import throwlhos from 'throwlhos'

type processEnv = string | undefined

export default class Database {
  private username: string
  private cluster: string
  private database: string
  private URIConnectionString: string
  private client: MongoClient | undefined
  public db: Db | undefined

  private message = (result: 'success' | 'fail'): string => {
    const prefix = {
      success: "Successfully connected",
      fail: "Failed to connect"
    }


    return `${prefix[result]} with user ${this.username} database ${this.database} cluster ${this.cluster}.`
  }

  constructor (username: processEnv, passsword: processEnv, cluster: processEnv, database: processEnv) {
    if (username) this.username = username
    if (cluster) this.cluster = cluster
    if (database) this.database = database

    /* Connection String URI Format */
    this.URIConnectionString = `mongodb+srv://${username}:${passsword}@${cluster}.mongodb.net/${database}`
  }

  public connect = (options = {}): mongoose.Connection => {
    const connection = mongoose.createConnection(this.URIConnectionString, options)
    if (!connection) throw throwlhos.err_expectationFailed(this.message('fail'))
    console.warn(this.message('success'))
    return connection
  }
}
