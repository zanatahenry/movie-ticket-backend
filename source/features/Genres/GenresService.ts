import { paginatedDocs } from "../../factory/Pagination";
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
      skip: page === 1 ? 0 : ((page - 1) * size)
    })

    const data = paginatedDocs<GenreModel>({
      data: genres,
      page,
      size,
      totalDocs
    })

    return data
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