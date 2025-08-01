# TheOnlyPhysics - Interactive Physics Learning Platform

A comprehensive physics learning platform featuring interactive simulations, formula database, and professional learning tools.

## Features

### 🎯 Core Features
- **344+ Physics Formulas** - Comprehensive database with detailed explanations
- **Interactive Physics Simulator** - Real-time physics simulations
- **Smart Calculator** - Step-by-step problem solving
- **Professional UI/UX** - Modern, formal design with excellent user experience
- **Admin Dashboard** - Complete system management interface

### 🔬 Physics Simulator
The simulator includes three main simulation types:
- **Projectile Motion** - Adjust initial velocity, angle, gravity, and height
- **Simple Pendulum** - Control length, initial angle, gravity, and damping
- **Spring-Mass System** - Modify mass, spring constant, damping, and displacement

### 📊 Admin Features
- **User Management** - View and manage user accounts
- **System Monitoring** - Real-time system health and metrics
- **Content Management** - Add and edit physics formulas
- **Analytics Dashboard** - Comprehensive usage statistics

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd the-only-physics

# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at `http://localhost:4200`

## Admin Access

### Admin Credentials
- **Email**: admin@theonlyphysics.com
- **Password**: admin123

### Admin Features
1. **Dashboard Access** - Click "Dashboard" button in header when logged in as admin
2. **User Management** - View recent users and manage accounts
3. **System Monitoring** - Monitor CPU, memory, disk usage, and network traffic
4. **Content Management** - Add new physics formulas and simulations

## Technology Stack

- **Frontend**: Angular 17
- **UI Framework**: PrimeNG 16
- **Styling**: Custom CSS with professional design system
- **Icons**: PrimeIcons
- **Charts**: PrimeNG Charts (for admin dashboard)

## Project Structure

```
src/
├── app/
│   ├── admin/                 # Admin dashboard components
│   ├── auth/                  # Authentication components
│   ├── components/            # Reusable UI components
│   │   ├── calculator/        # Physics calculator
│   │   ├── physics-simulator/ # Interactive simulator
│   │   └── sidebar/           # Navigation sidebar
│   ├── data/                  # Physics formulas data
│   ├── features/              # Feature components
│   ├── formula-page/          # Formula display pages
│   └── home/                  # Landing page
├── styles.css                 # Global styles
└── main.ts                    # Application entry point
```

## Physics Content

The platform includes formulas from major physics domains:
- **Mechanics** - Kinematics, Dynamics, Energy, Momentum
- **Thermodynamics** - Gas Laws, Heat Transfer, Entropy
- **Electromagnetism** - Electric Fields, Magnetic Fields, Circuits
- **Waves and Optics** - Wave Properties, Sound, Light
- **Modern Physics** - Relativity, Quantum Physics, Nuclear Physics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.

---

**TheOnlyPhysics** - Making physics accessible and engaging for everyone.
