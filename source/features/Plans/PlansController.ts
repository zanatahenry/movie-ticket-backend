import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../../factory/Controller";
import PlanModel from "../../models/Plans/PlanModel";
import { plansServiceImp } from "./PlansService";
import { ObjectId } from "../../globals/MongoDB";

class PlansController extends Controller {
  handle(): Router {
    this.router.get('/list', async (request: Request, response: Response, next: NextFunction) => {
      const { page, pageSize, search } = request.query

      try {
        const pageCount = Boolean(Number(page)) ? Number(page) : 1

        const allPlans = await plansServiceImp.list({
          page: pageCount, 
          pageSize: Number(pageSize),
          search
        })

        return response.send_ok('Plano de assinautura encontrados com sucesso!', { plans: allPlans })
      } catch (error) {
        next(error)
      }
    })

    this.router.post('/', async (request: Request, response: Response, next: NextFunction) => {
      const { genres, name, version } = request.body

      try {
        if (genres && !Array.isArray(genres)) return response.send_badRequest('Gênero inválido!')

        const newPlan = new PlanModel({
          genres,
          name,
          version
        })

        const createdPlan = await plansServiceImp.create(newPlan)
        if (!createdPlan) return response.send_badRequest('Ocorreu um problema ao cadastrar plano!')

        return response.send_created('Plano de assinatura criada com sucesso!', { plan: createdPlan._id })
      } catch (error) {
        next(error)
      }
    })

    this.router.patch('/:planId/update', async (request: Request, response: Response, next: NextFunction) => {
      const { planId } = request.params
      const { name, genres, version } = request.body

      try {
        const plan = await plansServiceImp.findById(ObjectId(planId))
        if (!plan) return response.send_notFound('Plano não encontrado!')

        const planModel = new PlanModel({
          name,
          genres,
          version
        })

        const updatedPlan = await plansServiceImp.findByIdAndUpdate(ObjectId(planId), planModel)
        if (!updatedPlan) return response.send_badRequest('Ocorreu um problema ao atualizar plano!')

        return response.send_ok('Plano de assinautura encontrado com sucesso!', { plan })
      } catch (error) {
        next(error)
      }
    })

    this.router.get('/:planId', async (request: Request, response: Response, next: NextFunction) => {
      const { planId } = request.params

      try {
        const plan = await plansServiceImp.findById(ObjectId(planId))
        if (!plan) return response.send_notFound('Plano não encontrado!')

        return response.send_ok('Plano de assinautura encontrado com sucesso!', { plan })
      } catch (error) {
        next(error)
      }
    })

    this.router.delete('/delete', async (request: Request, response: Response, next: NextFunction) => {
      const { planId } = request.body

      try {
        const plan = await plansServiceImp.findById(ObjectId(planId))
        if (!plan) return response.send_notFound('Plano não encontrado!')

        const deletedPlan = await plansServiceImp.deletePlan(planId)
        if (!deletedPlan) return response.send_badRequest('Ocorreu um problema ao deletar plano!')

        return response.send_ok('Plano de assinautura deletado com sucesso!')
      } catch (error) {
        next(error)
      }
    })

    return this.router
  }
}

const plansController = new PlansController()
export default plansController.handle()