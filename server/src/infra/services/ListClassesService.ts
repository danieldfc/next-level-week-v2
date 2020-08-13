import db from '@infra/database/connection';

import convertHoursToMinutes from '@utils/convertHourToMinutes';
import AppError from '@infra/errors/AppError';

interface RequestDTO {
  subject: string;
  week_day: string
  time: string;
}

export default class ListClassesService {
  async execute({
    subject,
    time,
    week_day,
  }: RequestDTO) {
    if (!week_day || !subject || !time) {
      throw new AppError('Missing filters to search classes');
    }

    const timeInMinutes = convertHoursToMinutes(time);

    const classes = await db('classes')
      .whereExists(function() {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return classes;
  }
}
