# 🦷 ENTNT Dental Dashboard

A modern, role-based React frontend application for dental practice management. Built with React, TailwindCSS, and Lucide React icons for a professional healthcare interface.

## 🚀 Live Demo

[GitHub Link] - https://github.com/ashugh12/entnt_assignment
[Deployed Repository] - https://dentalclinic97.netlify.app/

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
- **Role-based access control** (Admin/Dentist & Patient)
- **Session persistence** with localStorage
- **Cross-tab synchronization** for consistent login state
- **Secure routing** with protected routes
- **Demo login buttons** for quick testing

### 👨‍⚕️ Admin (Dentist) Features
- **Dashboard Overview** with KPIs and statistics
- **Patient Management** - Full CRUD operations
- **Appointment Management** - Schedule and track appointments
- **Calendar View** - Visual appointment scheduling
- **Revenue Tracking** - Financial overview
- **File Management** - Upload and manage patient documents

### 👤 Patient Features
- **Personal Dashboard** - Individual patient overview
- **Appointment History** - View past and upcoming appointments
- **Treatment Records** - Access to medical history
- **Cost Tracking** - View treatment costs
- **File Access** - Download personal documents

### 🎨 UI/UX Features
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Professional Medical Theme** - Clean, healthcare-appropriate design
- **Collapsible Sidebar** - Space-efficient navigation
- **Lucide React Icons** - Consistent, professional iconography
- **Color-coded Interface** - Intuitive medical color palette
- **Smooth Animations** - Enhanced user experience

## 🛠 Tech Stack

- **Frontend Framework**: React 19.1.0
- **Routing**: React Router DOM 7.6.3
- **Styling**: TailwindCSS 3.4.1
- **Icons**: Lucide React 0.525.0
- **Build Tool**: Vite 7.0.0
- **State Management**: React Context API
- **Data Persistence**: localStorage

## 📁 Project Structure

```
entnt-dental-dashboard/
├── src/
│   ├── components/
│   │   ├── Auth/           # Authentication components
│   │   └── Common/         # Reusable UI components
│   │       ├── AppointmentsList.jsx
│   │       ├── Layout.jsx
│   │       ├── NavigationButtons.jsx
│   │       ├── PatientDashboardSummary.jsx
│   │       ├── PatientsSummary.jsx
│   │       ├── Sidebar.jsx
│   │       ├── StatsCard.jsx
│   │       └── TopPatientsList.jsx
│   ├── context/
│   │   └── AuthContext.jsx # Authentication state management
│   ├── data/
│   │   └── mockData.js     # Sample data for development
│   ├── pages/
│   │   ├── Calendar.jsx    # Calendar view
│   │   ├── Dashboard.jsx   # Main dashboard
│   │   ├── Incidents.jsx   # Appointment management
│   │   ├── Login.jsx       # Authentication page
│   │   ├── LogOut.jsx      # Logout functionality
│   │   ├── MyProfile.jsx   # User profile management
│   │   ├── Patients.jsx    # Patient management
│   │   └── PatientView.jsx # Patient-specific view
│   ├── routes/
│   │   └── PrivateRoute.jsx # Route protection
│   └── utils/
│       └── localStorage.js # Data persistence utilities
├── public/
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
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

## 🎯 Usage Guide

### Quick Start

1. **Access the application** at `http://localhost:5173`
2. **Login as Admin** using the demo button for full access
3. **Login as Patient** using the demo button for limited access
4. **Navigate** using the collapsible sidebar

### Admin Features

#### Dashboard
- View appointment statistics
- Monitor patient activity
- Track revenue metrics
- Access quick navigation

#### Patient Management
- Add new patients with detailed information
- Edit patient records
- View patient history
- Manage patient files

#### Appointment Management
- Schedule new appointments
- Track appointment status
- Upload treatment documents
- Manage appointment costs

#### Calendar
- Visual appointment scheduling
- Date-based navigation
- Appointment overview

### Patient Features

#### Personal Dashboard
- View upcoming appointments
- Access treatment history
- Monitor costs
- Download personal documents

#### Profile Management
- Update personal information
- View account details
- Manage preferences

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Professional, trustworthy
- **Success**: Emerald (#10B981) - Growth, success
- **Warning**: Amber (#F59E0B) - Revenue, financial
- **Background**: Light Gray (#F9FAFB) - Clean, medical
- **Text**: Slate (#1E293B) - Readable, professional

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Consistent styling with hover effects
- **Forms**: Clean, accessible input fields
- **Navigation**: Collapsible sidebar with icons
- **Typography**: Professional font hierarchy

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=ENTNT Dental Dashboard
VITE_APP_VERSION=1.0.0
```

### TailwindCSS Configuration
The project uses a custom TailwindCSS configuration optimized for medical applications:

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom medical color palette
      }
    }
  },
  plugins: []
}
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Collapsible sidebar becomes hamburger menu
- Touch-friendly interface
- Optimized layouts for small screens

## 🔒 Security Features

- **Role-based access control**
- **Protected routes**
- **Session management**
- **Cross-tab synchronization**
- **Secure data handling**

## 🧪 Testing

### Manual Testing
1. **Authentication**: Test login/logout flows
2. **Role Access**: Verify admin vs patient permissions
3. **CRUD Operations**: Test create, read, update, delete
4. **Responsive Design**: Test on different screen sizes
5. **Cross-tab Sync**: Test session consistency

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🚀 Deployment

### Vercel
1. Connect your GitHub repository
2. Configure build settings
3. Deploy automatically

### Netlify
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0**: Initial release with core features
- Role-based authentication
- Patient and appointment management
- Responsive design
- Professional medical UI

---

**Built with ❤️ for the ENTNT Dental Practice**
