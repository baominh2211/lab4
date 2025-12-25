import { useEffect, useRef } from 'react';

export default function ChristmasEffects() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Snowflakes
    const snowflakes = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 0.5,
      drift: Math.random() * 0.5 - 0.25,
    }));

    // Reindeer position
    let reindeerX = -100;
    const reindeerY = 50;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw snowflakes
      snowflakes.forEach(flake => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();

        // Update position
        flake.y += flake.speed;
        flake.x += flake.drift;

        // Reset if out of bounds
        if (flake.y > canvas.height) {
          flake.y = -10;
          flake.x = Math.random() * canvas.width;
        }
        if (flake.x > canvas.width) flake.x = 0;
        if (flake.x < 0) flake.x = canvas.width;
      });

      // Draw reindeer (simple emoji style)
      ctx.font = '48px serif';
      ctx.fillText('🦌🎅', reindeerX, reindeerY);

      // Update reindeer position
      reindeerX += 2;
      if (reindeerX > canvas.width) {
        reindeerX = -100;
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9998,
      }}
    />
  );
}
