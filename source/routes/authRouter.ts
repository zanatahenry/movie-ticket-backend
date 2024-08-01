import { Router } from "express";
import authMiddle from "../middleware/authMiddle";

const authRouter = Router()

authRouter.use(authMiddle)

export default authRouter