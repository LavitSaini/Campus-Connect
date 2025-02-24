import express from 'express';
import { createClub, getSingleClub, addAdminToClub } from '../controllers/club.controller.js';
import { checkAuth, checkIsAdmin } from './../middlewares/user.middleware.js';

const clubRouter = express.Router();

clubRouter.post('/', checkAuth, checkIsAdmin, createClub);
clubRouter.get('/:clubId', checkAuth, getSingleClub);
clubRouter.patch('/add/:userId', checkAuth, checkIsAdmin, addAdminToClub);

// clubRouter.delete('/:clubId', checkAuth, checkIsAdmin, deleteClub);

export default clubRouter 