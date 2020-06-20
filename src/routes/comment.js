import express from 'express';
import 'express-async-errors';
import CommentController from '../controllers/CommentController';
import middlewares from '../middlewares';

const {
  addComment,
  getComments,
  getSingleComment,
  updateComment,
  deleteComment,
} = CommentController;

const commentRoute = express();

commentRoute.post('/', middlewares.verifyToken, addComment);
commentRoute.get('/', getComments);
commentRoute.get('/:comment_id', getSingleComment);
commentRoute.patch('/:comment_id', middlewares.verifyToken, updateComment);
commentRoute.delete('/:comment_id', middlewares.verifyToken, deleteComment);

export default commentRoute;
