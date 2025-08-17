import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar(){
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <nav style={{background:'#1d4ed8', color:'#fff', padding:'12px', display:'flex', justifyContent:'space-between'}}>
      <Link to="/" style={{color:'#fff', fontWeight:'700', fontSize:18}}>Apartment Manager</Link>
      <div>
        {user ? (
          <>
            <Link to="/flats" style={{marginRight:12, color:'#fff'}}>Flats</Link>
            <Link to="/tenants" style={{marginRight:12, color:'#fff'}}>Tenants</Link>
            <Link to="/maintenance" style={{marginRight:12, color:'#fff'}}>Maintenance</Link>
            <Link to="/billing" style={{marginRight:12, color:'#fff'}}>Billing</Link>
            <Link to="/profile" style={{marginRight:12, color:'#fff'}}>Profile</Link>
            <button onClick={()=>{ logout(); navigate('/login');}} style={{background:'#ef4444', color:'#fff', border:'none', padding:'6px 12px', borderRadius:6}}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{marginRight:12, color:'#fff'}}>Login</Link>
            <Link to="/register" style={{color:'#fff'}}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
