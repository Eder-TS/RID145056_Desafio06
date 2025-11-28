import { Router } from 'express';
import produtoRoutes from './produtoRoutes.js';

const routes = Router();

routes.use('/produtos', produtoRoutes);



export default routes;