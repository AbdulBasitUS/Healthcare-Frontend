import { Link, useNavigate, Outlet } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const token = localStorage.getItem('token');
  if (!token) navigate('/login');

  return (
    <>
    <nav className="nav">
      <div className="nav-title">Healthcare Scheduler</div>
      <div className="nav-links">
        <Link to="/staff" className="hover:underline">Staff</Link>
        <Link to="/shift" className="hover:underline">Shifts</Link>
        <Link to="/assign" className="hover:underline">Assign Staff</Link>
        <Link to="/attendance" className="hover:underline">Attendance</Link>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
    <Outlet/>
    </>
  );
}
