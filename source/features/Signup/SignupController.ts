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

        await prismaClient.user.create({ data: {
          password: hashPassword,
          name: body.name,
          cellphone: body.cellphone,
          email: body.email
        }})

        return response.send_ok('Usuário criado com sucesso!')
      } catch (err) {
        next(err)
      }
    })

    return this.router
  }
}

const registerController = new SignupController()
export default registerController.handle()