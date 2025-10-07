# 🚀 Setup Guide

This guide will help you set up the Event Management System for development.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (v6 or higher) - Usually comes with Node.js
- **Git** - [Download here](https://git-scm.com/)
- **MongoDB** or **PostgreSQL** (choose one)
  - MongoDB: [Download here](https://www.mongodb.com/try/download/community)
  - PostgreSQL: [Download here](https://www.postgresql.org/download/)

## 🔧 Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/GreenHacker420/Event_Managment.git
cd Event_Managment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Basic Configuration
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000

# Database (choose one)
MONGODB_URI=mongodb://localhost:27017/event_management
# OR
# DATABASE_URL=postgresql://username:password@localhost:5432/event_management

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration (optional for development)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 4. Database Setup

#### For MongoDB:
1. Start MongoDB service
2. The database will be created automatically when you first run the app

#### For PostgreSQL:
1. Create a new database:
   ```sql
   CREATE DATABASE event_management;
   ```
2. Run migrations (when implemented):
   ```bash
   npm run db:migrate
   ```

### 5. Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🔍 Code Quality

```bash
# Run linting
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run format
```

## 🐳 Docker Setup (Alternative)

If you prefer using Docker:

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## 📁 Project Structure

```
Event_Managment/
├── src/
│   ├── controllers/     # Route controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utility functions
│   └── config/         # Configuration files
├── public/             # Static files
│   ├── css/
│   ├── js/
│   └── images/
├── tests/              # Test files
│   ├── unit/
│   └── integration/
├── docs/               # Documentation
├── .github/            # GitHub templates and workflows
└── server.js           # Main server file
```

## 🔧 Development Tools

### Recommended VS Code Extensions

- ESLint
- Prettier
- GitLens
- Thunder Client (for API testing)
- MongoDB for VS Code (if using MongoDB)

### Useful Commands

```bash
# Install a new dependency
npm install package-name

# Install a dev dependency
npm install --save-dev package-name

# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix security vulnerabilities
npm audit fix
```

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process using port 3000
   lsof -ti:3000 | xargs kill -9
   ```

2. **MongoDB connection issues**
   - Ensure MongoDB service is running
   - Check the connection string in `.env`
   - Verify database permissions

3. **Permission errors**
   ```bash
   # Fix npm permissions (macOS/Linux)
   sudo chown -R $(whoami) ~/.npm
   ```

4. **Module not found errors**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### Getting Help

- 📖 Check the [Contributing Guidelines](../CONTRIBUTING.md)
- 🐛 [Create an issue](https://github.com/GreenHacker420/Event_Managment/issues/new)
- 💬 [Start a discussion](https://github.com/GreenHacker420/Event_Managment/discussions)

## 🎯 Next Steps

Once you have the project running:

1. 📚 Read the [Contributing Guidelines](../CONTRIBUTING.md)
2. 🔍 Browse [open issues](https://github.com/GreenHacker420/Event_Managment/issues)
3. 🎃 Look for [Hacktoberfest issues](https://github.com/GreenHacker420/Event_Managment/labels/hacktoberfest)
4. 🚀 Start contributing!

## 📞 Support

If you encounter any issues during setup:

1. Check this troubleshooting section
2. Search existing issues
3. Create a new issue with:
   - Your operating system
   - Node.js version (`node --version`)
   - npm version (`npm --version`)
   - Error messages
   - Steps you've already tried

Happy coding! 🎉
