import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea15, #764ba215)' }}>
      <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '20px', width: '100%', maxWidth: '420px', boxShadow: '0 8px 40px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✍️</div>
          <h2 style={{ fontFamily: 'Lora, serif', fontSize: '1.8rem', color: '#1a1a2e' }}>Welcome Back</h2>
          <p style={{ color: '#888', fontSize: '14px', marginTop: '4px' }}>Sign in to your account</p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '1rem', border: '1px solid #fecaca' }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Email</label>
            <input type="email" placeholder="you@example.com" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Password</label>
            <input type="password" placeholder="••••••••" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
            />
          </div>
          <button onClick={handleSubmit} disabled={loading} style={{
            padding: '13px', borderRadius: '10px', border: 'none', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
            background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff',
            boxShadow: '0 4px 15px rgba(102,126,234,0.4)', marginTop: '4px',
          }}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: '14px', color: '#888', marginTop: '1.5rem' }}>
          Don't have an account? <Link to="/register" style={{ color: '#667eea', fontWeight: 600 }}>Register</Link>
        </p>
      </div>
    </div>
  );
}