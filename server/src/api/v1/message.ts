import express, { Request, Response } from 'express';
import MessageHandler from '../../handlers/MessageHandler';
import { successResponse, errorResponse } from '../../utils/ErrorHandler';

const messageRouter = express.Router();

messageRouter.get('/', async (req: Request, res: Response) => {
    try {
      const handler = new MessageHandler();
      const messages = await handler.getAll();

      return successResponse(res, messages);
    } catch (error) {
      return errorResponse(res, error);
    }
  }
);

messageRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { bodyText, author, parentId } = req.body;

    const handler = new MessageHandler();
    const newMessage = await handler.create({ bodyText, author, parentId });

    return successResponse(res, newMessage);
  } catch (error) {
    return errorResponse(res, error);
  }
}
);

export default messageRouter;
