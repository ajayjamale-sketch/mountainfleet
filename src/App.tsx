import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './routes/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import AppErrorBoundary from './components/AppErrorBoundary';

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
const HelpCenter = lazy(() => import('./pages/dashboard/HelpCenter'));
const DocumentsPage = lazy(() => import('./pages/dashboard/DocumentsPage'));
const MessagesPage = lazy(() => import('./pages/dashboard/MessagesPage'));
const Notifications = lazy(() => import('./pages/Notifications'));

const AboutPage = lazy(() => import('./pages/AboutPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const FleetPage = lazy(() => import('./pages/FleetPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage'));
const SLAPage = lazy(() => import('./pages/SLAPage'));
const SustainabilityPage = lazy(() => import('./pages/SustainabilityPage'));
const FleetShowcase = lazy(() => import('./pages/FleetShowcase'));
const FleetMetrics = lazy(() => import('./pages/FleetMetrics'));
const TrialRequest = lazy(() => import('./pages/TrialRequest'));
const AddonDetails = lazy(() => import('./pages/AddonDetails'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const SecurityDocsPage = lazy(() => import('./pages/SecurityDocsPage'));
const NotFound = lazy(() => import('./pages/NotFound'));


const LoadingFallback = () => (
  <div className="h-screen w-full flex items-center justify-center bg-background text-foreground">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-2xl border-2 border-primary/20 border-t-primary animate-spin" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-semibold text-foreground">MountainFleet</p>
        <p className="text-xs text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <ScrollToTop />
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
                <Route path="fleet-showcase" element={<FleetShowcase />} />
                <Route path="fleet-metrics" element={<FleetMetrics />} />
                <Route path="trial" element={<TrialRequest />} />
                <Route path="addon/:id" element={<AddonDetails />} />
                <Route path="news/:id" element={<NewsDetail />} />
                <Route path="news" element={<NewsPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="cookies" element={<CookiePolicyPage />} />
                <Route path="sla" element={<SLAPage />} />
                <Route path="sustainability" element={<SustainabilityPage />} />
                <Route path="security-docs" element={<SecurityDocsPage />} />
              </Route>

              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              {/* Redirect /signup to /register */}
              <Route path="/signup" element={<Navigate to="/register" replace />} />

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
                  
                  {/* Shared Routes */}
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="help" element={<HelpCenter />} />
                  <Route path="documents" element={<DocumentsPage />} />
                  <Route path="messages" element={<MessagesPage />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AppErrorBoundary>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
