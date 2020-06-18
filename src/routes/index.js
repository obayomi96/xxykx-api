import express from 'express';
import userRoute from './user';
import commentRoute from './comment';
import ReplyRoute from './reply';

const router = express();

router.get('/', (req, res) =>
  res.status(200).json({
    status: res.statusCode,
    message: 'Welcome to comments API',
  })
);

router.use('/', userRoute);
router.use('/comments', commentRoute);
router.use('/comments', ReplyRoute);

export default router;
