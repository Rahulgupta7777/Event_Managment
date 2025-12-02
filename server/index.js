import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { PrismaClient } from '@prisma/client'
import { enhance } from '@zenstackhq/runtime'
import { createHonoHandler } from '@zenstackhq/server/hono'
import { authHandler, initAuthConfig, verifyAuth } from '@hono/auth-js'
import Google from '@auth/core/providers/google'
import GitHub from '@auth/core/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'

const app = new Hono()

const prisma = new PrismaClient()

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
    adapter: PrismaAdapter(prisma),
})))

app.use('/api/auth/*', authHandler())

// ZenStack automatic CRUD API
// This creates routes like /api/model/user, /api/model/event, etc.
const factory = createHonoHandler({ prefix: '/api/model' })
app.use('/api/model/*', factory(async (c) => {
    const auth = c.get('authUser')
    // Enhance Prisma with user context for access policies
    return enhance(prisma, { user: auth?.session?.user })
}))

// Health check
app.get('/', (c) => {
    return c.text('Hello Hono!')
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port
})
