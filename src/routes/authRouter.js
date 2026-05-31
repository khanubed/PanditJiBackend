// backend/routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import { login, logout } from '../controllers/authController.js';

const authRouter = express.Router();


authRouter.post('/login',login);
authRouter.post('/logout', logout);

export default authRouter;


  
