import { Outlet, Link } from 'react-router-dom';

export default function RouterLayout() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Navigation */}
      <nav style={{
        backgroundColor: '#34495e',
        padding: '15px 30px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <h1 style={{ color: 'white', margin: 0, fontSize: '20px' }}>
            Router Demo
          </h1>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
          <Link to="/users/456" style={{ color: 'white', textDecoration: 'none' }}>User 456</Link>
        </div>
      </nav>

      {/* Render child routes here */}
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <Outlet />
      </div>
    </div>
  );
}
