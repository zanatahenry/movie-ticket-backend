import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../../factory/Controller";
import { prismaClient } from "../../globals/Prisma";

class SigninController extends Controller {
  handle(): Router {
    this.router.post("/", async (request: Request, response: Response, next: NextFunction) => {
      const body = request.body

      try {
        const user = await prismaClient.user.findFirst({ where: { email: body.email } })
        if (!user) return response.send_notFound('Usuário não encontrado!')

        const correctPassword = await bcrypt.compare(body.password, user.password)
        if (!correctPassword) return response.send_badRequest('Senha inválida!')


        const token = jwt.sign(user, String(process.env.AUTH_PRIVATE_KEY), {
          expiresIn: String(process.env.AUTH_EXPIRES_IN)
        })

        return response.send_ok("Autenticação realizada com sucesso!", { token, user })
      } catch (error) {
        console.log(error)
      }
    })

    return this.router
  }
}

const signinController = new SigninController()
export default signinController.handle()