import { useState } from 'react';
import MouseTracker from './components/Section1/MouseTracker';
import UncontrolledLogin from './components/Section2/UncontrolledLogin';
import PostFetcher from './components/Section3/PostFetcher';
import ControlledSignup from './components/Section4/ControlledSignup';
import ThemeDemo from './components/Section6/ThemeDemo';
import LocalStorageDemo from './components/Section7/LocalStorageDemo';
import './App.css';

export default function App() {
  const [activeSection, setActiveSection] = useState('all');

  const sections = [
    { id: 'all', name: 'All Exercises', icon: '📚' },
    { id: 'section1', name: 'Section 1: useEffect', icon: '⚡' },
    { id: 'section2', name: 'Section 2: useRef', icon: '🎯' },
    { id: 'section3', name: 'Section 3: Data Fetching', icon: '🌐' },
    { id: 'section4', name: 'Section 4: Forms', icon: '📝' },
    { id: 'section6', name: 'Section 6: Context API', icon: '🎨' },
    { id: 'section7', name: 'Section 7: Custom Hooks', icon: '🔧' },
  ];

  const renderSection = (sectionId) => {
    if (activeSection !== 'all' && activeSection !== sectionId) return null;

    switch (sectionId) {
      case 'section1':
        return <MouseTracker />;
      case 'section2':
        return <UncontrolledLogin />;
      case 'section3':
        return <PostFetcher />;
      case 'section4':
        return <ControlledSignup />;
      case 'section6':
        return <ThemeDemo />;
      case 'section7':
        return <LocalStorageDemo />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🎓 React Lab 4: Intermediate Exercises</h1>
        <p>MSc. Tran Vinh Khiem - Comprehensive React Intermediate Concepts</p>
      </header>

      <nav className="navigation">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={activeSection === section.id ? 'nav-button active' : 'nav-button'}
          >
            <span className="nav-icon">{section.icon}</span>
            {section.name}
          </button>
        ))}
      </nav>

      <main className="content">
        <div className="info-banner">
          <h3>📖 About This Lab</h3>
          <p>
            This application demonstrates all exercises from React Lab 4, including:
            useEffect lifecycle, useRef for DOM access, data fetching with loading states,
            controlled/uncontrolled forms, Context API for state management, and custom hooks.
          </p>
          <p style={{ marginTop: '10px' }}>
            <strong>Note:</strong> The BlogDash capstone project is available at{' '}
            <a href="/blogdash" style={{ color: '#667eea', fontWeight: 'bold' }}>
              /blogdash
            </a>{' '}
            (separate route).
          </p>
        </div>

        <div className="exercises-container">
          {renderSection('section1')}
          {renderSection('section2')}
          {renderSection('section3')}
          {renderSection('section4')}
          {renderSection('section6')}
          {renderSection('section7')}
        </div>
      </main>

      <footer className="footer">
        <p>React Lab 4 - All exercises implemented with best practices</p>
        <p style={{ fontSize: '12px', marginTop: '5px', opacity: 0.7 }}>
          Toggle sections using the navigation above | Check console for MouseTracker output
        </p>
      </footer>
    </div>
  );
}
