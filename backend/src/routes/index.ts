import { Router } from 'express';

import clientRouter from './clients.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/clients', clientRouter);
routes.use('/users', usersRouter);

export default routes;
