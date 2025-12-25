import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext(null);

export const themes = {
  light: {
    name: 'light',
    bg: '#f9fafb',
    cardBg: '#ffffff',
    text: '#111827',
    textMuted: '#6b7280',
    primary: '#6366f1',
    border: '#e5e7eb',
    shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
  },
  dark: {
    name: 'dark',
    bg: '#0f172a',
    cardBg: '#1e293b',
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    primary: '#818cf8',
    border: '#334155',
    shadow: '0 1px 3px 0 rgb(0 0 0 / 0.5)',
  },
  christmas: {
    name: 'christmas',
    bg: '#1a0a0a',
    cardBg: '#2d1818',
    text: '#fff5f5',
    textMuted: '#fecaca',
    primary: '#dc2626',
    border: '#7f1d1d',
    shadow: '0 0 20px rgba(220, 38, 38, 0.3)',
  },
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    const theme = themes[currentTheme];
    document.documentElement.style.setProperty('--bg', theme.bg);
    document.documentElement.style.setProperty('--card-bg', theme.cardBg);
    document.documentElement.style.setProperty('--text', theme.text);
    document.documentElement.style.setProperty('--text-muted', theme.textMuted);
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--border', theme.border);
    document.documentElement.style.setProperty('--shadow', theme.shadow);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, theme: themes[currentTheme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

export default ThemeContext;
