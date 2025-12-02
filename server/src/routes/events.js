import { Hono } from 'hono';
import { verifyAuth } from '@hono/auth-js';
import * as eventController from '../controllers/eventController.js';
import * as channelController from '../controllers/channelController.js';
import * as taskController from '../controllers/taskController.js';
import * as expenseController from '../controllers/expenseController.js';

const events = new Hono();

// Public routes
events.get('/', eventController.getEvents);
events.get('/:id', eventController.getEvent);

// Protected routes
events.use('/*', verifyAuth());
events.post('/', eventController.createEvent);
events.put('/:id', eventController.updateEvent);
events.delete('/:id', eventController.deleteEvent);

// Nested Routes (Protected)
// Channels
events.get('/:eventId/channels', channelController.getChannels);
events.post('/:eventId/channels', channelController.createChannel);

// Tasks
events.get('/:eventId/tasks', taskController.getTasks);
events.post('/:eventId/tasks', taskController.createTask);
events.put('/tasks/:id', taskController.updateTask); // Note: ID based update

// Expenses
events.get('/:eventId/expenses', expenseController.getExpenses);
events.post('/:eventId/expenses', expenseController.createExpense);

export default events;
