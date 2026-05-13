import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from '../components/ScrollToTop';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster position="top-center" toastOptions={{
        className: 'dark:bg-slate-900 dark:text-white dark:border-slate-800',
        style: {
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '16px 24px',
          fontWeight: 'bold',
        },
      }} />
    </div>
  );
};

export default MainLayout;
