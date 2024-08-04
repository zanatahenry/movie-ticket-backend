import { NextFunction, Request, Response, Router } from "express"
import { Controller } from "../../factory/Controller"
import { moviesServiceImp } from "./MoviesService"

class MoviesController extends Controller {
  handle(): Router {
    this.router.get('/list', async (request: Request, response: Response, next: NextFunction) => {
      const { userId } = request
      const { page } = request.query

      try {
        const movies = await moviesServiceImp.list(userId, Number(page))

        return response.send_ok('Filmes encontrados com sucesso!', { movies })
      } catch (error) {
        next(error)
      }
    })

    this.router.patch('/watch/:movieId', async (request: Request, response: Response, next: NextFunction) => {
      const { movieId } = request.params
      const { userId } = request

      try {
        await moviesServiceImp.watchMovie(userId, movieId)

        return response.send_ok('Filme atualizado com sucesso!')
      } catch (error) {
        next(error)
      }
    })

    this.router.patch('/unwatch/:movieId', async (request: Request, response: Response, next: NextFunction) => {
      const { movieId } = request.params
      const { userId } = request

      try {
        await moviesServiceImp.unwatchMovie(userId, movieId)

        return response.send_ok('Filme atualizado com sucesso!')
      } catch (error) {
        next(error)
      }
    })

    this.router.get('/watched/report/:userId', async (request: Request, response: Response, next: NextFunction) => {
      const { userId } = request.params

      try {
        const report = await moviesServiceImp.report(userId)

        return response.send_ok('Relatório encontrado com sucesso!', { report })
      } catch (error) {
        next(error)
      }
    })

    return this.router
  }
}

const moviesController = new MoviesController()
export default moviesController.handle()