import { Router } from 'express';

import clientRouter from './clients.routes';

const routes = Router();

routes.use('/clients', clientRouter);

export default routes;
