import { useEffect } from 'react';

export default function MouseTracker() {
  useEffect(() => {
    // Setup: Add event listener
    const handleMouseMove = (e) => {
      console.log(`Mouse Position - X: ${e.clientX}, Y: ${e.clientY}`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup: Remove event listener to prevent memory leak
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      console.log('MouseTracker cleanup: Event listener removed');
    };
  }, []); // Empty dependency array - only run on mount/unmount

  return (
    <div style={{ padding: '20px', border: '2px solid #3498db', borderRadius: '8px', margin: '20px 0' }}>
      <h3>🖱️ Mouse Tracker</h3>
      <p>Move your mouse around the window. Check the console to see coordinates.</p>
      <small style={{ color: '#7f8c8d' }}>
        This component demonstrates useEffect cleanup to prevent memory leaks.
      </small>
    </div>
  );
}
