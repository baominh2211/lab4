import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Layout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
      {/* Navigation Bar */}
      <nav style={{
        backgroundColor: 'white',
        padding: '15px 30px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            📝 BlogDash
          </h1>

          <div style={{ display: 'flex', gap: '20px' }}>
            <Link
              to="/dashboard"
              style={{
                textDecoration: 'none',
                color: '#2c3e50',
                fontWeight: '500',
                padding: '8px 15px',
                borderRadius: '5px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Dashboard
            </Link>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: '8px 20px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          Logout
        </button>
      </nav>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '20px',
        color: '#95a5a6',
        fontSize: '14px',
        marginTop: '40px'
      }}>
        <p>React Lab 4 - BlogDash Capstone Project</p>
        <p style={{ fontSize: '12px', marginTop: '5px' }}>
          Demonstrating useEffect, useRef, Context API, React Router, and Custom Hooks
        </p>
      </footer>
    </div>
  );
}
