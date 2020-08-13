import { Router } from 'express';

import ConnectionsController from '../controllers/ConnectionsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const connectionsRoute = Router();

const connectionsController = new ConnectionsController();

connectionsRoute.use(ensureAuthenticated);

connectionsRoute.get('/', connectionsController.index);
connectionsRoute.post('/', connectionsController.create);

export default connectionsRoute;
