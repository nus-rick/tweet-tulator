import express from 'express';
import messageRouter from './message';
import userRouter from './user';
const router = express.Router();

messageRouter.use('/messages', messageRouter);
userRouter.use('/users', userRouter);

router.use(messageRouter);
router.use(userRouter);

export default router;
