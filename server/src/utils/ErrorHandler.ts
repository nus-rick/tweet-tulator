import { Response } from 'express';

export const successResponse = (res: Response, data: any) => {
  return res.status(200).json({ status: 200, data });
}

export const errorResponse = (res: Response, error: Error, status: number = 400) => {
  return res.status(status).json({ status, message: error.message, stack: error.stack });
}