import { genresServiceImp } from "../features/Genres/GenresService"
import GenreModel, { GenreTypeValues } from "../models/Genre/GenreModel"
import TheMovieDbAPI from "../vendors/TheMovieDbAPI"

const GenerateGenresJob = async () => {
  try {
    const findGenres = await genresServiceImp.countGenres()

    if (!findGenres) {
      await Promise.all(GenreTypeValues.map(async type => {
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
  } catch (error) {
    console.error('Erro ao gerar novos temas!')
  }
}

export default GenerateGenresJob