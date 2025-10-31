import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import jwt from '@fastify/jwt';
import rateLimit from '@fastify/rate-limit';
import cookie from '@fastify/cookie';
import prisma from './db/db.js';
import authRoutes from './routes/auth/auth.js';
import testEmailRoutes from './routes/test/email.js';

const app = Fastify({
  logger: true
});

// security and utility plugins added
app.register(cors, { origin: true });
app.register(helmet);
app.register(rateLimit, { max: 100, timeWindow: '1 minute' });
app.register(cookie, { secret: process.env.COOKIE_SECRET || 'cookie-secret-change-me' });
app.register(jwt, { secret: process.env.JWT_SECRET || 'super-secret-change-me' });

// simple authenticate decorator using fastify-jwt
app.decorate('authenticate', async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

// Register routes
app.register(authRoutes, { prefix: '/auth' });
app.register(testEmailRoutes, { prefix: '/api' });

app.get('/', function (req, res) {
  res.send({ hello: 'world' });
});

const start = async () => {
  try {
    await app.listen({ port: Number(process.env.PORT) || 3300 });
    app.log.info('Server listening on port ' + (process.env.PORT || 3300));
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

export default { app, prisma };