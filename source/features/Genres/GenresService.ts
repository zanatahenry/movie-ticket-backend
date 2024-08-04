import { DEFAULT_PAGE_SIZE, paginatedDocs } from "../../factory/Pagination"
import GenreModel from "../../models/Genre/GenreModel"
import { GenreRepositoryImp } from "../../models/Genre/GenreMongoDB"

export interface IList {
  search?: any
  id?: any
  code?: any
  page: number
  pageSize?: number
}

export class GenresService {
  constructor (
    private genresRepositoryImp: typeof GenreRepositoryImp
  ) {
    this.genresRepositoryImp = genresRepositoryImp
  }

  async list ({ page, pageSize, code, id, search }: IList) {
    const totalDocs = await this.countGenres()
    const size = pageSize || DEFAULT_PAGE_SIZE

    const genres = await this.genresRepositoryImp.find({
      code, 
      id,
      search,
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