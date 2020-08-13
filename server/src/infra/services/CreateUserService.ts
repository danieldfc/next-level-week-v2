import { hash } from 'bcryptjs';

import AppError from '@infra/errors/AppError';

import db from '@infra/database/connection';
import User from '@infra/database/entities/User';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  async execute({
    name,
    email,
    password,
  }: RequestDTO) {
    const verifyUserExist = await db('users').where('email', email);

    if(verifyUserExist[0]) {
      throw new AppError('User already exists.');
    }

    const [idUser] = await db('users').insert({
      name,
      email,
      password: await hash(password, 8),
    });
    
    const findUser = await db('users').where('id', idUser)
      .select('id', 'name', 'email');

    const user = findUser[0] as User;

    return user;
  }
}
