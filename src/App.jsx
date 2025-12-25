import MouseTracker from './components/MouseTracker';
import UncontrolledLogin from './components/UncontrolledLogin';
import PostFetcher from './components/PostFetcher';
import ControlledSignup from './components/ControlledSignup';
import ThemeDemo from './components/ThemeDemo';
import LocalStorageDemo from './components/LocalStorageDemo';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <h1>Lab 4: Intermediate React</h1>
      
      <section>
        <h2>Section 1: useEffect Hook</h2>
        <MouseTracker />
      </section>

      <section>
        <h2>Section 2: useRef Hook</h2>
        <UncontrolledLogin />
      </section>

      <section>
        <h2>Section 3: Data Fetching</h2>
        <PostFetcher />
      </section>

      <section>
        <h2>Section 4: Forms</h2>
        <ControlledSignup />
      </section>

      <section>
        <h2>Section 6: Context API</h2>
        <ThemeDemo />
      </section>

      <section>
        <h2>Section 7: Custom Hooks</h2>
        <LocalStorageDemo />
      </section>

      <div>
        <h2>Section 8: BlogDash Capstone</h2>
        <p>Go to <a href="/blogdash">/blogdash</a> to see the capstone project</p>
      </div>
    </div>
  );
}
