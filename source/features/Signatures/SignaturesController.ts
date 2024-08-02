import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../../factory/Controller";
import { prismaClient } from "../../globals/Prisma";
import { ObjectId } from "../../globals/MongoDB";
import { plansServiceImp } from "../Plans/PlansService";

class SignaturesController extends Controller {
  handle(): Router {
      this.router.post('/subscribe', async (request: Request, response: Response, next: NextFunction) => {
        const { planId } = request.body
        const { userId } = request

        try {
          const plan = await plansServiceImp.findById(ObjectId(planId))
          if (!plan) return response.send_notFound('Plano não encontrado!')

          const user = await prismaClient.user.findUnique({ where: { id: userId } })
          if (!user) return response.send_notFound('Usuário não encontrado!')

          const data = {
            plan_name: String(plan.name),
            plan_id: String(plan._id),
            userId: user.id
          }

          await prismaClient.userPlans.create({ data })

          return response.send_ok('Assinatura concluída com sucesso!')
        } catch (error) {
          next(error)
        }
      })

      this.router.post('/unsubscribe', async (request: Request, response: Response, next: NextFunction) => {
        const { planId } = request.body
        const { userId } = request

        try {
          const userPlans = await prismaClient.userPlans.findUnique({ where: { userId: userId, plan_id: String(planId) } })
          if (!userPlans) return response.send_notFound('Usuário não possui esse plano assinado!')

          await prismaClient.userPlans.delete({ where: { plan_id: String(planId), userId } })

          return response.send_ok('Assinatura removida com sucesso!')
        } catch (error) {
          next(error)
        }
      })

    return this.router
  }
}

const signaturesController = new SignaturesController()
export default signaturesController.handle()