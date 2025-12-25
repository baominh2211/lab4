import { useState, useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';

// Deeply nested component that consumes context
function ThemedButton() {
  const theme = useContext(ThemeContext);
  
  const buttonStyles = {
    light: {
      backgroundColor: '#ecf0f1',
      color: '#2c3e50',
      border: '2px solid #bdc3c7'
    },
    dark: {
      backgroundColor: '#34495e',
      color: '#ecf0f1',
      border: '2px solid #2c3e50'
    }
  };

  return (
    <button 
      className={`button-${theme}`}
      style={{
        ...buttonStyles[theme],
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
    >
      I'm a {theme} themed button!
    </button>
  );
}

// Intermediate component (doesn't need to pass props)
function Toolbar() {
  return (
    <div style={{ padding: '15px', border: '1px dashed #95a5a6', borderRadius: '4px', margin: '10px 0' }}>
      <h4 style={{ margin: '0 0 10px 0' }}>Toolbar Component</h4>
      <ThemedButton />
    </div>
  );
}

// Dashboard component
function Dashboard() {
  return (
    <div style={{ padding: '15px', border: '1px dashed #95a5a6', borderRadius: '4px', margin: '10px 0' }}>
      <h4 style={{ margin: '0 0 10px 0' }}>Dashboard Component</h4>
      <Toolbar />
    </div>
  );
}

// Main component that provides context
export default function ThemeDemo() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const containerStyles = {
    light: {
      backgroundColor: '#ffffff',
      color: '#2c3e50'
    },
    dark: {
      backgroundColor: '#2c3e50',
      color: '#ecf0f1'
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div 
        style={{
          ...containerStyles[theme],
          padding: '20px',
          border: '2px solid #1abc9c',
          borderRadius: '8px',
          margin: '20px 0',
          transition: 'all 0.3s ease'
        }}
      >
        <h3>🎨 Theme Context Demo</h3>
        <p>Current theme: <strong>{theme}</strong></p>
        
        <button
          onClick={toggleTheme}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1abc9c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '15px',
            fontWeight: 'bold'
          }}
        >
          Toggle Theme
        </button>

        <Dashboard />

        <small style={{ display: 'block', marginTop: '15px', opacity: 0.7 }}>
          Notice: ThemedButton uses Context without prop drilling through Dashboard and Toolbar!
        </small>
      </div>
    </ThemeContext.Provider>
  );
}
