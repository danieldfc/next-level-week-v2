import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersRoute = Router();

const usersController = new UsersController();

usersRoute.post('/', usersController.store);

export default usersRoute;
