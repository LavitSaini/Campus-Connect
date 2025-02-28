import express from 'express';
import { createClub, getSingleClub, addAdminToClub, deleteClub, followClub, unfollowClub } from '../controllers/club.controller.js';
import { checkAuth, checkIsAdmin } from './../middlewares/user.middleware.js';

const clubRouter = express.Router();

clubRouter.post('/', checkAuth, checkIsAdmin, createClub);
// TODO: -> get clubs
clubRouter.get('/:clubId', checkAuth, getSingleClub);
clubRouter.post('/:clubId/add/:adminId', checkAuth, checkIsAdmin,  addAdminToClub);
clubRouter.delete('/:clubId', checkAuth, checkIsAdmin, deleteClub);

clubRouter.post('/:clubId/follow', checkAuth, followClub);
clubRouter.post('/:clubId/unfollow', checkAuth, unfollowClub);

export default clubRouter 