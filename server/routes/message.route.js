<<<<<<< HEAD
import express from 'express';
import { getMessages } from '../controllers/message.controller.js';
import { checkAuth } from './../middlewares/user.middleware.js';

const messageRouter = express.Router();

messageRouter.get('/', checkAuth, getMessages);

export default messageRouter

=======
import express from "express";
import { getMessages } from "../controllers/message.controller.js";
import { checkAuth } from "./../middlewares/user.middleware.js";

const messageRouter = express.Router();

messageRouter.get("/", checkAuth, getMessages);

export default messageRouter;
>>>>>>> 3b56f35 (Frontend Updated)
