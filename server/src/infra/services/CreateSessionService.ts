import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import db from '@infra/database/connection';
import authConfig from '@config/auth';
import AppError from '@infra/errors/AppError';

import User from '@infra/database/entities/User';

interface RequestDTO {
  email: string;
  password: string;
}

export default class CreateSessionService {
  async execute({
    email,
    password,
  }: RequestDTO) {
    const verifyUser = await db('users').where('email', email).select('*');

    if (!verifyUser[0]) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const user = verifyUser[0] as User;
    
    const passwordMatched = await compare(password, user.password);
    
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    delete user.password;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return { user, token };
  }
}
