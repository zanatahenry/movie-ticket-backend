import cors from 'cors'

import { Request, Response, Router } from "express";
import SigninController from '../features/Signin/SigninController';
import SignupController from '../features/Signup/SignupController';
import ForgotPasswordController from '../features/Password/ForgotPassword/ForgotPasswordController';
import ResetPasswordController from '../features/Password/ResetPassword/ResetPasswordController';

const unauthRouter = Router()

unauthRouter.use(cors())

unauthRouter.use('/signin', SigninController)
unauthRouter.use('/signup', SignupController)
unauthRouter.use('/forgot-password', ForgotPasswordController)
unauthRouter.use('/reset-password', ResetPasswordController)

unauthRouter.get('/status', (request: Request, response: Response) => {
  return response.status(200).send('available')
})

export default unauthRouter