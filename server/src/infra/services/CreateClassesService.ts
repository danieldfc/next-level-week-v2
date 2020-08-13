import db from "@infra/database/connection";

import convertHourToMinutes from '@utils/convertHourToMinutes';
import AppError from "@infra/errors/AppError";

interface ScheduleItem {
  class_id: number;
  week_day: number;
  from: string;
  to: string;
}

interface RequestDTO {
  subject: string;
  cost: number;
  schedule: ScheduleItem[];
  user_id: number;
}

export default class CreateClassesService {
  async execute({
    subject,
    cost,
    schedule,
    user_id,
  }: RequestDTO) {
    const trx = await db.transaction();

    try {
      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedClassesIds[0];

      const classSchedule = schedule.map(item => {
        return {
          class_id,
          week_day: item.week_day,
          from: convertHourToMinutes(item.from),
          to: convertHourToMinutes(item.to),
        };
      });
      
      await trx('class_schedule').insert(classSchedule);
      
      const [findClass] = await trx('classes').where('id', class_id).select('*');

      await trx.commit();

      return findClass;
    } catch (err) {
      await trx.rollback();

      throw new AppError('Unexpected error while createing new class');
    }
  }
}