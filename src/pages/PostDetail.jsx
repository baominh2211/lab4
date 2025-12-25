import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { data: post, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
      <div style={{ color: '#6366f1', fontSize: '1.25rem' }}>Loading post...</div>
    </div>
  );

  if (error) return (
    <div>
      <button
        onClick={() => navigate('/dashboard')}
        style={{ marginBottom: '1rem' }}
      >
        ← Back to Dashboard
      </button>
      <div style={{
        background: '#fef2f2',
        border: '2px solid #ef4444',
        color: '#ef4444',
        padding: '2rem',
        borderRadius: '12px'
      }}>
        Error: {error.message}
      </div>
    </div>
  );

  return (
    <div>
      <button
        onClick={() => navigate('/dashboard')}
        style={{
          marginBottom: '2rem',
          background: 'white',
          color: '#374151',
          border: '1px solid #d1d5db'
        }}
      >
        ← Back to Dashboard
      </button>

      <article style={{
        background: 'white',
        borderRadius: '16px',
        padding: '3rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#6366f1',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Post #{postId}
        </div>

        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '1.5rem',
          lineHeight: '1.2'
        }}>
          {post?.title}
        </h1>

        <div style={{
          height: '4px',
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '4px',
          marginBottom: '2rem',
          width: '100px'
        }} />

        <p style={{
          fontSize: '1.125rem',
          lineHeight: '1.8',
          color: '#374151',
          marginBottom: '2rem'
        }}>
          {post?.body}
        </p>

        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          gap: '2rem',
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          <div>
            <strong>Post ID:</strong> {postId}
          </div>
          <div>
            <strong>User ID:</strong> {post?.userId}
          </div>
        </div>
      </article>
    </div>
  );
}
