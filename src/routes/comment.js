import express from 'express';
import 'express-async-errors';
import CommentController from '../controllers/CommentController';
import middlewares from '../middlewares';

const commentRoute = express();

commentRoute.post('/', middlewares.verifyToken, CommentController.addComment);
commentRoute.get('/', CommentController.getComments);
commentRoute.get('/:comment_id', CommentController.getSingleComment);
commentRoute.patch(
  '/:comment_id',
  middlewares.verifyToken,
  CommentController.updateComment
);
commentRoute.delete(
  '/:comment_id',
  middlewares.verifyToken,
  CommentController.deleteComment
);

export default commentRoute;
