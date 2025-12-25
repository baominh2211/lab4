import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

export default function Dashboard() {
  const { data: posts, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        fontSize: '18px',
        color: '#667eea'
      }}>
        <div>
          <div style={{ marginBottom: '10px', textAlign: 'center' }}>⏳</div>
          Loading posts...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: '20px',
        backgroundColor: '#fee',
        color: '#c00',
        borderRadius: '8px',
        margin: '20px'
      }}>
        <strong>Error:</strong> {error.message}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>
        📰 All Blog Posts
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {posts && posts.slice(0, 12).map(post => (
          <Link
            key={post.id}
            to={`/dashboard/post/${post.id}`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              fontSize: '12px',
              color: '#667eea',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}>
              POST #{post.id}
            </div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '10px',
              lineHeight: '1.4'
            }}>
              {post.title}
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#7f8c8d',
              lineHeight: '1.6',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical'
            }}>
              {post.body}
            </p>
            <div style={{
              marginTop: '15px',
              color: '#667eea',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              Read More →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
