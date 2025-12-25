import { useTheme } from './context/ThemeContext';
import MouseTracker from './components/MouseTracker';
import UncontrolledLogin from './components/UncontrolledLogin';
import PostFetcher from './components/PostFetcher';
import ControlledSignup from './components/ControlledSignup';
import ThemeDemo from './components/ThemeDemo';
import LocalStorageDemo from './components/LocalStorageDemo';
import ThemeSwitcher from './components/ThemeSwitcher';
import ChristmasEffects from './components/ChristmasEffects';
import './App.css';

export default function App() {
  const { currentTheme } = useTheme();

  return (
    <div className="app">
      <ThemeSwitcher />
      {currentTheme === 'christmas' && <ChristmasEffects />}
      
      <h1>Lab 4: Intermediate React</h1>
      
      <section>
        <h2>Section 1: The useEffect Hook</h2>
        <MouseTracker />
      </section>

      <section>
        <h2>Section 2: The useRef Hook</h2>
        <UncontrolledLogin />
      </section>

      <section>
        <h2>Section 3: Data Fetching Strategies</h2>
        <PostFetcher />
      </section>

      <section>
        <h2>Section 4: Architecting Forms</h2>
        <ControlledSignup />
      </section>

      <section>
        <h2>Section 6: The Context API</h2>
        <ThemeDemo />
      </section>

      <section>
        <h2>Section 7: Custom Hooks</h2>
        <LocalStorageDemo />
      </section>

      <section style={{
        background: currentTheme === 'christmas' 
          ? 'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <h2 style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>
          Section 8: Capstone Project
        </h2>
        <h3 style={{ color: 'white' }}>📝 BlogDash Application</h3>
        <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem' }}>
          A complete blog dashboard with authentication, protected routes, and dynamic routing.
        </p>
        <a
          href="/blogdash"
          style={{
            display: 'inline-block',
            padding: '0.875rem 1.75rem',
            background: 'white',
            color: currentTheme === 'christmas' ? '#dc2626' : '#667eea',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          }}
        >
          Launch BlogDash →
        </a>
      </section>
    </div>
  );
}
