import { Router } from 'express';

import ConnectionsController from '../controllers/ConnectionsController';

const connectionsRoute = Router();

const connectionsController = new ConnectionsController();

connectionsRoute.get('/', connectionsController.index);
connectionsRoute.post('/', connectionsController.create);

export default connectionsRoute;
