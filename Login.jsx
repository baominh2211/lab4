import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const usernameRef = useRef(null);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Auto-focus on username input when component mounts
  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    
    if (username.trim()) {
      login();
      navigate('/dashboard');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{ textAlign: 'center', color: '#667eea', marginBottom: '10px' }}>
          📝 BlogDash
        </h1>
        <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '30px' }}>
          Your Personal Blog Dashboard
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#2c3e50', fontWeight: 'bold' }}>
              Username
            </label>
            <input
              ref={usernameRef}
              type="text"
              placeholder="Enter your username"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #bdc3c7',
                fontSize: '14px'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#2c3e50', fontWeight: 'bold' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #bdc3c7',
                fontSize: '14px'
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '12px',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Log In
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#95a5a6', fontSize: '12px', marginTop: '20px' }}>
          Demo: Enter any username to login
        </p>
      </div>
    </div>
  );
}
