import { getDb, schema } from '../db/index.js';
import { eq } from 'drizzle-orm';

export const getEvents = async (c) => {
    try {
        const db = await getDb();
        const auth = c.get('authUser');
        // Optional: Filter by user if needed, or return all public events
        // For now, let's return all events
        const allEvents = await db.select().from(schema.events);
        return c.json(allEvents);
    } catch (error) {
        console.error('Error fetching events:', error);
        return c.json({ error: 'Failed to fetch events' }, 500);
    }
};

export const getEvent = async (c) => {
    const id = c.req.param('id');
    try {
        const db = await getDb();
        const event = await db.select().from(schema.events).where(eq(schema.events.id, id));
        if (event.length === 0) {
            return c.json({ error: 'Event not found' }, 404);
        }
        return c.json(event[0]);
    } catch (error) {
        console.error('Error fetching event:', error);
        return c.json({ error: 'Failed to fetch event' }, 500);
    }
};

export const createEvent = async (c) => {
    try {
        const db = await getDb();
        const body = await c.req.json();
        const { title, description, date, location, budget, category, guestCount } = body;

        if (!title || !date) {
            return c.json({ error: 'Title and Date are required' }, 400);
        }

        
        let organizerId = 'guest-user-id'; 
        const auth = c.get('authUser');
        if (auth?.session?.user?.email) {
            const user = await db.select().from(schema.users).where(eq(schema.users.email, auth.session.user.email));
            if (user.length > 0) {
                organizerId = user[0].id;
            }
        }

        const newEvent = {
            title,
            description,
            date: new Date(date),
            location,
            budget: budget ? String(budget) : null,
            category,
            guestCount: guestCount ? Number(guestCount) : null,
            organizerId,
        };

        await db.insert(schema.events).values(newEvent);

        return c.json({ message: 'Event created successfully', event: newEvent }, 201);
    } catch (error) {
        console.error('Error creating event:', error);
        return c.json({ error: 'Failed to create event' }, 500);
    }
};

export const updateEvent = async (c) => {
    const id = c.req.param('id');
    try {
        const auth = c.get('authUser');
        if (!auth?.session?.user) {
            return c.json({ error: 'Unauthorized' }, 401);
        }

        const db = await getDb();
        const body = await c.req.json();

        // Verify ownership
        const event = await db.select().from(schema.events).where(eq(schema.events.id, id));
        if (event.length === 0) {
            return c.json({ error: 'Event not found' }, 404);
        }

        // Get user id
        const userEmail = auth.session.user.email;
        const user = await db.select().from(schema.users).where(eq(schema.users.email, userEmail));
        if (user.length === 0 || user[0].id !== event[0].organizerId) {
            return c.json({ error: 'Unauthorized' }, 403);
        }

        const { title, description, date, location, budget, category, guestCount } = body;

        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (date) updateData.date = new Date(date);
        if (location) updateData.location = location;
        if (budget) updateData.budget = String(budget);
        if (category) updateData.category = category;
        if (guestCount) updateData.guestCount = Number(guestCount);
        updateData.updatedAt = new Date();

        await db.update(schema.events).set(updateData).where(eq(schema.events.id, id));

        return c.json({ message: 'Event updated successfully' });
    } catch (error) {
        console.error('Error updating event:', error);
        return c.json({ error: 'Failed to update event' }, 500);
    }
};

export const deleteEvent = async (c) => {
    const id = c.req.param('id');
    try {
        const auth = c.get('authUser');
        if (!auth?.session?.user) {
            return c.json({ error: 'Unauthorized' }, 401);
        }

        const db = await getDb();

        // Verify ownership
        const event = await db.select().from(schema.events).where(eq(schema.events.id, id));
        if (event.length === 0) {
            return c.json({ error: 'Event not found' }, 404);
        }

        const userEmail = auth.session.user.email;
        const user = await db.select().from(schema.users).where(eq(schema.users.email, userEmail));
        if (user.length === 0 || user[0].id !== event[0].organizerId) {
            return c.json({ error: 'Unauthorized' }, 403);
        }

        await db.delete(schema.events).where(eq(schema.events.id, id));

        return c.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        return c.json({ error: 'Failed to delete event' }, 500);
    }
};
