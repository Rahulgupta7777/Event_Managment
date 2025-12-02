import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import { authHandler, initAuthConfig, verifyAuth } from '@hono/auth-js'
import Google from '@auth/core/providers/google'
import GitHub from '@auth/core/providers/github'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import * as schema from './schema.js'

const app = new Hono()

// Database connection
const connection = await mysql.createConnection(process.env.DATABASE_URL)
const db = drizzle(connection, { schema, mode: 'default' })

app.use('*', logger())
app.use('*', cors())

// Auth.js Configuration
app.use('*', initAuthConfig((c) => ({
    secret: process.env.AUTH_SECRET,
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    adapter: DrizzleAdapter(db),
})))

app.use('/api/auth/*', authHandler())

// Health check
app.get('/', (c) => {
    return c.text('Hello Hono with Drizzle (MySQL)!')
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port
})
