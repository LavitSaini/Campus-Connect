import express from 'express';
<<<<<<< HEAD
import { createClub, getSingleClub, addAdminToClub, deleteClub, followClub, unfollowClub, getClubs } from '../controllers/club.controller.js';
=======
import { createClub, getClubs, getSingleClub, followClub, unfollowClub } from '../controllers/club.controller.js';
>>>>>>> 3b56f35 (Frontend Updated)
import { checkAuth, checkIsAdmin } from './../middlewares/user.middleware.js';

const clubRouter = express.Router();

<<<<<<< HEAD
clubRouter.get('/', checkAuth, getClubs); // get clubs
clubRouter.post('/', checkAuth, checkIsAdmin, createClub); // create club
clubRouter.get('/:clubId', checkAuth, getSingleClub); // get single club
clubRouter.post('/:clubId/add/:adminId', checkAuth, checkIsAdmin,  addAdminToClub); // add admin to club
clubRouter.delete('/:clubId', checkAuth, checkIsAdmin, deleteClub); // delete club

clubRouter.post('/:clubId/follow', checkAuth, followClub); // follow club 
clubRouter.post('/:clubId/unfollow', checkAuth, unfollowClub); // unfollow club
=======
clubRouter.get('/', checkAuth, getClubs);
clubRouter.get('/:clubId', checkAuth, getSingleClub);
clubRouter.post('/', checkAuth, checkIsAdmin, createClub);
clubRouter.post('/follow/:clubId', checkAuth, followClub);
clubRouter.post('/unfollow/:clubId', checkAuth, unfollowClub);

// clubRouter.patch('/add/:userId', checkAuth, checkIsAdmin, addAdminToClub);
// clubRouter.delete('/:clubId', checkAuth, checkIsAdmin, deleteClub);
>>>>>>> 3b56f35 (Frontend Updated)

export default clubRouter 