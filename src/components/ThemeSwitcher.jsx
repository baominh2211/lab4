import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitcher() {
  const { currentTheme, setCurrentTheme } = useTheme();

  const themeOptions = [
    { value: 'light', icon: '☀️', label: 'Light' },
    { value: 'dark', icon: '🌙', label: 'Dark' },
    { value: 'christmas', icon: '🎄', label: 'Christmas' },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 10000,
      background: 'var(--card-bg)',
      padding: '0.75rem',
      borderRadius: '12px',
      boxShadow: 'var(--shadow)',
      border: '1px solid var(--border)',
      display: 'flex',
      gap: '0.5rem',
    }}>
      {themeOptions.map(option => (
        <button
          key={option.value}
          onClick={() => setCurrentTheme(option.value)}
          style={{
            padding: '0.5rem 1rem',
            background: currentTheme === option.value ? 'var(--primary)' : 'transparent',
            color: currentTheme === option.value ? 'white' : 'var(--text)',
            border: currentTheme === option.value ? 'none' : '1px solid var(--border)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (currentTheme !== option.value) {
              e.currentTarget.style.background = 'var(--border)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentTheme !== option.value) {
              e.currentTarget.style.background = 'transparent';
            }
          }}
        >
          <span>{option.icon}</span>
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}
