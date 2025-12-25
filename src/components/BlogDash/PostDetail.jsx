import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

export default function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  
  const { data: post, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

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
          Loading post...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <div style={{
          padding: '20px',
          backgroundColor: '#fee',
          color: '#c00',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <strong>Error:</strong> {error.message}
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/dashboard')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        ← Back to Dashboard
      </button>

      {post && (
        <article style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#667eea',
            fontWeight: 'bold',
            marginBottom: '15px'
          }}>
            POST #{post.id} | User ID: {post.userId}
          </div>

          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#2c3e50',
            marginBottom: '20px',
            lineHeight: '1.3'
          }}>
            {post.title}
          </h1>

          <div style={{
            height: '3px',
            background: 'linear-gradient(90deg, #667eea, #764ba2)',
            marginBottom: '25px',
            borderRadius: '3px'
          }}></div>

          <p style={{
            fontSize: '18px',
            color: '#555',
            lineHeight: '1.8',
            textAlign: 'justify'
          }}>
            {post.body}
          </p>

          <div style={{
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid #e0e0e0',
            color: '#95a5a6',
            fontSize: '14px'
          }}>
            <p>💡 This post was fetched using the dynamic route parameter: <code style={{
              backgroundColor: '#f4f4f4',
              padding: '2px 6px',
              borderRadius: '3px',
              fontFamily: 'monospace'
            }}>postId = {postId}</code></p>
          </div>
        </article>
      )}
    </div>
  );
}
