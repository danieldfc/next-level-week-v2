import { Request, Response, request } from 'express';

import db from '../../database/connection';
import convertHoursToMinutes from '../../../utils/convertHourToMinutes';
import ListClassesService from '@infra/services/ListClassesService';
import CreateClassesService from '@infra/services/CreateClassesService';

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    const listClassesService = new ListClassesService();

    const classes = await listClassesService.execute({
      subject,
      week_day,
      time,
    });

    return response.json(classes);
  }

  async create(request: Request, response: Response) {
    const {
      subject,
      cost,
      schedule,
    } = request.body;
    const user_id = Number(request.user.id);
    
    const createClassesService = new CreateClassesService();
    
    const createdClass = await createClassesService.execute({
      subject,
      cost,
      schedule,
      user_id,
    });

    return response.json(createdClass);
  }
}