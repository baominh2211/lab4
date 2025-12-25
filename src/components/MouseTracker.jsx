import { useEffect } from 'react';

export default function MouseTracker() {
  useEffect(() => {
    const handleMouseMove = (e) => {
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
      <p>Move your mouse and check the console</p>
    </div>
  );
}
