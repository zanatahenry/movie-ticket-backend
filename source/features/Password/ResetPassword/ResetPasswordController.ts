import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../../../factory/Controller";
import { prismaClient } from "../../../globals/Prisma";
import { generateAlphanumeric } from "../../../helpers/generate";

class ResetPasswordController extends Controller {
  handle(): Router {
    this.router.post("/", async (request: Request, response: Response, next: NextFunction) => {
      const { email } = request.body

      try {
        const user = await prismaClient.user.findFirst({ where: { email } })
        if (!user) return response.send_notFound('Usuário não encontrado!')

        const recuperationCode = generateAlphanumeric(10)

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

const resetPasswordController = new ResetPasswordController()
export default resetPasswordController.handle()