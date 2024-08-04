import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../../factory/Controller";
import { prismaClient } from "../../globals/Prisma";
import { isPassedThreeHours } from '../../globals/Time';

class SigninController extends Controller {
  handle(): Router {
    this.router.post("/", async (request: Request, response: Response, next: NextFunction) => {
      const body = request.body

      try {
        const user = await prismaClient.user.findFirst({ where: { email: body.email } })
        if (!user) return response.send_notFound('Usuário não encontrado!')

        const userAuthentication = await prismaClient.authentication.findUnique({ where: { userId: user.id } })
        if (!userAuthentication) return response.send_notFound('Autenticação do usuário não encontrada!')

        if (userAuthentication.attempts && userAuthentication?.attempts >= 3 && !isPassedThreeHours(userAuthentication?.lastAttempt)) {
          return response.send_badRequest('Usuário temporariamente bloqueado por 3 horas!')
        }

        const correctPassword = await bcrypt.compare(body.password, userAuthentication.password)
        if (!correctPassword) {
          const currentAttempt = userAuthentication?.attempts ?? 0
          await prismaClient.authentication.update({
            where: { userId: user.id },
            data: {
              attempts: currentAttempt + 1,
              lastAttempt: new Date()
            }
          })

          return response.send_badRequest('Senha inválida!')
        }

        const token = jwt.sign(user, String(process.env.AUTH_PRIVATE_KEY), {
          expiresIn: String(process.env.AUTH_EXPIRES_IN)
        })

        await prismaClient.authentication.update({
          where: { userId: user.id },
          data: {
            attempts: 0,
            lastAttempt: null
          }
        })

        return response.send_ok("Autenticação realizada com sucesso!", { token, user })
      } catch (error) {
        next(error)
      }
    })

    return this.router
  }
}

const signinController = new SigninController()
export default signinController.handle()