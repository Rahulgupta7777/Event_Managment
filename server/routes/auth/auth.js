import bcrypt from 'bcrypt';
import prisma from '../../db/db.js';

export default async function authRoutes(app, option) {
    // register a new user
    app.post('/register', async (req, reply) => {
        const { email, password, name, role } = req.body || {};
        if (!email || !password || !name) {
            return reply.status(400).send({ error: 'Missing required fields: email, password, name' });
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) return reply.status(409).send({ error: 'User already exists' });

        const hashed = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashed,
                name,
                role: role || 'MEMBER'
            }
        });

        const token = app.jwt.sign({ id: user.id, role: user.role });
        const safeUser = { id: user.id, email: user.email, name: user.name, role: user.role, createdAt: user.createdAt };
        reply.send({ token, user: safeUser });
    });

    // login
    app.post('/login', async (req, reply) => {
        const { email, password } = req.body || {};
        if (!email || !password) return reply.status(400).send({ error: 'Missing email or password' });

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return reply.status(401).send({ error: 'Invalid credentials' });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return reply.status(401).send({ error: 'Invalid credentials' });

        const token = app.jwt.sign({ id: user.id, role: user.role });
        const safeUser = { id: user.id, email: user.email, name: user.name, role: user.role, createdAt: user.createdAt };
        reply.send({ token, user: safeUser });
    });

    // Example protected route
    app.get('/me', { preValidation: [app.authenticate] }, async (req, reply) => {
        // request.user is populated by fastify-jwt
        const userId = req.user && req.user.id;
        if (!userId) return reply.status(401).send({ error: 'Unauthorized' });
        const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true, name: true, role: true, createdAt: true } });
        reply.send({ user });
    });
}