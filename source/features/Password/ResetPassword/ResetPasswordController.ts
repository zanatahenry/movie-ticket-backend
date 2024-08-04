import bcrypt from 'bcrypt'

import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../../../factory/Controller";
import { prismaClient } from "../../../globals/Prisma";
import { isPassedThreeHours } from '../../../globals/Time';

class ResetPasswordController extends Controller {
  handle(): Router {
    this.router.post('/', async (request: Request, response: Response, next: NextFunction) => {
      const { password, email, token } = request.body

      try {
        const user = await prismaClient.user.findFirst({ where: { email } })
        if (!user) return response.send_notFound('Usuário não encontrado!')

        const userAuthentication = await prismaClient.authentication.findUnique({ where: { userId: user.id } })
        if (!userAuthentication) return response.send_notFound('Autenticação do usuário não encontrada!')

        if (token !== userAuthentication.recuperationCode) return response.send_badRequest('Token de recuperação de senha inválida!')

        if (isPassedThreeHours(userAuthentication?.recuperationSolicitedAt)) return response.send_badRequest('Token de recuperação de senha expirada!')
        
        const newHashPassword = await bcrypt.hash(password, 14)

        await prismaClient.authentication.update({
          where: { userId: user.id },
          data: {
            attempts: 0,
            password: newHashPassword,
            recuperationCode: null,
            recuperationSolicitedAt: null,
            userId: user.id
          }
        })

        return response.send_ok('Senha atualizada com sucesso!')
      } catch (err) {
        next(err)
      }
    })

    return this.router
  }
}

const resetPasswordController = new ResetPasswordController()
export default resetPasswordController.handle()