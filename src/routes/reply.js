import express from 'express';
import 'express-async-errors';
import ReplyController from '../controllers/ReplyController';
import middlewares from '../middlewares';

const ReplyRoute = express();

ReplyRoute.post(
  '/:comment_id/replies',
  middlewares.verifyToken,
  ReplyController.addReply
);

export default ReplyRoute;
