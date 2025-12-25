import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>ℹ️ About Page</h2>
      <p>This is the About page demonstrating React Router navigation.</p>
      
      <button
        onClick={handleGoHome}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#2ecc71',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        ← Back to Home (using useNavigate)
      </button>
    </div>
  );
}
