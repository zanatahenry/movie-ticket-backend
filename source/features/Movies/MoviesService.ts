import mongoose from "mongoose";
import PlanModel from "../../models/Plans/PlanModel";
import { PlanRepositoryImp } from "../../models/Plans/PlanMongoDB";
import { GenreRepositoryImp } from "../../models/Genre/GenreMongoDB";
import { prismaClient } from "../../globals/Prisma";
import { ObjectId } from "../../globals/MongoDB";
import TheMovieDbAPI from "../../vendors/TheMovieDbAPI";
import { GenreType } from "../../models/Genre/GenreModel";
import { WatchedMoviesRepositoryImp } from "../../models/WatchedMovies/WatchedMoviesMongoDB";
import WatchedMoviesModel from "../../models/WatchedMovies/WatchedMoviesModel";
import { UserPlans } from "@prisma/client";
import { paginatedDocs } from "../../factory/Pagination";

export interface IMostWatchedTheme {
  themeId: string
  themeName: string
  totalWatchedMovies: number
}

interface IReport {
  userId: string
  totalWatchedMovies: number
  mostWatchedTheme: IMostWatchedTheme
  lastMovieWatched: {
    movieId: string
    movieName: string
  }
}

export class MoviesService {
  constructor (
    private plansRepositoryImp: typeof PlanRepositoryImp,
    private genreRepositoryImp: typeof GenreRepositoryImp,
    private watchedMoviesRepositoryImp: typeof WatchedMoviesRepositoryImp
  ) {
    this.plansRepositoryImp = plansRepositoryImp,
    this.genreRepositoryImp = genreRepositoryImp,
    this.watchedMoviesRepositoryImp = watchedMoviesRepositoryImp
  }

  async list (userId: string, page?: number) {
    const user = await prismaClient.user.findUnique({ where: { id: userId } })
    if (!user) throw new Error('Usuário não encontrado!')

    const userPlans = await prismaClient.userPlans.findMany({ where: { userId } })
    if (!userPlans?.length) throw new Error('Usuário não possui plano assinado!')

    const genres = await this.filterGenresByUserPlan(userPlans)

    const movies = await TheMovieDbAPI.findAllMovies(GenreType.movie, { params: {
      page: page || 1,
      language: 'pt-br',
      include_adult: true,
      sort_by: 'popularity.desc',
      with_genres: Array.from(genres).join(',')
    }})

    const paginated = paginatedDocs({
      page: movies.page,
      data: movies.results,
      totalDocs: movies.total_results,
      size: movies?.results?.length
    })

    return paginated
  }


  async watchMovie (userId: string,  movieId: string) {
    const user = await prismaClient.user.findUnique({ where: { id: userId } })
    if (!user) throw new Error('Usuário não encontrado!')

    const userPlans = await prismaClient.userPlans.findMany({ where: { userId } })
    if (!userPlans?.length) throw new Error('Usuário não possui plano assinado!')

    const genres = await this.filterGenresByUserPlan(userPlans)

    const data = await TheMovieDbAPI.findById(GenreType.movie, movieId, { params: { language: 'pt-br' } })
    if (!data) throw new Error('Filme não encontrado!')

    const movieGenres = data.genres.filter(moveGenre => Array.from(genres).includes(moveGenre.id))

    const watchedMovie = new WatchedMoviesModel({
      userId,
      movieId: data.id,
      movieTitle: data.title,
      movieGenreIds: movieGenres
    })

    await this.watchedMoviesRepositoryImp.create(watchedMovie)
  }

  async unwatchMovie (userId: string,  movieId: string) {
    const user = await prismaClient.user.findUnique({ where: { id: userId } })
    if (!user) throw new Error('Usuário não encontrado!')

    const watchedMovie = await this.watchedMoviesRepositoryImp.findByMovieId(movieId)
    if (!watchedMovie) new Error('Nenhum filme assistido encontrado com esse identificador!')

    await this.watchedMoviesRepositoryImp.deleteByMovieId(movieId)
  }

  async filterGenresByUserPlan (userPlans: Array<UserPlans>) {
    const genres = new Set()

    await Promise.all(userPlans.map(async (userPlan) => {
      const plan = await this.plansRepositoryImp.findById(ObjectId(userPlan.plan_id))
      if (!plan || !plan?.genres?.length) return

      plan.genres.forEach(genre => genres.add(genre.code))
    }))

    return genres
  }

  async report (userId: string) {
    const totalWatchedMovies = await this.watchedMoviesRepositoryImp.totalWatchedMoviesByUserId(userId)
    if (!totalWatchedMovies) throw new Error('Usuário não assistiu nenhum filme!')

    const lastWatchedMovie = await this.watchedMoviesRepositoryImp.findLastWatchedMovie(userId)
    const mostWatchedTheme = await this.watchedMoviesRepositoryImp.findMostWatchedTheme(userId)

    const data: IReport = {
      userId,
      totalWatchedMovies,
      mostWatchedTheme,
      lastMovieWatched: {
        movieId: String(lastWatchedMovie?.movieId),
        movieName: String(lastWatchedMovie?.movieTitle)
      }
    }

    return data
  }
}

export const moviesServiceImp = new MoviesService(
  PlanRepositoryImp,
  GenreRepositoryImp,
  WatchedMoviesRepositoryImp
)