const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: process.env.CORS_CREDENTIALS === 'true' || true,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Serve static files
app.use(express.static('public'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Event Management System is running',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

// API routes (to be implemented)
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Event Management System API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      events: '/api/events',
      users: '/api/users',
    },
    documentation: '/api/docs',
  });
});

// Welcome route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Event Management System</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 2rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .container {
                background: rgba(255, 255, 255, 0.1);
                padding: 2rem;
                border-radius: 15px;
                backdrop-filter: blur(10px);
                text-align: center;
            }
            h1 { font-size: 2.5rem; margin-bottom: 1rem; }
            .badge {
                background: #ff6b6b;
                padding: 0.5rem 1rem;
                border-radius: 25px;
                font-weight: bold;
                display: inline-block;
                margin: 1rem 0;
            }
            .links {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
                margin-top: 2rem;
            }
            .link {
                background: rgba(255, 255, 255, 0.2);
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                text-decoration: none;
                color: white;
                transition: all 0.3s ease;
            }
            .link:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: translateY(-2px);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🎉 Event Management System</h1>
            <div class="badge">🎃 Hacktoberfest 2025</div>
            <p>Welcome to our modern event management platform!</p>
            <p>This project is participating in <strong>Hacktoberfest 2025</strong> and welcomes contributions from developers of all skill levels.</p>
            
            <div class="links">
                <a href="/api" class="link">📚 API Documentation</a>
                <a href="/health" class="link">💚 Health Check</a>
                <a href="https://github.com/GreenHacker420/Event_Managment" class="link">🔗 GitHub Repository</a>
                <a href="https://github.com/GreenHacker420/Event_Managment/blob/main/CONTRIBUTING.md" class="link">🤝 Contributing Guide</a>
            </div>
            
            <p style="margin-top: 2rem; opacity: 0.8;">
                Ready to contribute? Check out our 
                <a href="https://github.com/GreenHacker420/Event_Managment/labels/good%20first%20issue" style="color: #ffd93d;">good first issues</a>!
            </p>
        </div>
    </body>
    </html>
  `);
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found',
    path: req.originalUrl,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Something went wrong!' 
    : err.message;

  res.status(statusCode).json({
    error: 'Internal Server Error',
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Event Management System running on port ${PORT}`);
    console.log(`🌐 Visit: http://localhost:${PORT}`);
    console.log(`📚 API: http://localhost:${PORT}/api`);
    console.log(`💚 Health: http://localhost:${PORT}/health`);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 Running in development mode');
    }
  });
}

module.exports = app;
