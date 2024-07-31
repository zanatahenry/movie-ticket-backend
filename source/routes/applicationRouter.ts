import { Router } from 'express'

const applicationRouter = Router()

applicationRouter.use("/auth", () => {})
applicationRouter.use("/unauth", () => {})

export default applicationRouter