import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Flats from './pages/Flats';
import Tenants from './pages/Tenants';
import Maintenance from './pages/Maintenance';
import Billing from './pages/Billing';

export default function App(){
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/flats" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/flats" element={<Flats />} />
        <Route path="/tenants" element={<Tenants />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/billing" element={<Billing />} />
      </Routes>
    </Router>
  );
}
import ProtectedRoute from './components/ProtectedRoute';

// ...
<Routes>
  <Route path="/" element={<Navigate to="/flats" replace />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
  <Route path="/flats" element={<ProtectedRoute><Flats/></ProtectedRoute>} />
  <Route path="/tenants" element={<ProtectedRoute><Tenants/></ProtectedRoute>} />
  <Route path="/maintenance" element={<ProtectedRoute><Maintenance/></ProtectedRoute>} />
  <Route path="/billing" element={<ProtectedRoute><Billing/></ProtectedRoute>} />
</Routes>

