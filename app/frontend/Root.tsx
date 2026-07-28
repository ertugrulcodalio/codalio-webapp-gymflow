import { useRhinoConfig } from '@rhino-project/core/config';
import {
  ErrorBoundary as RollbarErrorBounday,
  Provider as RollbarProvider
} from '@rollbar/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import FavIcon from './assets/images/favicon.png';
import { Helmet } from 'react-helmet';
import { RhinoProvider } from '@rhino-project/core';
import { useUser, useRoles } from '@rhino-project/core/hooks';
import { RhinoDevTool } from '@rhino-project/ui-heroui';
import { BrowserRouter, Route, Routes, Navigate, useParams } from 'react-router-dom';
import { SidebarProvider } from './components/ui/sidebar';
import { AppOwnerProvider } from './contexts/AppOwnerProvider';

// Import Pages
import Layout from './components/Layout';
import Landing from './pages/Landing';
import TenantHome from './pages/TenantHome';
import Login from './pages/Login';
import Register from './pages/Register';
import MemberDashboard from './pages/MemberDashboard';
import ClassSchedule from './pages/ClassSchedule';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import MembershipPlans from './pages/MembershipPlans';
import Trainers from './pages/Trainers';
import AdminClasses from './pages/AdminClasses';
import BookingsManagement from './pages/BookingsManagement';
import BrandingCustomization from './pages/BrandingCustomization';

// Route Guards
const AuthenticatedRoute = ({ children }) => {
  const user = useUser();
  const { gym_slug } = useParams();
  if (!user) {
    return <Navigate to={`/tenant/${gym_slug || 'apex-fitness'}/login`} replace />;
  }
  return children;
};

const RoleProtectedRoute = ({ roles, children }) => {
  const userRoles = useRoles();
  const { gym_slug } = useParams();
  const hasRole = roles.some(role => userRoles.includes(role));
  if (!hasRole) {
    if (userRoles.includes('gym_staff')) {
      return <Navigate to={`/tenant/${gym_slug || 'apex-fitness'}/admin/dashboard`} replace />;
    }
    return <Navigate to={`/tenant/${gym_slug || 'apex-fitness'}/dashboard`} replace />;
  }
  return children;
};

const RootUI = () => {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <AppOwnerProvider>
          <Routes>
            <Route element={<Layout />}>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/tenant/:gym_slug" element={<TenantHome />} />
              <Route path="/tenant/:gym_slug/login" element={<Login />} />
              <Route path="/tenant/:gym_slug/register" element={<Register />} />

              {/* Member Routes */}
              <Route
                path="/tenant/:gym_slug/dashboard"
                element={
                  <AuthenticatedRoute>
                    <RoleProtectedRoute roles={['gym_member']}>
                      <MemberDashboard />
                    </RoleProtectedRoute>
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/tenant/:gym_slug/classes"
                element={
                  <AuthenticatedRoute>
                    <RoleProtectedRoute roles={['gym_member']}>
                      <ClassSchedule />
                    </RoleProtectedRoute>
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/tenant/:gym_slug/bookings"
                element={
                  <AuthenticatedRoute>
                    <RoleProtectedRoute roles={['gym_member']}>
                      <MyBookings />
                    </RoleProtectedRoute>
                  </AuthenticatedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/tenant/:gym_slug/admin/dashboard"
                element={
                  <AuthenticatedRoute>
                    <RoleProtectedRoute roles={['gym_staff']}>
                      <AdminDashboard />
                    </RoleProtectedRoute>
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/tenant/:gym_slug/admin/plans"
                element={
                  <AuthenticatedRoute>
                    <RoleProtectedRoute roles={['gym_staff']}>
                      <MembershipPlans />
                    </RoleProtectedRoute>
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/tenant/:gym_slug/admin/trainers"
                element={
                  <AuthenticatedRoute>
                    <RoleProtectedRoute roles={['gym_staff']}>
                      <Trainers />
                    </RoleProtectedRoute>
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/tenant/:gym_slug/admin/classes"
                element={
                  <AuthenticatedRoute>
                    <RoleProtectedRoute roles={['gym_staff']}>
                      <AdminClasses />
                    </RoleProtectedRoute>
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/tenant/:gym_slug/admin/bookings"
                element={
                  <AuthenticatedRoute>
                    <RoleProtectedRoute roles={['gym_staff']}>
                      <BookingsManagement />
                    </RoleProtectedRoute>
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/tenant/:gym_slug/admin/branding"
                element={
                  <AuthenticatedRoute>
                    <RoleProtectedRoute roles={['gym_staff']}>
                      <BrandingCustomization />
                    </RoleProtectedRoute>
                  </AuthenticatedRoute>
                }
              />

              {/* Catch-all Wildcard Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </AppOwnerProvider>
      </BrowserRouter>
    </SidebarProvider>
  );
};

const Root = () => {
  const {
    appName,
    env: { ROLLBAR_ACCESS_TOKEN, ROLLBAR_ENV, ROLLBAR_ENABLED }
  } = useRhinoConfig();
  const rollbarConfig = {
    accessToken: ROLLBAR_ACCESS_TOKEN,
    environment: ROLLBAR_ENV,
    enabled: ROLLBAR_ENABLED,
    captureUncaught: true,
    captureUnhandledRejections: true
  };

  return (
    <RhinoProvider>
      <RollbarProvider config={rollbarConfig}>
        <RollbarErrorBounday>
          <RhinoDevTool />
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-right"
            position="bottom"
          />
          <Helmet>
            <title>{appName}</title>
            <link rel="icon" type="image/png" sizes="16x16" href={FavIcon} />
          </Helmet>

          <RootUI />
        </RollbarErrorBounday>
      </RollbarProvider>
    </RhinoProvider>
  );
};

export default Root;
