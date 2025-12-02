# Event Management System

[![GitHub issues](https://img.shields.io/github/issues/GreenHacker420/Event_Managment)](https://github.com/GreenHacker420/Event_Managment/issues)
[![GitHub forks](https://img.shields.io/github/forks/GreenHacker420/Event_Managment)](https://github.com/GreenHacker420/Event_Managment/network)
[![GitHub stars](https://img.shields.io/github/stars/GreenHacker420/Event_Managment)](https://github.com/GreenHacker420/Event_Managment/stargazers)
[![GitHub license](https://img.shields.io/github/license/GreenHacker420/Event_Managment)](https://github.com/GreenHacker420/Event_Managment/blob/main/LICENSE)

A comprehensive, modern event management system built to help organize, manage, and track events efficiently. This collaborative platform enables event organizers to coordinate teams, manage tasks, track budgets, and communicate effectively throughout the event lifecycle.

**🎯 Key Highlights:**
- **Frontend**: Vite + React 19 + Tailwind CSS
- **Backend**: Hono (Node.js)
- **Database**: MySQL with Drizzle ORM
- **Authentication**: Auth.js (Google & GitHub Providers)
- **Architecture**: Modular MVC with REST API
- **State Management**: TanStack Query & Zustand

## 📑 Project Documentation

- **[Ideation Document](idea/event_manager_prd.md)** - Complete product requirements and problem statement
- **[API Documentation](server/src/routes)** - Route definitions
- **[Setup Guide](#-installation)** - Setup instructions

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Current Features (Implemented)
- ✅ **User Authentication**: Secure login via Google & GitHub (Auth.js)
- ✅ **Event Management**: Create, read, update, delete events
- ✅ **Channel Management**: Organize teams (Logistics, Marketing, etc.)
- ✅ **Task Management**: Track tasks with priority, status, and due dates
- ✅ **Budget & Expenses**: Manage event budget and track expenses
- ✅ **Modern UI**: Responsive design with Tailwind CSS and Framer Motion

### Planned Features
- 💬 **Real-time Chat**: Channel-based messaging
- 📄 **Document Management**: File upload and sharing
- 📊 **Analytics Dashboard**: Visual insights
- 🗓️ **Calendar Integration**: Sync with external calendars

## 🛠️ Tech Stack

### Frontend
- **Build Tool**: Vite
- **Framework**: React 19
- **Styling**: Tailwind CSS v4
- **State**: Zustand, TanStack Query
- **UI Components**: Radix UI, Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Hono
- **Database**: MySQL
- **ORM**: Drizzle ORM
- **Authentication**: Auth.js (@hono/auth-js)

### DevOps & Tools
- **Version Control**: Git & GitHub
- **Package Manager**: npm
- **Database Migrations**: Drizzle Kit

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- MySQL Database

### 1. Clone the Repository
```bash
git clone https://github.com/GreenHacker420/Event_Managment.git
cd Event_Managment
```

### 2. Install Dependencies

**Server:**
```bash
cd server
npm install
```

**Client:**
```bash
cd ../client
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `server` directory:
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
DATABASE_URL=mysql://user:password@localhost:3306/event_db
AUTH_SECRET=your_secret_key
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
```

### 4. Database Setup

Push the schema to your MySQL database:
```bash
cd server
npx drizzle-kit push
```

### 5. Start Development Servers

**Backend:**
```bash
cd server
npm run dev
```
Server runs on `http://localhost:3000`.

**Frontend:**
```bash
cd client
npm run dev
```
Client runs on `http://localhost:5173`.

## 📚 API Documentation

### Base URL
`http://localhost:3000/api`

### Endpoints

#### Events
- `GET /events` - List all events
- `GET /events/:id` - Get event details
- `POST /events` - Create event (Protected)
- `PUT /events/:id` - Update event (Protected)
- `DELETE /events/:id` - Delete event (Protected)

#### Channels
- `GET /events/:eventId/channels` - List channels
- `POST /events/:eventId/channels` - Create channel

#### Tasks
- `GET /events/:eventId/tasks` - List tasks
- `POST /events/:eventId/tasks` - Create task
- `PUT /events/tasks/:id` - Update task

#### Expenses
- `GET /events/:eventId/expenses` - List expenses
- `POST /events/:eventId/expenses` - Create expense

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) first.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
