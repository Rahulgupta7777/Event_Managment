import { getDb, schema } from '../db/index.js';
import { eq, and } from 'drizzle-orm';

export const getChannels = async (c) => {
    const eventId = c.req.param('eventId');
    try {
        const db = await getDb();
        const channels = await db.select().from(schema.channels).where(eq(schema.channels.eventId, eventId));
        return c.json(channels);
    } catch (error) {
        console.error('Error fetching channels:', error);
        return c.json({ error: 'Failed to fetch channels' }, 500);
    }
};

export const createChannel = async (c) => {
    const eventId = c.req.param('eventId');
    try {
        const body = await c.req.json();
        const { name, description } = body;

        if (!name) {
            return c.json({ error: 'Name is required' }, 400);
        }

        const db = await getDb();
        const newChannel = {
            eventId,
            name,
            description,
        };

        await db.insert(schema.channels).values(newChannel);
        return c.json({ message: 'Channel created', channel: newChannel }, 201);
    } catch (error) {
        console.error('Error creating channel:', error);
        return c.json({ error: 'Failed to create channel' }, 500);
    }
};
