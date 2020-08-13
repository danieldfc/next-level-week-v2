import { Router } from 'express';

import ClassesController from '../controllers/ClassesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const classesRoute = Router();

const classesController = new ClassesController();

classesRoute.use(ensureAuthenticated);

classesRoute.get('/', classesController.index);
classesRoute.post('/', classesController.create);

export default classesRoute;
