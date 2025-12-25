import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>🏠 Home Page</h2>
      <p>Welcome to the React Router demo!</p>
      
      <div style={{ marginTop: '20px' }}>
        <Link 
          to="/about"
          style={{
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            display: 'inline-block'
          }}
        >
          Go to About Page
        </Link>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Link 
          to="/users/123"
          style={{
            padding: '10px 20px',
            backgroundColor: '#9b59b6',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            display: 'inline-block'
          }}
        >
          View User Profile (ID: 123)
        </Link>
      </div>
    </div>
  );
}
