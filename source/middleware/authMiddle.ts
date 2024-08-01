import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

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

      return next()
    })
  } catch (err) {
    console.error({ err })
    next(err)
  }
}

export default authMiddle