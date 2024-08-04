import bcrypt from 'bcrypt'

import { NextFunction, Router, Response, Request } from "express";
import { Controller } from "../../factory/Controller";
import { prismaClient } from "../../globals/Prisma";

class SignupController extends Controller {
  handle(): Router {
    this.router.post("/", async (request: Request, response: Response, next: NextFunction) => {
      const body = request.body

      try {
        const existsUser = await prismaClient.user.findFirst({ where: { email: body.email } })
        if (existsUser) return response.send_badRequest('Usuário com esse e-mail já criado!')

        const hashPassword = await bcrypt.hash(body.password, 14)

        await prismaClient.$transaction(async (prisma) => {
          const user = await prisma.user.create({ 
            data: {
              name: body.name,
              cellphone: body.cellphone,
              email: body.email
            }
          })

          const authentication = await prisma.authentication.create({
            data: {
              attempts: 0,
              password: hashPassword,
              userId: user.id
            }
          })

          return { user, authentication }
        })

        return response.send_created('Usuário criado com sucesso!')
      } catch (err) {
        next(err)
      }
    })

    return this.router
  }
}

const registerController = new SignupController()
export default registerController.handle()