import Model from "../../factory/Model";

export enum GenreType {
  movie = 'movie',
  tv = 'tv'
}

export const GenreTypeValues = Object.values(GenreType)

export interface IGenre {
  name: string
  code: number
  type: GenreType
  createdAt?: Date
  updatedAt?: Date
}

export default class GenreModel extends Model<IGenre> {
  public name: IGenre['name']
  public code: IGenre['code']
  public type: IGenre['type']

  constructor (genre: IGenre) {
    super(genre)

    this.name = genre.name
    this.code = genre.code
    this.type = genre.type
  }
}