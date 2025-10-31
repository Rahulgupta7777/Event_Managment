# Event Management System

[![GitHub issues](https://img.shields.io/github/issues/GreenHacker420/Event_Managment)](https://github.com/GreenHacker420/Event_Managment/issues)
[![GitHub forks](https://img.shields.io/github/forks/GreenHacker420/Event_Managment)](https://github.com/GreenHacker420/Event_Managment/network)
[![GitHub stars](https://img.shields.io/github/stars/GreenHacker420/Event_Managment)](https://github.com/GreenHacker420/Event_Managment/stargazers)
[![GitHub license](https://img.shields.io/github/license/GreenHacker420/Event_Managment)](https://github.com/GreenHacker420/Event_Managment/blob/main/LICENSE)

A comprehensive, modern event management system built to help organize, manage, and track events efficiently. This collaborative platform enables event organizers to coordinate teams, manage tasks, track budgets, and communicate effectively throughout the event lifecycle.

**🎯 Key Highlights:**
- Full-stack application with Next.js 16 (React 19) and Fastify
- Comprehensive database schema supporting complex event workflows
- JWT-based authentication with role-based access control
- Production-ready security with Helmet, CORS, and rate limiting
- Email notifications with customizable templates
- Monorepo structure for scalable development

## 📑 Project Documentation

- **[Ideation Document](idea/event_manager_prd.md)** - Complete product requirements and problem statement
- **[ER Diagram](er/er_diagram.svg )** - Database schema and entity relationships
- **[API Documentation](docs/API.md)** - API endpoints and usage
- **[Setup Guide](docs/SETUP.md)** - Detailed setup instructions

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [Project Status](#-project-status)
- [License](#-license)
- [Support](#-support)

## ✨ Features

### Current Features (Implemented)
- ✅ **User Authentication**: JWT-based authentication with registration and login
- ✅ **Event CRUD Operations**: Create, read, update, and delete events
- ✅ **Role-Based Access Control**: Admin, Organizer, and Member roles
- ✅ **Database Schema**: Complete Prisma schema with all entities
  - Users, Events, Channels, Subgroups, Tasks, Messages, Budget, Expenses, Documents
- ✅ **Email Service**: Welcome emails with EJS templates
- ✅ **Security**: Helmet, CORS, rate limiting, and cookie support
- ✅ **API Protection**: JWT authentication for protected routes
- ✅ **Next.js Frontend**: Modern React 19 with Tailwind CSS setup

### Planned Features (Great for Contributors!)
- 🎨 **Frontend UI Development**: Build event listing, detail pages, and dashboards
- 📋 **Channel Management**: Implement channel and subgroup CRUD operations
- ✅ **Task Management**: Build Kanban board and task assignment features
- 💬 **Real-time Chat**: Implement channel-based messaging with Socket.io
- 💰 **Budget Tracking**: Create budget management and expense approval UI
- 📄 **Document Management**: File upload, storage, and sharing features
- 🔔 **Notification System**: Real-time and email notifications
- 📊 **Analytics Dashboard**: Event statistics and progress tracking
- 🗓️ **Calendar Integration**: Sync with Google Calendar, Outlook
- 🎥 **Video Conferencing**: Integrate WebRTC or third-party video APIs
- 📍 **Location Services**: Map integration for event venues
- 🏷️ **Tagging & Search**: Advanced filtering and categorization

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.0.1 (React 19.2.0)
- **Styling**: Tailwind CSS v4
- **Build Tool**: Next.js built-in compiler with React Compiler

### Backend
- **Runtime**: Node.js
- **Framework**: Fastify 5.6.1
- **Database**: MySQL with Prisma ORM 6.18.0
- **Authentication**: JWT (@fastify/jwt)
- **Security**: Helmet, CORS, Rate Limiting, Cookie support
- **Email**: Nodemailer with EJS templates

### DevOps & Tools
- **Version Control**: Git & GitHub
- **Development**: Nodemon for hot reload
- **Code Quality**: ESLint
- **Database Migrations**: Prisma CLI

### Key Dependencies

**Backend:**
- `fastify` (5.6.1) - Fast and low overhead web framework
- `@prisma/client` (6.18.0) - Type-safe database client
- `@fastify/jwt` (10.0.0) - JWT authentication
- `@fastify/helmet` (13.0.2) - Security headers
- `@fastify/cors` (11.1.0) - CORS support
- `@fastify/rate-limit` (10.3.0) - Rate limiting
- `bcrypt` (6.0.0) - Password hashing
- `nodemailer` (7.0.10) - Email sending
- `ejs` (3.1.10) - Email templating

**Frontend:**
- `next` (16.0.1) - React framework
- `react` (19.2.0) - UI library
- `tailwindcss` (4.x) - Utility-first CSS
- `babel-plugin-react-compiler` (1.0.0) - React optimization

## 🚀 Quick Start Guide

### Step-by-Step Setup Instructions

#### 1. Clone the Repository
```bash
git clone https://github.com/GreenHacker420/Event_Managment.git
cd Event_Managment
```

#### 2. Install Dependencies

The project has a monorepo structure with separate client and server directories.

**Install Server Dependencies:**
```bash
cd server
npm install
```

**Install Client Dependencies:**
```bash
cd ../client
npm install
```

#### 3. Environment Configuration

Create a `.env` file in the `server` directory:
```bash
cd server
cp .env.example .env
```

Then edit `server/.env` with your configuration:
```env
# Database Configuration (MySQL)
DATABASE_URL=mysql://user:password@localhost:3306/event_db

# JWT Secret (change this to a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this

# Cookie Secret
COOKIE_SECRET=your_cookie_secret_change_this

# Server Port
PORT=3300

# Email Configuration (for Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourdomain.com
```

#### 4. Setup MySQL Database

Ensure you have MySQL installed and running:

```bash
# On macOS (with Homebrew)
brew services start mysql

# On Windows
# MySQL should start automatically as a service

# On Linux
sudo systemctl start mysql
```

Create the database:
```bash
mysql -u root -p
CREATE DATABASE event_db;
EXIT;
```

#### 5. Run Database Migrations

Generate Prisma Client and run migrations:
```bash
cd server
npx prisma generate
npx prisma db push
```

#### 6. Start the Development Servers

**Start Backend Server:**
```bash
cd server
npm run dev
```
The server will start on `http://localhost:3300` (or the PORT specified in your `.env` file).

**Start Frontend (in a new terminal):**
```bash
cd client
npm run dev
```
The client will start on `http://localhost:3000`.

#### 7. Verify Installation

Open your browser and navigate to:
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:3300`

### Testing the API

You can test the API using curl or Postman:

```bash
# Test root endpoint
curl http://localhost:3300/

# Register a new user
curl -X POST http://localhost:3300/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User","role":"ORGANIZER"}'

# Login
curl -X POST http://localhost:3300/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get all events
curl http://localhost:3300/api/events
```

### Troubleshooting

**Issue: MySQL connection error**
- Ensure MySQL is running: `mysql -u root -p` (should connect without errors)
- Check your `DATABASE_URL` in `server/.env` file
- Verify the database exists: `SHOW DATABASES;`

**Issue: Port already in use**
- Change the `PORT` in your `server/.env` file to another port (e.g., 3301)
- For the client, Next.js uses port 3000 by default

**Issue: Prisma Client errors**
- Run `npx prisma generate` in the server directory
- Run `npx prisma db push` to sync your schema

**Issue: Module not found errors**
- Delete `node_modules` folder and `package-lock.json` in both client and server
- Run `npm install` again in both directories

### Docker Setup (Coming Soon)

Docker support is planned for easier deployment and development setup.

## 📖 Usage

### For Event Organizers
1. **Create Account**: Sign up as an event organizer
2. **Create Event**: Fill in event details, date, location, and capacity
3. **Manage Registrations**: View and manage attendee registrations
4. **Send Updates**: Notify attendees about event changes
5. **Analytics**: View event performance and attendee data

### For Attendees
1. **Browse Events**: Search and filter events by category, date, location
2. **Register**: Sign up for events that interest you
3. **Manage Registrations**: View your registered events and tickets
4. **Receive Updates**: Get notifications about event changes
5. **Provide Feedback**: Rate and review events after attendance

## 📚 API Documentation

### Base URL
- **Backend API**: `http://localhost:3300`

### Authentication Endpoints
```
POST   /auth/register      - Register a new user
POST   /auth/login         - User login
GET    /auth/me            - Get current user profile (protected)
```

**Register Example:**
```json
POST /auth/register
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe",
  "role": "ORGANIZER" // Optional: ADMIN, ORGANIZER, MEMBER
}
```

**Login Example:**
```json
POST /auth/login
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Event Endpoints
```
GET    /api/events         - Get all events (public)
GET    /api/events/:id     - Get specific event with details
POST   /api/events         - Create new event (protected)
PUT    /api/events/:id     - Update event (protected - organizer only)
DELETE /api/events/:id     - Delete event (protected - organizer only)
GET    /api/my-events      - Get current user's events (protected)
```

**Create Event Example:**
```json
POST /api/events
Headers: { "Authorization": "Bearer <token>" }
{
  "name": "Tech Conference 2025",
  "type": "Conference",
  "eventDate": "2025-12-15T10:00:00Z",
  "venue": "Convention Center",
  "status": "SCHEDULED" // Optional: DRAFT, SCHEDULED, CANCELLED, COMPLETED
}
```

### Database Schema

The system uses Prisma ORM with MySQL and includes the following models:
- **User**: User accounts with roles (ADMIN, ORGANIZER, MEMBER)
- **Event**: Event details and metadata
- **EventMember**: Event team members
- **Channel**: Event channels (e.g., Decoration, Logistics)
- **Subgroup**: Channel subgroups
- **SubgroupMember**: Subgroup team members
- **Task**: Task management with status and priority
- **Message**: Channel messaging
- **Budget**: Event budget tracking
- **Expense**: Expense records with approval workflow
- **Document**: File uploads and document management

[**Full API Documentation**](docs/API.md) (Coming Soon)

## 🤝 Contributing

We welcome contributions! This project is perfect for:
- 🎓 **Students learning web development**
- 👨‍💻 **Developers**
- 🎨 **UI/UX designers**
- 📝 **Technical writers**

### How to Contribute
1. Read our [Contributing Guidelines](CONTRIBUTING.md)
2. Check our [Code of Conduct](CODE_OF_CONDUCT.md)
3. Look for open issues or suggest new features
4. Fork the repository and create your feature branch
5. Make your changes and add tests
6. Submit a pull request

### Areas Where We Need Help
- 🐛 **Bug Fixes**: Help us squash bugs
- ✨ **New Features**: Implement features from our roadmap
- 📚 **Documentation**: Improve docs and add examples
- 🧪 **Testing**: Add unit and integration tests
- 🎨 **UI/UX**: Improve the user interface and experience
- 🔧 **Performance**: Optimize code and database queries
- 🌐 **Accessibility**: Make the app more accessible
- 🔒 **Security**: Enhance security measures

## 🗺️ Roadmap

### Phase 1: Foundation ✅ (Completed)
- [x] Project setup and monorepo structure
- [x] Prisma schema design with all entities
- [x] User authentication (JWT) with registration/login
- [x] Event CRUD API endpoints
- [x] Email service with templates
- [x] Security middleware (Helmet, CORS, Rate Limiting)
- [x] Next.js frontend setup with Tailwind CSS

### Phase 2: Core Features (In Progress)
- [ ] Frontend UI for authentication pages
- [ ] Event listing and detail pages
- [ ] Channel and subgroup management APIs
- [ ] Task management APIs (CRUD operations)
- [ ] Budget and expense tracking APIs
- [ ] Document upload and management
- [ ] User dashboard and event workspace

### Phase 3: Collaboration Features
- [ ] Real-time chat with Socket.io
- [ ] Message history and search
- [ ] Task assignment and status updates
- [ ] Expense approval workflow
- [ ] Team member invitations
- [ ] Role-based permissions UI
- [ ] Notification system (in-app and email)

### Phase 4: Advanced Features
- [ ] Analytics dashboard with charts
- [ ] Calendar integration (Google, Outlook)
- [ ] Video conferencing integration
- [ ] Advanced search and filtering
- [ ] Event templates library
- [ ] Mobile responsive optimization
- [ ] Performance optimization and caching

### Phase 5: Scale & Polish
- [ ] Comprehensive testing suite
- [ ] API documentation with Swagger
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Production deployment
- [ ] Multi-language support
- [ ] Advanced security audits

## 📊 Project Status

**Current Phase**: ✅ Phase 1 Complete → 🚧 Phase 2 In Progress  
**Next Milestone**: Frontend UI Development & Core APIs

### Recent Accomplishments
- ✅ Complete backend architecture with Fastify
- ✅ Prisma ORM integration with MySQL
- ✅ JWT authentication system
- ✅ Event management APIs
- ✅ Email service setup
- ✅ Next.js 16 frontend initialized

### Active Development
- 🔨 Frontend UI components
- 🔨 Channel and task management APIs
- 🔨 Budget tracking features

### Project Structure
```
Event_Managment/
├── client/              # Next.js 16 frontend
│   ├── src/app/        # App router pages
│   └── public/         # Static assets
├── server/             # Fastify backend
│   ├── db/            # Database connection
│   ├── emailTemplate/ # Email templates (EJS)
│   ├── prisma/        # Prisma schema
│   └── routes/        # API routes
│       ├── auth/      # Authentication
│       └── events/    # Event management
└── idea/              # Product documentation
```

## 🏆 Contributors

Thanks to all our amazing contributors! 🎉

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

Want to be featured here? [Contribute to the project!](CONTRIBUTING.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- 📖 **Documentation**: Check our [docs](docs/) folder
- 🐛 **Bug Reports**: [Create an issue](https://github.com/GreenHacker420/Event_Managment/issues/new)
- 💡 **Feature Requests**: [Request a feature](https://github.com/GreenHacker420/Event_Managment/issues/new)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/GreenHacker420/Event_Managment/discussions)

### Contact
- **Maintainer**: [@GreenHacker420](https://github.com/GreenHacker420)
- **Email**: [harsh@greenhacker.tech](mailto:harsh@greenhacker.tech)

- **Maintainer**: [@curiouscoder_cmd](https://github.com/curiouscoder_cmd)
- **Email**: [nitya@curiouscoder.live](mailto:nitya@curiouscoder.live)

- **Maintainer**: [@Rahulgupta7777](https://github.com/Rahulgupta7777)
- **Email**: [rahulgupta193246@gmail.com](mailto:rahulgupta193246@gmail.com)

## 🙏 Acknowledgments

- Thanks to all contributors who help make this project better
- Inspired by modern event management solutions
- Built with ❤️ for the open source community

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

**🍴 Fork it to start contributing!**

</div>
