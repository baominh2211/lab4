import { useEffect, useState } from 'react';

export default function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      console.log(`X: ${e.clientX}, Y: ${e.clientY}`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <h3>1.3 MouseTracker</h3>
      <p>Move your mouse around to see the coordinates update in real-time.</p>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        marginTop: '1rem',
        textAlign: 'center',
        fontFamily: 'monospace',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div>X: {position.x}px</div>
        <div>Y: {position.y}px</div>
      </div>
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
        Also check the browser console for logs
      </p>
    </div>
  );
}
