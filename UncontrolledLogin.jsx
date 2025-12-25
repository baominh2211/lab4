import { useRef } from 'react';

export default function UncontrolledLogin() {
  // Create ref for username input
  const usernameRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Access value from the DOM directly using ref
    const username = usernameRef.current.value;
    alert(`Username submitted: ${username}`);
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #e74c3c', borderRadius: '8px', margin: '20px 0' }}>
      <h3>🔐 Uncontrolled Login Form</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <input
          ref={usernameRef}
          type="text"
          placeholder="Enter username"
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #bdc3c7' }}
        />
        <button 
          type="submit"
          style={{ 
            padding: '10px', 
            backgroundColor: '#e74c3c', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>
      </form>
      <small style={{ color: '#7f8c8d', marginTop: '10px', display: 'block' }}>
        This uses useRef to access DOM values without controlled state.
      </small>
    </div>
  );
}
