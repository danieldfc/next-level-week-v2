import { Router } from 'express';

import ClassesController from '../controllers/ClassesController';

const classesRoute = Router();

const classesController = new ClassesController();

classesRoute.get('/', classesController.index);
classesRoute.post('/', classesController.create);

export default classesRoute;
