import { getDb, schema } from '../db/index.js';
import { eq } from 'drizzle-orm';

export const getTasks = async (c) => {
    const eventId = c.req.param('eventId');
    try {
        const db = await getDb();
        const tasks = await db.select().from(schema.tasks).where(eq(schema.tasks.eventId, eventId));
        return c.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return c.json({ error: 'Failed to fetch tasks' }, 500);
    }
};

export const createTask = async (c) => {
    const eventId = c.req.param('eventId');
    try {
        const body = await c.req.json();
        const { title, description, channelId, assigneeId, priority, dueDate, status } = body;

        if (!title) {
            return c.json({ error: 'Title is required' }, 400);
        }

        const db = await getDb();
        const newTask = {
            eventId,
            title,
            description,
            channelId,
            assigneeId,
            priority,
            dueDate: dueDate ? new Date(dueDate) : null,
            status,
        };

        await db.insert(schema.tasks).values(newTask);
        return c.json({ message: 'Task created', task: newTask }, 201);
    } catch (error) {
        console.error('Error creating task:', error);
        return c.json({ error: 'Failed to create task' }, 500);
    }
};

export const updateTask = async (c) => {
    const id = c.req.param('id');
    try {
        const body = await c.req.json();
        const db = await getDb();

        const updateData = { ...body, updatedAt: new Date() };
        if (updateData.dueDate) updateData.dueDate = new Date(updateData.dueDate);

        await db.update(schema.tasks).set(updateData).where(eq(schema.tasks.id, id));
        return c.json({ message: 'Task updated' });
    } catch (error) {
        console.error('Error updating task:', error);
        return c.json({ error: 'Failed to update task' }, 500);
    }
};
