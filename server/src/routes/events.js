import { Hono } from 'hono';
import { verifyAuth } from '@hono/auth-js';
import * as eventController from '../controllers/eventController.js';

const events = new Hono();

// Public routes (or protected if you prefer)
events.get('/', eventController.getEvents);
events.get('/:id', eventController.getEvent);

// Protected routes
events.use('/*', verifyAuth());
events.post('/', eventController.createEvent);
events.put('/:id', eventController.updateEvent);
events.delete('/:id', eventController.deleteEvent);

export default events;
