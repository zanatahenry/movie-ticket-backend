import cors from 'cors'

import { Request, Response, Router } from "express";
import SigninController from '../features/Signin/SigninController';
import SignupController from '../features/Signup/SignupController';

const unauthRouter = Router()

unauthRouter.use(cors())

unauthRouter.use('/signin', SigninController)
unauthRouter.use('/signup', SignupController)

unauthRouter.get('/status', (request: Request, response: Response) => {
  return response.status(200).send('available')
})

export default unauthRouter