import { Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Home from './pages/Home.jsx';
import Pricing from './pages/Pricing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Terms from './pages/Terms.jsx';
import Privacy from './pages/Privacy.jsx';
import AppLayout from './components/AppLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import QuestionnaireBuilder from './modules/QuestionnaireBuilder.jsx';
import TestSelector from './modules/TestSelector.jsx';
import SpssAcademy from './pages/SpssAcademy.jsx';
import Consultations from './pages/Consultations.jsx';
import AnalysisServices from './pages/AnalysisServices.jsx';
import Admin from './pages/Admin.jsx';

export default function App() {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<ResetPassword />} />

        {/* Authenticated */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="questionnaire" element={<QuestionnaireBuilder />} />
          <Route path="tests" element={<TestSelector />} />
          <Route path="spss" element={<SpssAcademy />} />
          <Route path="analysis" element={<AnalysisServices />} />
          <Route path="consultations" element={<Consultations />} />
          <Route path="profile" element={<Profile />} />
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Vercel Analytics + Speed Insights (privacy-friendly, no cookies) */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
