import { Router } from 'express'
import unauthRouter from './unauthRouter'
import authRouter from './authRouter'

const applicationRouter = Router()

applicationRouter.use("/auth", authRouter)
applicationRouter.use("/unauth", unauthRouter)

export default applicationRouter