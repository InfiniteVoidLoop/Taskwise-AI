import express from 'express';
import {signUpHandler, logInHandler, sendEmailResetPassHandler, deleteAccountHandler} from './handler.js';

const authRouter = express.Router();

authRouter.post('/signup', signUpHandler);
authRouter.post('/login', logInHandler);
authRouter.post('/resetPass', sendEmailResetPassHandler);
authRouter.delete('/deleteAccount', deleteAccountHandler);

export {authRouter};