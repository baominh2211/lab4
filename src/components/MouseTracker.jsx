import { useEffect, useState, useRef } from 'react';

export default function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPos = { x: e.clientX, y: e.clientY };
      setPosition(newPos);
      setTrail(prev => [...prev.slice(-20), newPos]);
      console.log(`X: ${e.clientX}, Y: ${e.clientY}`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (trail.length > 1) {
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);
      
      for (let i = 1; i < trail.length; i++) {
        ctx.lineTo(trail[i].x, trail[i].y);
      }

      const gradient = ctx.createLinearGradient(
        trail[0].x, trail[0].y,
        trail[trail.length - 1].x, trail[trail.length - 1].y
      );
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.1)');
      gradient.addColorStop(1, 'rgba(236, 72, 153, 0.8)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      trail.forEach((point, i) => {
        const size = (i / trail.length) * 6 + 2;
        const opacity = i / trail.length;
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(236, 72, 153, ${opacity})`;
        ctx.fill();
      });
    }
  }, [trail]);

  return (
    <div>
      <h3>1.3 MouseTracker with Trail Effect</h3>
      <p>Move your mouse around to see the magic trail!</p>
      
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9999
        }}
      />
      
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
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        position: 'relative',
        zIndex: 1
      }}>
        <div>X: {position.x}px</div>
        <div>Y: {position.y}px</div>
        <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.9 }}>
          Trail points: {trail.length}
        </div>
      </div>
      
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
        💡 Watch the colorful trail follow your cursor!
      </p>
    </div>
  );
}
