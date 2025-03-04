import express from 'express';
const eventRouter = express.Router();

import { createEvent, deleteEvent, updateEvent, getEvents, getSingleEvent } from '../controllers/event.controller.js';
import { checkAuth, checkIsAdmin } from './../middlewares/user.middleware.js';

eventRouter.get('/', checkAuth, getEvents);
eventRouter.get('/:eventId', checkAuth, getSingleEvent);
eventRouter.post('/', checkAuth, checkIsAdmin, createEvent);
eventRouter.patch('/:eventId', checkAuth, checkIsAdmin, updateEvent);
eventRouter.delete('/:eventId', checkAuth, checkIsAdmin, deleteEvent);

export default eventRouter