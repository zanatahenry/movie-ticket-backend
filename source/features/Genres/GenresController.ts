import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../../factory/Controller";
import { genresServiceImp } from "./GenresService";

class GenresController extends Controller {
  handle(): Router {
    this.router.get('/', async (request: Request, response: Response, next: NextFunction) => {
      const { page, pageSize, search } = request.query

      try {
        const pageCount = Boolean(Number(page)) ? Number(page) : 1

        const allGenres = await genresServiceImp.list(pageCount, Number(pageSize))

        return response.send_ok('Gêneros encontrados com sucesso!', { genres: allGenres })
      } catch (error) {
        next(error)
      }
    })

    return this.router
  }
}

const genresController = new GenresController()
export default genresController.handle()