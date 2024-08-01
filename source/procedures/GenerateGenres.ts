import Procedure from "../factory/Procedure";
import { GenresService } from "../features/Genres/GenresService";
import GenreModel, { GenreType, GenreTypeValues } from "../models/Genre/GenreModel";
import { GenreRepositoryImp } from "../models/Genre/GenreMongoDB";
import TheMovieDbAPI from "../vendors/TheMovieDbAPI";

const genresServiceImp = new GenresService(GenreRepositoryImp)

class GenerateGenres extends Procedure {
  async run(): Promise<void> {
    await this.generate()
  }

  async generate () {
    try {
      const findGenres = await genresServiceImp.countGenres()

      if (!findGenres) {
        Promise.all(GenreTypeValues.map(async type => {
          const data = await TheMovieDbAPI.listGenres(type, { params: { language: 'pt-br' } })
          if (!data?.genres?.length) throw new Error('Nenhum gênero encontrado!')
  
          const genres: Array<{name: string, id: number}> = data?.genres
          for (const genre of genres) {
            const newGenre = new GenreModel({
              code: genre.id,
              name: genre.name,
              type: type
            })
  
            await genresServiceImp.createGenres(newGenre)
          }
        }))
      }

    } catch (err) {
      console.log(err)
    }
  }
}

export default new GenerateGenres()