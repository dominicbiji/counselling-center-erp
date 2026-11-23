# Counselling Center ERP

A full-stack **Counselling Center Management System** built using the MERN stack. This application is designed to simplify and streamline counselling center operations through role-based access, client and counsellor management, appointment scheduling, billing, payments, and notifications.

## Overview

The Counselling Center ERP provides a centralized platform for managing day-to-day counselling center activities. It includes dedicated dashboards for **Administrators, Receptionists, Counsellors, and Clients**, with role-based access to their respective functionalities.

The system helps streamline administrative operations, appointment handling, client management, and payment tracking through a unified web application.

## Features

### Authentication & Authorization

- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Role-based access control
- Forgot password functionality
- Email-based password reset with secure, time-limited tokens

### Admin Dashboard

- Manage clients and counsellors
- View and manage appointments
- Monitor billing and payment information
- Access dashboard statistics

### Receptionist Dashboard

- Manage client appointment bookings
- Schedule appointments with counsellors
- View and manage appointment information
- Handle appointment-related administrative tasks
- Support the front-desk booking workflow

### Counsellor Dashboard

- View assigned clients
- Access appointment information
- Manage appointment statuses
- View notifications

### Client Dashboard

- Access personal profile information
- View appointment details
- View relevant notifications

### Client Management

- Create, view, update, and manage client records
- Associate clients with counsellors
- Maintain client information

### Counsellor Management

- Add and manage counsellor profiles
- Store qualifications and specializations
- Manage counsellor information and status

### Appointment Management

- Schedule appointments
- Assign clients and counsellors
- Update appointment statuses
- Manage appointment information

### Billing & Payments

- Generate bills associated with appointments
- Track total fees, paid amounts, and outstanding balances
- Support payment status tracking
- Razorpay integration using test credentials

### Notifications

- Display notifications to users
- Mark notifications as read

## Technology Stack

| Category          | Technologies                                   |
| ----------------- | ---------------------------------------------- |
| Frontend          | React.js, JavaScript, Tailwind CSS             |
| Backend           | Node.js, Express.js                            |
| Database          | MongoDB, Mongoose                              |
| Authentication    | JWT, bcrypt                                    |
| API Communication | Axios, REST APIs                               |
| Email             | Nodemailer, Gmail SMTP                         |
| Payments          | Razorpay (test integration)                    |
| Development Tools | VS Code, Postman / Thunder Client, Git, GitHub |

## Project Structure

```text
counselling-center-erp/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
    ├── erp/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── assets/
│       └── App.jsx
│
└── README.md
```

*Note: This is an overview of the project structure. Update it to reflect the actual folders and files in your repository.*

## Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/dominicbiji/counselling-center-erp.git
```

```bash
cd counselling-center-erp
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory and configure the required environment variables.

Example:

```env
PORT=5050
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password

CLIENT_URL=http://localhost:5173
```

Add any additional environment variables required by your backend configuration and payment integration.

Start the backend using the development script configured in your `package.json`.

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will display the local frontend URL in your terminal.

### 4. Access the Application

Open the frontend URL shown in your terminal, usually:

`http://localhost:5173`

Make sure the backend and MongoDB are running.

## Security

- Passwords are hashed before being stored.
- Protected routes use JWT authentication.
- Role-based middleware restricts access to authorized users.
- Password reset tokens are securely generated and stored as hashes.
- Environment variables are used for sensitive configuration.

**Never commit your `.env` file, API secrets, passwords, or real user data to GitHub.**

## Future Improvements

- Complete end-to-end payment workflow testing
- Enhanced reporting and analytics
- Improved input validation and API security
- Deployment and production optimization
- Additional automated testing

## Author

**Dominic Biji**

Full Stack Developer | MERN Stack

- GitHub: [@dominicbiji](https://github.com/dominicbiji)

---

This project was developed as a practical full-stack application to gain hands-on experience in building REST APIs, designing database models, implementing authentication, managing application state, and developing role-based web applications.
