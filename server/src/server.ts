import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import 'express-async-errors';

import AppError from '@infra/errors/AppError';
import routes from '@infra/http/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  async (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);
    
    return response.status(500).json({
      status: 'error',
      message: err.message,
    });
  },
);

app.listen(3333, () => {
  console.log('Server starting on port 3333!')
});