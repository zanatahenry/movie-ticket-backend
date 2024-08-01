import GenreModel, { IGenre } from "../../models/Genre/GenreModel";
import { GenreRepositoryImp } from "../../models/Genre/GenreMongoDB";

const DEFAULT_PAGE_SIZE = 10;
export interface PaginationType<T> {
  data:Array <T>
  pagination:{
  pageNumber:number,
  pageSize:number,
  totalPages:number,
  lastPage:boolean,
  firstPage:boolean
  }
}

export class GenresService {
  constructor (
    private genresRepositoryImp: typeof GenreRepositoryImp
  ) {
    this.genresRepositoryImp = genresRepositoryImp
  }

  async list (page: number, pageSize?: number) {
    const totalDocs = await this.countGenres()
    const size = pageSize || DEFAULT_PAGE_SIZE

    const genres = await this.genresRepositoryImp.find({
      limit: size,
      skip: page * size
    })

    
    const totalPages = Math.round(totalDocs / size)
    const paginated: PaginationType<GenreModel> = {
      data: genres,
      pagination: {
        totalPages: totalPages,
        firstPage: page === 1,
        lastPage: page >= totalPages,
        pageSize: size,
        pageNumber: page
      }
    }

    return paginated
  }

  async countGenres () {
    const totalGenres = await this.genresRepositoryImp.count()
    return totalGenres
  }

  async createGenres (genre: GenreModel) {
    const createdGenre = await this.genresRepositoryImp.create(genre)
    if (!createdGenre) return null

    return createdGenre
  }
}

export const genresServiceImp = new GenresService(GenreRepositoryImp)