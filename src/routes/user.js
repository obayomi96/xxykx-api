import express from 'express';
import UserController from '../controllers/UserController';
import middlewares from '../middlewares';

const {
  signUp,
  login,
  fetchOwnProfile,
  updateProfile,
  fetchProfile,
} = UserController;

const userRoute = express();

userRoute.post('/register', signUp);
userRoute.post('/login', login);
userRoute.get('/me/:user_id', middlewares.verifyToken, fetchOwnProfile);
userRoute.patch('/me/:user_id', middlewares.verifyToken, updateProfile);
userRoute.get('/users/:user_id', fetchProfile);

export default userRoute;
