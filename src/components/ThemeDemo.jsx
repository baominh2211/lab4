import { useState, useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button 
      className={`button-${theme}`}
      style={{
        minWidth: '200px',
        transition: 'all 0.3s ease'
      }}
    >
      {theme === 'light' ? '☀️' : '🌙'} {theme.charAt(0).toUpperCase() + theme.slice(1)} Mode
    </button>
  );
}

function Toolbar() {
  return (
    <div style={{
      padding: '1.5rem',
      background: 'rgba(0,0,0,0.02)',
      borderRadius: '8px',
      marginTop: '1rem'
    }}>
      <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '500' }}>
        Toolbar Component
      </h4>
      <ThemedButton />
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{
      padding: '1.5rem',
      background: 'rgba(0,0,0,0.02)',
      borderRadius: '8px',
      marginTop: '1rem'
    }}>
      <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '500' }}>
        Dashboard Component
      </h4>
      <Toolbar />
    </div>
  );
}

export default function ThemeDemo() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <h3>6.2 ThemeDemo - Context API</h3>
        <p>
          Theme propagates through nested components without prop drilling.
          Current theme: <strong>{theme}</strong>
        </p>
        <button 
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          style={{ marginTop: '1rem' }}
        >
          {theme === 'light' ? '🌙' : '☀️'} Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
        <Dashboard />
      </div>
    </ThemeContext.Provider>
  );
}
