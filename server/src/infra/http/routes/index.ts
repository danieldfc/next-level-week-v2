import { Router } from 'express';

import usersRoute from './users.routes';
import sessionsRoute from './sessions.routes';
import classesRoute from './classes.routes';
import connectionsRoute from './connections.routes';

const routes = Router();

routes.use('/users', usersRoute);
routes.use('/sessions', sessionsRoute);
routes.use('/classes', classesRoute);
routes.use('/connections', connectionsRoute);

export default routes;
