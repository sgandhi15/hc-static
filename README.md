# Healthcare Management System

## Overview

A modern, secure, and user-friendly healthcare management system built with React and Redux. This web application facilitates efficient communication and data management between healthcare providers, patients, and administrators.

## Key Features

### Multi-User Role System

- **Admin Dashboard**: Complete system oversight and user management
- **Doctor Portal**: Patient management and medical record updates
- **Patient Portal**: Personal health information and appointment management

### Security & Authentication

- JWT-based authentication system
- Secure password management with regex validation
- Protected routes based on user roles
- Password recovery and reset functionality

### Core Functionalities

- User registration and profile management
- Medical record management
- Patient list management for doctors
- Interactive chatbot for user assistance
- Real-time data updates and synchronization
- Responsive design for all devices

## Technology Stack

### Frontend

- React 17.x
- Redux for state management
- React Router for navigation
- Axios for API communication
- React Modal for modal dialogs
- React Simple Chatbot for interactive assistance

### Development & Testing

- Jest and React Testing Library
- ESLint for code quality
- Web Vitals for performance monitoring

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone [repository-url]
cd healthcare-management-system
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/         # React components
│   ├── admin/         # Admin-specific components
│   ├── doctor/        # Doctor-specific components
│   ├── patient/       # Patient-specific components
│   └── home/          # Shared components
├── redux/             # Redux state management
│   ├── actions/       # Redux actions
│   └── reducers/      # Redux reducers
├── routes/            # Route configurations
└── utils/             # Utility functions
```

## Features in Detail

### Admin Features

- User verification and management
- System-wide analytics
- Doctor and patient list management

### Doctor Features

- Patient medical record access
- Treatment history management
- Patient verification
- Profile management

### Patient Features

- Medical history view
- Doctor consultation records
- Profile management
- Password management

## Security Measures

- Input validation using regex patterns
- Protected routes with role-based access
- Secure password policies
- JWT token-based authentication
