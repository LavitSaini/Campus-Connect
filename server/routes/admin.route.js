import express from 'express';
import {
    signUpUser,
    loginUser,
    logoutUser,
    refreshTokens,
    getUserProfile,
} from '../controllers/admin.controller.js';
import { checkAuth, validateAdminSignUpData } from '../middlewares/admin.middleware.js';

const adminRouter = express.Router();

adminRouter.post('/signup', validateAdminSignUpData, signUpUser);
adminRouter.post('/login', loginUser);
adminRouter.post('/logout', logoutUser);
adminRouter.post('/refresh-token', refreshTokens);
adminRouter.get('/profile', checkAuth, getUserProfile);

export default adminRouter;
