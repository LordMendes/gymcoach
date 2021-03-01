import { Router } from 'express';

import clientRouter from '@modules/clients/infra/http/routes/clients.routes';
import usersRouter from '@modules/users/infra/http/routes//users.routes';

const routes = Router();

routes.use('/clients', clientRouter);
routes.use('/users', usersRouter);

export default routes;
