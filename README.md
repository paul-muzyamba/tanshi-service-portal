# Tanshi Service Portal

A full-stack web application built for Tanshi Digital Solutions, enabling clients to browse services and make bookings through a clean, responsive interface.

## Tech Stack

**Backend:** Python, Django, Django REST Framework, PostgreSQL, JWT Authentication  
**Frontend:** React, Vite, Axios, React Router  
**Infrastructure:** WSL2 Ubuntu, Git, GitHub  

## Features

- User registration and authentication using JWT tokens
- Service catalogue browsing
- Booking creation and management
- Role-based access — clients see their own bookings, admins see all
- RESTful API with full CRUD operations
- Secure password hashing and token-based session management

## Project Structure

tanshi-service-portal/
├── backend/
│   ├── core/          # Django project settings and URL routing
│   ├── users/         # Custom user model, registration, authentication
│   ├── services/      # Service listings and management
│   └── bookings/      # Booking creation and status tracking
└── frontend/
└── src/
├── api/       # Axios configuration and interceptors
├── context/   # Global authentication state
└── pages/     # Login, Register, Services, Bookings

## Getting Started

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
Create a `.env` file in the backend directory:
SECRET_KEY=your-secret-key
DEBUG=True
DB_NAME=tanshi_db
DB_USER=tanshi_user
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/users/register/ | Create new account | No |
| POST | /api/users/login/ | Login and receive tokens | No |
| GET | /api/users/profile/ | Get current user profile | Yes |
| GET | /api/services/ | List all available services | No |
| POST | /api/bookings/ | Create a booking | Yes |
| GET | /api/bookings/ | List user's bookings | Yes |

## Developer

**Paul Muzyamba**  
Bachelor of Engineering in Computer Science  
DMI-St. Eugene University, Zambia  
Industrial Placement — Tanshi Digital Solutions, 2025
