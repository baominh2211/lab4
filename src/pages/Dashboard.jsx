import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function Dashboard() {
  const { data: posts, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
      <div style={{ color: '#6366f1', fontSize: '1.25rem' }}>Loading posts...</div>
    </div>
  );

  if (error) return (
    <div style={{
      background: '#fef2f2',
      border: '2px solid #ef4444',
      color: '#ef4444',
      padding: '2rem',
      borderRadius: '12px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>❌</div>
      Error: {error.message}
    </div>
  );

  return (
    <div>
      <div style={{
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #e5e7eb'
      }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          📰 All Blog Posts
        </h2>
        <p style={{ color: '#6b7280' }}>Click any post to read more</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {posts?.slice(0, 12).map(post => (
          <Link
            key={post.id}
            to={`/dashboard/post/${post.id}`}
            style={{
              display: 'block',
              padding: '1.5rem',
              background: 'white',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              textDecoration: 'none',
              transition: 'all 0.2s',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = '#6366f1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            <div style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#6366f1',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Post #{post.id}
            </div>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '0.5rem',
              lineHeight: '1.4'
            }}>
              {post.title}
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>
              {post.body}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
