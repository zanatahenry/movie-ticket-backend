import crypto from 'crypto'

import { NextFunction, Request, Response, Router } from "express"
import { Controller } from "../../../factory/Controller"
import { prismaClient } from "../../../globals/Prisma"

class ForgotPasswordController extends Controller {
  handle(): Router {
    this.router.post("/", async (request: Request, response: Response, next: NextFunction) => {
      const { email } = request.body

      try {
        const user = await prismaClient.user.findFirst({ where: { email } })
        if (!user) return response.send_notFound('Usuário não encontrado!')

        const recuperationCode = crypto.randomBytes(20).toString('hex')

        await prismaClient.authentication.update({ 
          where: { userId: user.id }, 
          data: {
            recuperationCode,
            recuperationSolicitedAt: new Date()
          }
        })

        return response.send_ok("Recuperação de senha solicitada com sucesso!", { code: recuperationCode })
      } catch (err) {
        next(err)
      }
    })

    return this.router
  }
}

const forgotPasswordController = new ForgotPasswordController()
export default forgotPasswordController.handle()