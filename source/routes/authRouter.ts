import cors from 'cors'

import { Router } from "express";
import authMiddle from "../middleware/authMiddle";
import GenresController from "../features/Genres/GenresController";
import PlansController from '../features/Plans/PlansController';
import SignaturesController from '../features/Signatures/SignaturesController';
import MoviesController from '../features/Movies/MoviesController';

const authRouter = Router()

authRouter.use(cors())

authRouter.use(authMiddle)

// @ts-ignore
authRouter.get('/example', (_, res: Response) => res.send_ok('Teste realizado com sucesso!'))

authRouter.use('/genres', GenresController)
authRouter.use('/plans', PlansController)
authRouter.use('/signatures', SignaturesController)
authRouter.use('/movies', MoviesController)

export default authRouter