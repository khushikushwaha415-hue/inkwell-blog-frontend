import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 2rem', height: '64px',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      boxShadow: '0 2px 20px rgba(0,0,0,0.15)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px',
        }}>✍️</div>
        <span style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', fontFamily: 'Lora, serif' }}>
          Inkwell
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link to="/" style={{ color: 'rgba(255,255,255,0.75)', padding: '8px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: 500 }}>
          Home
        </Link>
        {user ? (
          <>
            <Link to="/dashboard" style={{ color: 'rgba(255,255,255,0.75)', padding: '8px 14px', borderRadius: '8px', fontSize: '14px' }}>
              Dashboard
            </Link>
            <Link to="/create" style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: '#fff', padding: '8px 18px', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
            }}>
              ✍️ Write
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '8px' }}>
              <div style={{
                width: '34px', height: '34px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: '14px',
              }}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <button onClick={() => { logout(); navigate('/'); }} style={{
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', padding: '6px 14px', borderRadius: '8px', fontSize: '13px',
              }}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'rgba(255,255,255,0.75)', padding: '8px 14px', borderRadius: '8px', fontSize: '14px' }}>
              Login
            </Link>
            <Link to="/register" style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: '#fff', padding: '8px 18px', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
            }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}