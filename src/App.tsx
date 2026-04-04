import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { AccommodationsPage } from './pages/AccommodationsPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ExperienceDetailsPage } from './pages/ExperienceDetailsPage';

import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/admin/Login';
import { AdminLayout } from './layouts/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { BlogList } from './pages/admin/BlogList';
import { EditBlog } from './pages/admin/EditBlog';
import { ExperienceList } from './pages/admin/ExperienceList';
import { EditExperience } from './pages/admin/EditExperience';
import { EditHero } from './pages/admin/EditHero';
import { EditAbout } from './pages/admin/EditAbout';
import { EditGallery } from './pages/admin/EditGallery';
import { BookingList } from './pages/admin/BookingList';
import { EditSettings } from './pages/admin/EditSettings';

import { HelmetProvider } from 'react-helmet-async';

export function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Website Routes */}
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="experiences" element={<ExperiencesPage />} />
              <Route path="experiences/:slug" element={<ExperienceDetailsPage />} />
              <Route path="accommodations" element={<AccommodationsPage />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogPostPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="experiences" element={<ExperienceList />} />
              <Route path="experiences/:id" element={<EditExperience />} />
              <Route path="bookings" element={<BookingList />} />
              <Route path="blog" element={<BlogList />} />
              <Route path="blog/:id" element={<EditBlog />} />
              <Route path="hero" element={<EditHero />} />
              <Route path="about" element={<EditAbout />} />
              <Route path="gallery" element={<EditGallery />} />
              <Route path="settings" element={<EditSettings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}