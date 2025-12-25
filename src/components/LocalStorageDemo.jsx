import useLocalStorage from '../hooks/useLocalStorage';

export default function LocalStorageDemo() {
  const [count, setCount] = useLocalStorage('myCounter', 0);

  return (
    <div>
      <h3>7.2 Custom Hook - useLocalStorage</h3>
      <p>This counter persists across page refreshes using localStorage.</p>
      
      <div style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        padding: '2rem',
        borderRadius: '12px',
        marginTop: '1rem',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '1rem'
        }}>
          {count}
        </div>
        <div className="flex" style={{ 
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <button 
            onClick={() => setCount(count - 1)}
            style={{ background: 'rgba(255,255,255,0.9)', color: '#f5576c' }}
          >
            − Decrement
          </button>
          <button 
            onClick={() => setCount(0)}
            style={{ background: 'rgba(255,255,255,0.9)', color: '#666' }}
          >
            Reset
          </button>
          <button 
            onClick={() => setCount(count + 1)}
            style={{ background: 'rgba(255,255,255,0.9)', color: '#10b981' }}
          >
            + Increment
          </button>
        </div>
      </div>
      
      <p style={{ 
        marginTop: '1rem', 
        fontSize: '0.875rem', 
        color: '#6b7280',
        fontStyle: 'italic'
      }}>
        💡 Try refreshing the page - your count will still be here!
      </p>
    </div>
  );
}
