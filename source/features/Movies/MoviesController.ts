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

    return this.router
  }
}

const moviesController = new MoviesController()
export default moviesController.handle()