import { useState, useEffect } from 'react';

export default function PostFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) return (
    <div>
      <h3>3.2 PostFetcher</h3>
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        color: '#6366f1',
        fontSize: '1.125rem'
      }}>
        ⏳ Loading post...
      </div>
    </div>
  );

  if (error) return (
    <div>
      <h3>3.2 PostFetcher</h3>
      <div style={{
        background: '#fef2f2',
        border: '2px solid #ef4444',
        color: '#ef4444',
        padding: '1rem',
        borderRadius: '8px',
        fontWeight: '500'
      }}>
        ❌ Error: {error.message}
      </div>
    </div>
  );

  if (data) return (
    <div>
      <h3>3.2 PostFetcher</h3>
      <div style={{
        background: 'linear-gradient(to bottom right, #f0f9ff, #dbeafe)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid #bfdbfe'
      }}>
        <h4 style={{ 
          fontSize: '1.25rem', 
          marginBottom: '0.75rem',
          color: '#1e40af'
        }}>
          {data.title}
        </h4>
        <p style={{ color: '#374151', lineHeight: '1.7' }}>
          {data.body}
        </p>
        <div style={{
          marginTop: '1rem',
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          Post ID: {data.id} • User ID: {data.userId}
        </div>
      </div>
    </div>
  );
}
