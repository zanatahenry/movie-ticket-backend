import mongoose from "mongoose";
import PlanModel from "../../models/Plans/PlanModel";
import { planRepositoryImp } from "../../models/Plans/PlanMongoDB";
import { GenreRepositoryImp } from "../../models/Genre/GenreMongoDB";
import { prismaClient } from "../../globals/Prisma";
import { ObjectId } from "../../globals/MongoDB";
import TheMovieDbAPI from "../../vendors/TheMovieDbAPI";
import { GenreType } from "../../models/Genre/GenreModel";

export class MoviesService {
  constructor (
    private plansRepositoryImp: typeof planRepositoryImp,
    private genreRepositoryImp: typeof GenreRepositoryImp
  ) {
    this.plansRepositoryImp = plansRepositoryImp,
    this.genreRepositoryImp = genreRepositoryImp
  }

  async list (userId: string) {
    const user = await prismaClient.user.findUnique({ where: { id: userId } })
    if (!user) throw new Error('Usuário não encontrado!')

    const userPlans = await prismaClient.userPlans.findMany({ where: { userId } })
    if (!userPlans?.length) throw new Error('Usuário não possui plano assinado!')

    const genres = new Set()

    await Promise.all(userPlans.map(async (userPlan) => {
      const plan = await this.plansRepositoryImp.findById(ObjectId(userPlan.plan_id))
      if (!plan || !plan?.genres?.length) return

      plan.genres.forEach(genre => genres.add(genre.code))
    }))

    const movies = await TheMovieDbAPI.findAllMovies(GenreType.movie, { params: {
      page: 1,
      language: 'pt-br',
      include_adult: true,
      sort_by: 'popularity.desc',
      with_genres: Array.from(genres).join(',')
    }})

    return movies
  }

}

export const moviesServiceImp = new MoviesService(
  planRepositoryImp,
  GenreRepositoryImp
)