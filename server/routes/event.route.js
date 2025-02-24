import express from 'express';
const eventRouter = express.Router();

import { createEvent, deleteEvent, updateEvent, getEvents } from '../controllers/event.controller.js';
import { checkAuth } from './../middlewares/user.middleware.js';

eventRouter.get('/', getEvents);
eventRouter.post('/', checkAuth, createEvent);
eventRouter.patch('/:eventId', checkAuth, updateEvent);
eventRouter.delete('/:eventId', checkAuth, deleteEvent);

export default eventRouter