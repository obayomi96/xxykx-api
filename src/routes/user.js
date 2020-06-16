import express from 'express';
import UserController from '../controllers/UserController';

const userRoute = express();

userRoute.post('/signup', UserController.signUp);
userRoute.post('/login', UserController.login);

export default userRoute;
