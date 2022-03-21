import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

import indexRouter from './api/v1/index';

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1', indexRouter);

mongoose.connect(process.env.DATABASE_URL || 'mongodb://mongo:mongo@db:27017/tweettulator');

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  /* tslint:disable-next-line */
  console.log('Error', err);
  return res.status(500).json({
    message: err.message,
    stack: err.stack
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    /* tslint:disable-next-line */
    console.log(`⚡️[server]: Server is running`);
  });
}

export default app;