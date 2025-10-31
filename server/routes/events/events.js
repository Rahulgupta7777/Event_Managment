import prisma from '../../db/db.js';

export default async function eventRoutes(app, options) {
    // Get all events (public)
    app.get('/events', async (req, reply) => {
        try {
            const events = await prisma.event.findMany({
                include: {
                    organizer: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                    _count: {
                        select: {
                            eventMembers: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
            reply.send({ events });
        } catch (error) {
            app.log.error('Error fetching events:', error);
            reply.status(500).send({ error: 'Failed to fetch events' });
        }
    });

    // Get single event by ID
    app.get('/events/:id', async (req, reply) => {
        try {
            const { id } = req.params;
            const event = await prisma.event.findUnique({
                where: { id },
                include: {
                    organizer: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: true
                        }
                    },
                    eventMembers: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    },
                    channels: {
                        select: {
                            id: true,
                            name: true,
                            description: true
                        }
                    }
                }
            });

            if (!event) {
                return reply.status(404).send({ error: 'Event not found' });
            }

            reply.send({ event });
        } catch (error) {
            app.log.error('Error fetching event:', error);
            reply.status(500).send({ error: 'Failed to fetch event' });
        }
    });

    // Create new event (protected)
    app.post('/events', { preValidation: [app.authenticate] }, async (req, reply) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return reply.status(401).send({ error: 'Unauthorized' });
            }

            const { name, type, eventDate, venue, status } = req.body || {};

            if (!name || !type || !venue) {
                return reply.status(400).send({ 
                    error: 'Missing required fields: name, type, venue' 
                });
            }

            const event = await prisma.event.create({
                data: {
                    name,
                    type,
                    eventDate: eventDate ? new Date(eventDate) : null,
                    venue,
                    status: status || 'SCHEDULED',
                    organizerId: userId
                },
                include: {
                    organizer: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                }
            });

            reply.status(201).send({ event });
        } catch (error) {
            app.log.error('Error creating event:', error);
            reply.status(500).send({ error: 'Failed to create event' });
        }
    });

    // Update event (protected - only organizer)
    app.put('/events/:id', { preValidation: [app.authenticate] }, async (req, reply) => {
        try {
            const userId = req.user?.id;
            const { id } = req.params;

            if (!userId) {
                return reply.status(401).send({ error: 'Unauthorized' });
            }

            // Check if event exists and user is the organizer
            const existingEvent = await prisma.event.findUnique({
                where: { id }
            });

            if (!existingEvent) {
                return reply.status(404).send({ error: 'Event not found' });
            }

            if (existingEvent.organizerId !== userId) {
                return reply.status(403).send({ error: 'Only the organizer can update this event' });
            }

            const { name, type, eventDate, venue, status } = req.body || {};

            const event = await prisma.event.update({
                where: { id },
                data: {
                    ...(name && { name }),
                    ...(type && { type }),
                    ...(eventDate && { eventDate: new Date(eventDate) }),
                    ...(venue && { venue }),
                    ...(status && { status })
                },
                include: {
                    organizer: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                }
            });

            reply.send({ event });
        } catch (error) {
            app.log.error('Error updating event:', error);
            reply.status(500).send({ error: 'Failed to update event' });
        }
    });

    // Delete event (protected - only organizer)
    app.delete('/events/:id', { preValidation: [app.authenticate] }, async (req, reply) => {
        try {
            const userId = req.user?.id;
            const { id } = req.params;

            if (!userId) {
                return reply.status(401).send({ error: 'Unauthorized' });
            }

            // Check if event exists and user is the organizer
            const existingEvent = await prisma.event.findUnique({
                where: { id }
            });

            if (!existingEvent) {
                return reply.status(404).send({ error: 'Event not found' });
            }

            if (existingEvent.organizerId !== userId) {
                return reply.status(403).send({ error: 'Only the organizer can delete this event' });
            }

            await prisma.event.delete({
                where: { id }
            });

            reply.send({ message: 'Event deleted successfully' });
        } catch (error) {
            app.log.error('Error deleting event:', error);
            reply.status(500).send({ error: 'Failed to delete event' });
        }
    });

    // Get events by current user (protected)
    app.get('/my-events', { preValidation: [app.authenticate] }, async (req, reply) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return reply.status(401).send({ error: 'Unauthorized' });
            }

            const events = await prisma.event.findMany({
                where: {
                    organizerId: userId
                },
                include: {
                    _count: {
                        select: {
                            eventMembers: true,
                            channels: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            reply.send({ events });
        } catch (error) {
            app.log.error('Error fetching user events:', error);
            reply.status(500).send({ error: 'Failed to fetch events' });
        }
    });
}
