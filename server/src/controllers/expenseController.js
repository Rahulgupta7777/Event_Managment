import { getDb, schema } from '../db/index.js';
import { eq } from 'drizzle-orm';

export const getExpenses = async (c) => {
    const eventId = c.req.param('eventId');
    try {
        const db = await getDb();
        const expenses = await db.select().from(schema.expenses).where(eq(schema.expenses.eventId, eventId));
        return c.json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        return c.json({ error: 'Failed to fetch expenses' }, 500);
    }
};

export const createExpense = async (c) => {
    const eventId = c.req.param('eventId');
    try {
        const body = await c.req.json();
        const { amount, description, category, channelId } = body;

        if (!amount || !description) {
            return c.json({ error: 'Amount and Description are required' }, 400);
        }

        const db = await getDb();
        const newExpense = {
            eventId,
            amount,
            description,
            category,
            channelId,
            date: new Date(),
        };

        await db.insert(schema.expenses).values(newExpense);
        return c.json({ message: 'Expense created', expense: newExpense }, 201);
    } catch (error) {
        console.error('Error creating expense:', error);
        return c.json({ error: 'Failed to create expense' }, 500);
    }
};
