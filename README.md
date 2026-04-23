# Booking App

A modern, full-featured room booking application built with React and Firebase. Users can browse and book rooms, while administrators can manage inventory and view bookings.

## Features

### User Features
- **Browse Rooms** - View available rooms on the home page
- **Room Bookings** - Easy-to-use booking interface for reserving rooms
- **User Authentication** - Sign up and log in with email/password or Google
- **Booking History** - View your past and upcoming bookings
- **Responsive Design** - Works seamlessly on desktop and mobile devices

### Admin Features
- **Room Management** - Add, update, and delete rooms
- **Booking Overview** - Monitor all bookings and user activity
- **User Management** - View and manage registered users
- **Analytics Dashboard** - Track booking statistics and trends

## Tech Stack

**Frontend:**
- React 19
- React Router 7 - Client-side routing
- Vite - Fast build tool and dev server

**Backend & Database:**
- Firebase Authentication - User authentication with email/password and Google OAuth
- Cloud Firestore - NoSQL database for real-time data

**Development Tools:**
- ESLint - Code quality and style checking
- Node.js & npm - Package management

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Firestore and Authentication enabled

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd booking-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase configuration:
   - Create a `.env.local` file in the root directory
   - Add your Firebase credentials:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (Vite default port).

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── components/
│   ├── header/           # Navigation header
│   ├── footer/           # Footer component
│   ├── about/            # About page
│   ├── login/            # Login page
│   ├── signup/           # Sign up page
│   ├── bookings/         # Booking management page
│   ├── admin/            # Admin dashboard
│   │   ├── Admin.jsx     # Admin main page
│   │   ├── Addroom.jsx   # Add room form
│   │   ├── UpdateRoom.jsx# Update room form
│   │   ├── Users.jsx     # User management
│   │   ├── overview.jsx  # Booking overview
│   │   └── bookingSect.jsx
│   ├── Home.jsx          # Home page
│   └── HeaderTest.jsx
├── config/
│   └── firebase.js       # Firebase configuration
├── App.jsx               # Main app component
└── main.jsx              # React entry point
```

## Deployment

The app is configured for deployment on Vercel. See `vercel.json` for deployment configuration.

To deploy:
```bash
npm run build
```

Then push to your Vercel-connected repository, or use the Vercel CLI.

## Authentication

Users can authenticate via:
- **Email/Password** - Traditional sign-up and login
- **Google OAuth** - Sign in with Google account

## Contributing

Contributions are welcome! Please follow the existing code style and lint rules.

```bash
npm run lint
```

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository.
