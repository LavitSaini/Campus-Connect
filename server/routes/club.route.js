import express from "express";
import {
  createClub,
  deleteClub,
  getClubs,
  getSingleClub,
  followClub,
  unfollowClub,
  getUserClubs,
  updateClub,
} from "../controllers/club.controller.js";
import { checkAuth, checkIsAdmin } from "./../middlewares/user.middleware.js";

const clubRouter = express.Router();

clubRouter.get("/", checkAuth, getClubs);
clubRouter.get("/:clubId", checkAuth, getSingleClub);
clubRouter.get("/user/:userId", checkAuth, getUserClubs);
clubRouter.post("/", checkAuth, checkIsAdmin, createClub);
clubRouter.delete('/:clubId', checkAuth, checkIsAdmin, deleteClub);
clubRouter.patch("/:clubId", checkAuth, checkIsAdmin, updateClub)
clubRouter.post("/follow/:clubId", checkAuth, followClub);
clubRouter.post("/unfollow/:clubId", checkAuth, unfollowClub);

// clubRouter.patch('/add/:userId', checkAuth, checkIsAdmin, addAdminToClub);

export default clubRouter;
