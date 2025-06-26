import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Staff from './pages/Staff';
import Shift from './pages/Shift';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Attendance from './pages/Attendance';
import AssignStaff from './pages/AssignStaff';
import { ToastContainer } from 'react-toastify';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navbar />}>
          <Route path="/staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
          <Route path="/shift" element={<ProtectedRoute><Shift /></ProtectedRoute>} />
          <Route path="/assign" element={<ProtectedRoute><AssignStaff /></ProtectedRoute>} />
          <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
