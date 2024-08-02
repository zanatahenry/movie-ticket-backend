import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../../factory/Controller";
import { moviesServiceImp } from "./MoviesService";

class MoviesController extends Controller {
  handle(): Router {
    this.router.get('/list', async (request: Request, response: Response, next: NextFunction) => {
      const { userId } = request

      try {
        const movies = await moviesServiceImp.list(userId)

        return response.send_ok('Filmes encontrados com sucesso!', { movies })
      } catch (error) {
        next(error)
      }
    })

    this.router.patch('/watch/:movieId', async (request: Request, response: Response, next: NextFunction) => {
      const { movieId } = request.params
      const { userId } = request

      try {
        const movies = await moviesServiceImp.watchMovie(userId, movieId)

        return response.send_ok('Filme atualizado com sucesso!', { movies })
      } catch (error) {
        next(error)
      }
    })

    this.router.patch('/unwatch/:movieId', async (request: Request, response: Response, next: NextFunction) => {
      const { movieId } = request.params
      const { userId } = request

      try {
        const movies = await moviesServiceImp.unwatchMovie(userId, movieId)

        return response.send_ok('Filme atualizado com sucesso!', { movies })
      } catch (error) {
        next(error)
      }
    })

    return this.router
  }
}

const moviesController = new MoviesController()
export default moviesController.handle()