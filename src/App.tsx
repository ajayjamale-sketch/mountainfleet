import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages (Lazy Load)
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome'));
const UserManagement = lazy(() => import('./pages/dashboard/UserManagement'));
const FleetControl = lazy(() => import('./pages/dashboard/FleetControl'));
const DriverOps = lazy(() => import('./pages/dashboard/DriverOps'));
const TripManager = lazy(() => import('./pages/dashboard/TripManager'));
const MaintenancePage = lazy(() => import('./pages/dashboard/MaintenancePage'));
const ReportsPage = lazy(() => import('./pages/dashboard/ReportsPage'));
const FinancePage = lazy(() => import('./pages/dashboard/FinancePage'));
const MyTrips = lazy(() => import('./pages/dashboard/MyTrips'));
const SubmitExpense = lazy(() => import('./pages/dashboard/SubmitExpense'));
const BookVehicle = lazy(() => import('./pages/dashboard/BookVehicle'));
const MyBookings = lazy(() => import('./pages/dashboard/MyBookings'));
const TrackTrip = lazy(() => import('./pages/dashboard/TrackTrip'));
const SettingsPage = lazy(() => import('./pages/dashboard/SettingsPage'));

const AboutPage = lazy(() => import('./pages/AboutPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const FleetPage = lazy(() => import('./pages/FleetPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));

const LoadingFallback = () => (
  <div className="h-screen w-full flex items-center justify-center bg-background text-foreground">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-primary font-bold tracking-widest animate-pulse uppercase">MountainFleet</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="pricing" element={<PricingPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="careers" element={<CareersPage />} />
                <Route path="fleet" element={<FleetPage />} />
                <Route path="news" element={<NewsPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="terms" element={<TermsPage />} />
              </Route>

              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Dashboard Routes */}
              <Route path="/dashboard" element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route index element={<DashboardHome />} />
                  
                  {/* Admin Only */}
                  <Route path="users" element={<UserManagement />} />
                  <Route path="finance" element={<FinancePage />} />
                  
                  {/* Admin & Manager */}
                  <Route path="fleet" element={<FleetControl />} />
                  <Route path="drivers" element={<DriverOps />} />
                  <Route path="trips" element={<TripManager />} />
                  <Route path="maintenance" element={<MaintenancePage />} />
                  <Route path="reports" element={<ReportsPage />} />
                  
                  {/* Driver Only */}
                  <Route path="my-trips" element={<MyTrips />} />
                  <Route path="submit-expense" element={<SubmitExpense />} />
                  
                  {/* Customer Only */}
                  <Route path="book" element={<BookVehicle />} />
                  <Route path="my-bookings" element={<MyBookings />} />
                  <Route path="track" element={<TrackTrip />} />
                  
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="help" element={<div className="text-foreground">Support Center Coming Soon</div>} />
                </Route>
              </Route>

              {/* 404 Redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
