import mongoose, { type Document, Model } from 'mongoose'

export type SchemaOptions = {
  documentExpiresIn?: string
  refProperties?: Array<string>
  removeDefaultTimestamps?: boolean
}

export type IGenericDocument<T> = Document & Omit<T, '_id'>
export type IGenericMongoDB<T> = Model<T> & {
  aggregatePaginate: any
}

export default abstract class Schema {
  public schema: mongoose.Schema<any>
  public schemaDefinition: mongoose.SchemaDefinition
  private refProperties: Array<string>

  constructor (schemas: mongoose.SchemaDefinition | Array<mongoose.SchemaDefinition>, options: SchemaOptions & mongoose.SchemaOptions = {}) {
    if (!Array.isArray(schemas)) schemas = [schemas]

    const schemaOptions: mongoose.SchemaOptions = {
      timestamps: {
        createdAt: true,
        updatedAt: true,
        currentTime: () => new Date()
      },
      autoIndex: true
    }

    const mergedSchemas = schemas.reduce((acc, schema) => Object.assign(acc, schema))

    this.schemaDefinition = mergedSchemas

    if (options.removeDefaultTimestamps === true) delete schemaOptions.timestamps

    if (options.documentExpiresIn) {
      mergedSchemas.createdAt = {
        index: true,
        type: Date,
        expires: options.documentExpiresIn,
        default: new Date()
      }
    }

    if (options.discriminatorKey) {
      schemaOptions.discriminatorKey = options.discriminatorKey
    }

    this.schema = new mongoose.Schema(mergedSchemas, schemaOptions)
    this.refProperties = options.refProperties ?? []
  }

  private applyRefSchema = (arr: Array<string> = []) => {
    const refSchema = this.schema as any
    Object.keys(refSchema).forEach(key => {
      if (!arr.includes(key) && Object.keys(refSchema.paths).includes(key)) delete refSchema[key]
    })
    return refSchema
  }

  public get mainSchema (): mongoose.Schema {
    return this.schema
  }

  public get refSchema (): mongoose.Schema {
    const ref = this.applyRefSchema(this.refProperties ?? [])
    return ref
  }
}
