import { Router } from "express";
import { Controller } from "../../factory/Controller";

class RegisterController extends Controller {
  handle(): Router {
    return this.router
  }
}

const registerController = new RegisterController()
export default registerController.handle()