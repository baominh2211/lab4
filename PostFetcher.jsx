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
        
        // Manual error checking for fetch API
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
  }, []); // Fetch only on mount

  // Conditional rendering based on state
  if (loading) {
    return (
      <div style={{ padding: '20px', border: '2px solid #f39c12', borderRadius: '8px', margin: '20px 0' }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', border: '2px solid #e74c3c', borderRadius: '8px', margin: '20px 0' }}>
        <div style={{ color: '#e74c3c' }}>Error: {error.message}</div>
      </div>
    );
  }

  if (data) {
    return (
      <div style={{ padding: '20px', border: '2px solid #2ecc71', borderRadius: '8px', margin: '20px 0' }}>
        <h3>📝 Post Fetcher</h3>
        <h1 style={{ fontSize: '1.5rem', color: '#2c3e50' }}>{data.title}</h1>
        <p style={{ color: '#7f8c8d' }}>{data.body}</p>
        <small style={{ color: '#95a5a6' }}>Post ID: {data.id} | User ID: {data.userId}</small>
      </div>
    );
  }

  return null;
}
