import cors from 'cors'

import { NextFunction, Request, Response, Router } from "express";
import SigninController from '../features/Signin/SigninController';
import RegisterController from '../features/Register/RegisterController';

const unauthRouter = Router()

unauthRouter.use(cors())

unauthRouter.use('/signin', SigninController)
unauthRouter.use('/register', RegisterController)

unauthRouter.get('/status', (request: Request, response: Response, next: NextFunction) => {
  return response.status(200).send('available')
})