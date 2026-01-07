import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { useAppData } from './hooks/useAppData';
import { Layout, EasterEgg, InstallPrompt } from './components/UI';
import { Login } from './components/Auth';
import { Home } from './components/Home';
import { Gallery } from './components/Gallery';
import { Quote } from './components/Quote';
import { Calendar } from './components/Calendar';
import { Timeline } from './components/Timeline';
import { Admin } from './components/Admin';
import { BucketList } from './components/BucketList';
import { Stats } from './components/Stats';

import './styles/globals.css';
import './styles/animations.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loading">
        <span className="loading-heart">💕</span>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loading">
        <span className="loading-heart">💕</span>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Public Route (redirect if logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loading">
        <span className="loading-heart">💕</span>
        <p>Loading...</p>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// App Content with Routes
const AppContent = () => {
  const { user } = useAuth();
  const { data } = useAppData();

  return (
    <ThemeProvider accentColor={data?.settings?.accentColor}>
      {user && <EasterEgg />}
      <InstallPrompt />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/gallery"
          element={
            <ProtectedRoute>
              <Layout>
                <Gallery />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/quote"
          element={
            <ProtectedRoute>
              <Layout>
                <Quote />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Layout>
                <Calendar />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/timeline"
          element={
            <ProtectedRoute>
              <Layout>
                <Timeline />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/bucket-list"
          element={
            <ProtectedRoute>
              <Layout>
                <BucketList />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <Layout>
                <Stats />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Layout>
                <Admin />
              </Layout>
            </AdminRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
};

// Main App
function App() {
  return (
    <AuthProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;