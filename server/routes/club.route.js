import express from 'express';
import { createClub, getClubs, getSingleClub, followClub, unfollowClub } from '../controllers/club.controller.js';
import { checkAuth, checkIsAdmin } from './../middlewares/user.middleware.js';

const clubRouter = express.Router();

clubRouter.get('/', checkAuth, getClubs);
clubRouter.get('/:clubId', checkAuth, getSingleClub);
clubRouter.post('/', checkAuth, checkIsAdmin, createClub);
clubRouter.post('/follow/:clubId', checkAuth, followClub);
clubRouter.post('/unfollow/:clubId', checkAuth, unfollowClub);

// clubRouter.patch('/add/:userId', checkAuth, checkIsAdmin, addAdminToClub);
// clubRouter.delete('/:clubId', checkAuth, checkIsAdmin, deleteClub);

export default clubRouter 