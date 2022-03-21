import express, { Request, Response } from 'express';
import UserHandler from '../../handlers/UserHandler';
import { successResponse, errorResponse } from '../../utils/ErrorHandler';

const userRouter = express.Router();

userRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const handler = new UserHandler();
    const user = await handler.signIn(username, password);

    return successResponse(res, user);
  } catch (error) {
    return errorResponse(res, error);
  }
});

export default userRouter;
