import { useState, useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={`button-${theme}`}>I'm a {theme} button</button>;
}

function Toolbar() {
  return (
    <div>
      <h4>Toolbar</h4>
      <ThemedButton />
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h4>Dashboard</h4>
      <Toolbar />
    </div>
  );
}

export default function ThemeDemo() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <h3>6.2 ThemeDemo</h3>
        <p>Current theme: {theme}</p>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme
        </button>
        <Dashboard />
      </div>
    </ThemeContext.Provider>
  );
}
