# ENTNT Dental Center Management Dashboard

A comprehensive frontend-only dental clinic management system built with React, featuring role-based access control, patient management, appointment tracking, and a modern responsive UI.

## 🚀 Live Demo

[Deployed Link] - https://github.com/ashugh12/entnt_assignment
[GitHub Repository] - [Add your repository link here]

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Architecture](#architecture)
- [Technical Decisions](#technical-decisions)
- [Features Breakdown](#features-breakdown)
- [API & Data Management](#api--data-management)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### 🔐 Authentication & Authorization
- **Role-based Access Control**: Admin (Dentist) and Patient roles
- **Session Persistence**: Uses localStorage for session management
- **Protected Routes**: Role-specific page access
- **Hardcoded Users**: Simulated authentication with predefined credentials

### 👨‍⚕️ Admin (Dentist) Features
- **Dashboard**: KPIs including revenue, appointments, patient statistics
- **Patient Management**: View, add, edit, delete patients
- **Appointment Management**: Create and manage dental appointments/incidents
- **Calendar View**: Monthly/weekly appointment scheduling
- **File Management**: Upload and manage treatment records
- **Analytics**: Revenue tracking, patient visit statistics

### 👤 Patient Features
- **Personal Dashboard**: View own appointments and treatment history
- **Appointment History**: Complete treatment records with costs
- **File Access**: View uploaded treatment documents
- **Limited Access**: Can only view own data

### 📱 Responsive Design
- **Mobile-First**: Fully responsive across all devices
- **Modern UI**: Clean, minimal design with TailwindCSS
- **Accessibility**: Proper contrast and navigation

## 🛠 Tech Stack

- **Frontend Framework**: React 18+ (Functional Components)
- **Routing**: React Router v6
- **State Management**: React Context API
- **Styling**: TailwindCSS
- **Build Tool**: Vite
- **Data Persistence**: localStorage
- **Icons**: SVG Icons (Custom)

## 📁 Project Structure

```
src/
├── assets/                 # Static assets
├── components/
│   ├── Auth/              # Authentication components
│   └── Common/            # Reusable UI components
├── context/
│   └── AuthContext.jsx    # Authentication context
├── data/
│   └── mockData.js        # Initial mock data
├── pages/
│   ├── Dashboard.jsx      # Main dashboard (role-based)
│   ├── Login.jsx          # Authentication page
│   ├── Patients.jsx       # Patient management
│   ├── Incidents.jsx      # Appointment management
│   ├── Calendar.jsx       # Calendar view
│   ├── MyProfile.jsx      # User profile
│   └── LogOut.jsx         # Logout component
├── routes/
│   └── PrivateRoute.jsx   # Route protection
├── utils/
│   └── localStorage.js    # Data persistence utilities
├── App.jsx                # Main app component
└── main.jsx              # App entry point
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd entnt-dental-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production
```bash
npm run build
```

## 🔑 Usage

### Login Credentials

**Admin (Dentist)**
- Email: `admin@entnt.in`
- Password: `admin123`

**Patient**
- Email: `john@entnt.in`
- Password: `patient123`

### Navigation
- **Dashboard**: Main landing page with role-specific content
- **Patients** (Admin only): Manage patient records
- **Incidents** (Admin only): Manage appointments/treatments
- **Calendar** (Admin only): View appointment schedule
- **Profile**: User profile information
- **Logout**: Sign out and return to login

## 🏗 Architecture

### State Management
- **Context API**: Centralized state management for authentication and user data
- **localStorage**: Persistent data storage for users, patients, and appointments
- **Component State**: Local state for UI interactions

### Data Flow
1. **Initialization**: App loads mock data into localStorage on first visit
2. **Authentication**: User login validates against stored credentials
3. **Role-based Routing**: Protected routes check user permissions
4. **Data Operations**: CRUD operations update localStorage and component state

### Component Architecture
- **Functional Components**: All components use React hooks
- **Custom Hooks**: Reusable logic (useAuth)
- **Context Providers**: Global state management
- **Route Guards**: Protected route components

## 💡 Technical Decisions

### Why React Context over Redux?
- **Simplicity**: Context API is built into React
- **Bundle Size**: No additional dependencies
- **Learning Curve**: Easier for team members to understand
- **Project Scope**: Sufficient for current requirements

### Why localStorage over External APIs?
- **Assignment Requirements**: Frontend-only solution required
- **Simplicity**: No backend setup needed
- **Performance**: Fast local data access
- **Offline Capability**: Works without internet connection

### Why TailwindCSS?
- **Utility-First**: Rapid UI development
- **Responsive**: Built-in responsive design utilities
- **Customization**: Easy theme customization
- **Performance**: Only includes used styles in production

### Why Vite?
- **Speed**: Fast development server and build times
- **Modern**: ES modules and modern tooling
- **React Support**: Excellent React integration
- **Hot Reload**: Instant feedback during development

## 📊 Features Breakdown

### Dashboard System
- **Role-based Content**: Different views for Admin and Patient
- **Real-time KPIs**: Revenue, appointments, patient statistics
- **Responsive Grid**: Adapts to different screen sizes
- **Data Visualization**: Clean presentation of complex data

### Patient Management
- **CRUD Operations**: Full patient lifecycle management
- **Health Information**: Medical history and allergy tracking
- **Contact Details**: Phone and personal information
- **Visit History**: Complete treatment records

### Appointment System
- **Scheduling**: Date and time management
- **Status Tracking**: Pending, completed, cancelled states
- **Cost Management**: Treatment pricing and billing
- **File Attachments**: Document and image uploads

### Security & Access Control
- **Route Protection**: Unauthorized access prevention
- **Role Validation**: Feature access based on user role
- **Session Management**: Persistent login state
- **Data Isolation**: Patients can only see their own data

## 🔧 API & Data Management

### Data Structure

**Users**
```javascript
{
  id: "1",
  role: "Admin" | "Patient",
  email: "user@entnt.in",
  password: "password123",
  patientId?: "p1" // Only for Patient role
}
```

**Patients**
```javascript
{
  id: "p1",
  name: "John Doe",
  dob: "1990-05-10",
  contact: "1234567890",
  healthInfo: "No allergies"
}
```

**Incidents (Appointments)**
```javascript
{
  id: "i1",
  patientId: "p1",
  title: "Toothache",
  description: "Upper molar pain",
  comments: "Sensitive to cold",
  appointmentDate: "2025-07-01T10:00:00",
  cost: 80,
  status: "Completed" | "Pending" | "Cancelled",
  files: [
    { name: "invoice.pdf", url: "base64string" }
  ]
}
```

### Data Persistence
- **localStorage Keys**: `users`, `patients`, `incidents`, `user`
- **Initialization**: Mock data loaded on first visit
- **CRUD Operations**: Direct localStorage manipulation
- **Error Handling**: Graceful fallbacks for missing data

## 🚀 Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push to main branch

### Netlify Deployment
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables if needed

### GitHub Pages
1. Add `homepage` field to package.json
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add deploy script: `"deploy": "gh-pages -d dist"`
4. Run: `npm run build && npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is created for ENTNT technical assignment. All rights reserved.

## 📞 Contact

For questions or support, contact: hr@entnt.in

---

**Note**: This is a frontend-only demonstration project. In a production environment, implement proper backend services, database management, and security measures.
