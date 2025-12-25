import useLocalStorage from '../../hooks/useLocalStorage';

export default function LocalStorageDemo() {
  const [count, setCount] = useLocalStorage('myCounter', 0);
  const [name, setName] = useLocalStorage('userName', '');

  return (
    <div style={{ padding: '20px', border: '2px solid #e67e22', borderRadius: '8px', margin: '20px 0' }}>
      <h3>💾 useLocalStorage Demo</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>Counter (persists across page refreshes)</h4>
        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e67e22' }}>{count}</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setCount(count + 1)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Increment
          </button>
          <button
            onClick={() => setCount(count - 1)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#c0392b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Decrement
          </button>
          <button
            onClick={() => setCount(0)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#95a5a6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div>
        <h4>Name Input (also persists)</h4>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #bdc3c7',
            width: '250px'
          }}
        />
        <p>Hello, <strong>{name || 'stranger'}</strong>!</p>
      </div>

      <small style={{ display: 'block', marginTop: '15px', color: '#7f8c8d' }}>
        Try refreshing the page - your values will persist! Check localStorage in DevTools.
      </small>
    </div>
  );
}
