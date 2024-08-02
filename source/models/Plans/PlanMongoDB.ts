import MongoDB from "../../globals/MongoDB";
import { PlanRepository } from "./PlanRepository";
import PlanSchema, { IPlanDocument, IPlanMongoDB } from "./PlanSchema";

const Plan = PlanSchema.mainSchema

const PlanMongoDB = MongoDB.model<IPlanDocument, IPlanMongoDB>(
  'Plan',
  Plan
)

export const PlanRepositoryImp = new PlanRepository(PlanMongoDB)

export default PlanMongoDB