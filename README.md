# 🎉 Event Management System

[![GitHub issues](https://img.shields.io/github/issues/GreenHacker420/Event_Managment)](https://github.com/GreenHacker420/Event_Managment/issues)
[![GitHub forks](https://img.shields.io/github/forks/GreenHacker420/Event_Managment)](https://github.com/GreenHacker420/Event_Managment/network)
[![GitHub stars](https://img.shields.io/github/stars/GreenHacker420/Event_Managment)](https://github.com/GreenHacker420/Event_Managment/stargazers)
[![GitHub license](https://img.shields.io/github/license/GreenHacker420/Event_Managment)](https://github.com/GreenHacker420/Event_Managment/blob/main/LICENSE)

A comprehensive, modern event management system built to help organize, manage, and track events efficiently. Perfect for event planners, organizations, and communities looking to streamline their event management process.

> **📌 Group Project - 1st Evaluation Submission**  
> This repository contains our Event Management System developed as a group project. See [SUBMISSION_CHECKLIST.md](SUBMISSION_CHECKLIST.md) for evaluation requirements.

## 📑 Project Documentation

- **[Ideation Document](idea/event_manager_prd.md)** - Complete product requirements and problem statement
- **[ER Diagram](ER_DIAGRAM.md)** - Database schema and entity relationships
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

### Current Features
- 📅 **Event Creation & Management**: Create, edit, and delete events with detailed information
- 👥 **User Management**: User registration, authentication, and profile management
- 🎫 **Event Registration**: Allow users to register for events with capacity management
- 📧 **Notifications**: Email notifications for event updates and reminders
- 🔍 **Search & Filter**: Advanced search and filtering options for events
- 📱 **Responsive Design**: Mobile-friendly interface for all devices

### Planned Features (Great for Contributors!)
- 🗓️ **Calendar Integration**: Sync with Google Calendar, Outlook, etc.
- 💳 **Payment Integration**: Stripe/PayPal integration for paid events
- 📊 **Analytics Dashboard**: Event statistics and attendee analytics
- 🎨 **Custom Themes**: Customizable event pages and themes
- 🔔 **Real-time Notifications**: WebSocket-based real-time updates
- 📍 **Location Services**: Map integration and location-based features
- 🎥 **Virtual Events**: Support for online/hybrid events
- 📝 **Event Templates**: Pre-built templates for common event types
- 🏷️ **Tagging System**: Categorize events with tags and categories
- 📈 **Reporting**: Generate detailed reports and export data

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js / Vue.js / Angular (To be implemented)
- **Styling**: CSS3, Bootstrap / Tailwind CSS
- **State Management**: Redux / Vuex / NgRx
- **Build Tool**: Webpack / Vite

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js / Fastify
- **Database**: MongoDB / PostgreSQL
- **Authentication**: JWT / OAuth 2.0
- **File Storage**: AWS S3 / Cloudinary

### DevOps & Tools
- **Version Control**: Git & GitHub
- **CI/CD**: GitHub Actions
- **Testing**: Jest, Cypress
- **Documentation**: JSDoc
- **Code Quality**: ESLint, Prettier

## 🚀 Quick Start Guide

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** v20 or higher (v22 LTS recommended) - [Download here](https://nodejs.org/)
- **npm** v8 or higher (comes with Node.js) or **yarn**
- **MongoDB** (for database) - [Download here](https://www.mongodb.com/try/download/community) or use MongoDB Atlas (cloud)
- **Git** - [Download here](https://git-scm.com/)

### Step-by-Step Setup Instructions

#### 1. Clone the Repository
```bash
git clone https://github.com/GreenHacker420/Event_Managment.git
cd Event_Managment
```

#### 2. Install Dependencies
```bash
npm install
```
This will install all required packages listed in `package.json`.

#### 3. Environment Configuration
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Then edit `.env` with your configuration:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/event_management
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/event_management

# JWT Secret (change this to a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this

# Email Configuration (optional for now)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

#### 4. Start MongoDB
If using local MongoDB:
```bash
# On macOS (with Homebrew)
brew services start mongodb-community

# On Windows
# MongoDB should start automatically as a service

# On Linux
sudo systemctl start mongod
```

If using MongoDB Atlas, skip this step and use your Atlas connection string in `.env`.

#### 5. Start the Development Server
```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the PORT specified in your `.env` file).

#### 6. Verify Installation
Open your browser and navigate to:
```
http://localhost:3000
```

You should see the Event Management System welcome page with a health check status.

### Testing the API
You can test the API using curl or Postman:
```bash
# Health check
curl http://localhost:3000/health

# Expected response:
# {"status":"ok","timestamp":"2025-10-31T...","uptime":...}
```

### Troubleshooting

**Issue: MongoDB connection error**
- Ensure MongoDB is running: `mongosh` (should connect without errors)
- Check your `MONGODB_URI` in `.env` file
- For Atlas, ensure your IP is whitelisted

**Issue: Port already in use**
- Change the `PORT` in your `.env` file to another port (e.g., 3001)

**Issue: Module not found errors**
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

### Docker Setup (Alternative)

```bash
# Clone the repository
git clone https://github.com/GreenHacker420/Event_Managment.git
cd Event_Managment

# Run with Docker Compose
docker-compose up -d
```

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

### Authentication Endpoints
```
POST /api/auth/register    - User registration
POST /api/auth/login       - User login
POST /api/auth/logout      - User logout
GET  /api/auth/profile     - Get user profile
PUT  /api/auth/profile     - Update user profile
```

### Event Endpoints
```
GET    /api/events         - Get all events
GET    /api/events/:id     - Get specific event
POST   /api/events         - Create new event
PUT    /api/events/:id     - Update event
DELETE /api/events/:id     - Delete event
POST   /api/events/:id/register - Register for event
```

### User Management
```
GET    /api/users          - Get all users (admin)
GET    /api/users/:id      - Get specific user
PUT    /api/users/:id      - Update user
DELETE /api/users/:id      - Delete user
```

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

### Phase 1: Foundation (Current)
- [x] Project setup and basic structure
- [x] Contributing guidelines and documentation
- [ ] Basic event CRUD operations
- [ ] User authentication system
- [ ] Basic frontend interface

### Phase 2: Core Features
- [ ] Event registration system
- [ ] Email notifications
- [ ] Search and filtering
- [ ] User dashboard
- [ ] Admin panel

### Phase 3: Advanced Features
- [ ] Payment integration
- [ ] Calendar synchronization
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] API rate limiting and caching

### Phase 4: Scale & Polish
- [ ] Performance optimization
- [ ] Advanced security features
- [ ] Multi-language support
- [ ] Third-party integrations
- [ ] Enterprise features

## 📊 Project Status

For detailed information about the current development status, completed tasks, and upcoming milestones, see our [Project Status](PROJECT_STATUS.md) page.

**Current Phase**: 🚧 Foundation & Setup  
**Next Milestone**: Authentication & Database

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
