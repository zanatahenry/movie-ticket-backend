import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { prismaClient } from "../globals/Prisma"
import { User } from "@prisma/client"

const authMiddle = async (request: Request, response: Response, next: NextFunction) => {
  try {
    if (!request.headers.authorization) return response.send_unauthorized("Acesso negado: sem autorização!")

    const [header, token] = request.headers.authorization.split(' ')

    if (String(header).toLowerCase() !== 'bearer') {
      return response.send_unauthorized('Acesso negado: tipo de autorização incorreta.')
    }

    jwt.verify(token, String(process.env.AUTH_PRIVATE_KEY), async (error, result) => {
      if (error) return response.send_unauthorized('Acesso negado: token expirada.')

      if (!result) return response.send_unauthorized('Acesso negado: token inválida.')

      const treatedResult = result as User
      const user = await prismaClient.user.findUnique({ where: { id: treatedResult.id } })
      if (!user) return response.send_notFound('Acesso negado: Usuário não encontrado')

      request.userId = user.id

      return next()
    })
  } catch (err) {
    console.error({ err })
    next(err)
  }
}

export default authMiddle