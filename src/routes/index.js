import express from 'express';
import userRoute from './user';

const router = express();

router.get('/', (req, res) =>
  res.status(200).json({
    status: res.statusCode,
    message: 'Welcome to comments API',
  })
);

router.use('/auth', userRoute);

export default router;
