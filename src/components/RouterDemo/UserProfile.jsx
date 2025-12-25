import { useParams, useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h2>👤 User Profile</h2>
      <div style={{
        padding: '20px',
        backgroundColor: '#ecf0f1',
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h1 style={{ fontSize: '24px', color: '#2c3e50' }}>
          Profile for User: {userId}
        </h1>
        <p style={{ color: '#7f8c8d', marginTop: '10px' }}>
          This is a dynamic route. The userId "{userId}" was extracted from the URL using useParams hook.
        </p>
      </div>

      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        ← Back to Home
      </button>
    </div>
  );
}
