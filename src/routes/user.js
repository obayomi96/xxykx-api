import express from 'express';
import UserController from '../controllers/UserController';
import middlewares from '../middlewares';

const { signUp, login, fetchOwnUserProfile } = UserController;

const userRoute = express();

userRoute.post('/register', signUp);
userRoute.post('/login', login);
userRoute.get('/me/:user_id', middlewares.verifyToken, fetchOwnUserProfile);

export default userRoute;
