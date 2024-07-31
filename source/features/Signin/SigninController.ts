import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../../factory/Controller";

class SigninController extends Controller {
  handle(): Router {
    this.router.post("/", async (request: Request, response: Response, next: NextFunction) => {
      try {

      } catch (error) {
        next(error)
      }
    })

    return this.router
  }
}

const signinController = new SigninController()
export default signinController.handle()