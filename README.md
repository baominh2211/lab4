# React Lab 4 - Conceptual Questions: Detailed Answers

## Section 1: The useEffect Hook

### 1.1.1 Primary Purpose of useEffect

**Answer:**

The primary purpose of the `useEffect` hook is to **synchronize React components with external systems**. 

It's described as an "escape hatch" because:

1. **React's Core Philosophy**: React components should be pure functions that simply transform props and state into JSX. They shouldn't have side effects during rendering.

2. **External Systems**: Many real-world applications need to interact with things outside of React's control:
   - Browser APIs (DOM manipulation, localStorage, event listeners)
   - Network requests (fetching data from APIs)
   - Third-party libraries (analytics, chat widgets)
   - Subscriptions (WebSocket connections, intervals/timeouts)

3. **Escape Hatch**: useEffect provides a controlled way to "escape" from React's pure rendering model to interact with these imperative, external systems while still maintaining React's declarative approach.

**Example:**
```javascript
// Bad: Side effect during render
function ChatRoom() {
  connectToChat(); // ❌ Runs during render - impure!
  return <div>Chat</div>;
}

// Good: Side effect in useEffect
function ChatRoom() {
  useEffect(() => {
    connectToChat(); // ✅ Runs after render - synchronized!
    return () => disconnectFromChat();
  }, []);
  return <div>Chat</div>;
}
```

---

### 1.1.2 Effect Lifecycle vs Class Component Lifecycle

**Answer:**

**Effect Lifecycle (Synchronization Model):**
- **Think**: Start/stop synchronizing with an external system
- **Start**: When dependencies change, setup function runs
- **Stop**: When dependencies change or component unmounts, cleanup runs
- **Philosophy**: "Keep component synchronized with external system"

**Example:**
```javascript
useEffect(() => {
  // START synchronizing with chat server for roomId
  const connection = connectToChat(roomId);
  
  return () => {
    // STOP synchronizing when roomId changes or unmount
    connection.disconnect();
  };
}, [roomId]); // Re-synchronize when roomId changes
```

**Class Component Lifecycle (Event Model):**
- **Think**: Respond to specific lifecycle events
- **Events**: componentDidMount, componentDidUpdate, componentWillUnmount
- **Philosophy**: "React to specific moments in component's life"

**Example:**
```javascript
class ChatRoom extends Component {
  componentDidMount() {
    // Only runs once after first render
    connectToChat(this.props.roomId);
  }
  
  componentDidUpdate(prevProps) {
    // Runs after every update - need to check what changed
    if (prevProps.roomId !== this.props.roomId) {
      disconnectFromChat(prevProps.roomId);
      connectToChat(this.props.roomId);
    }
  }
  
  componentWillUnmount() {
    // Only runs once before unmount
    disconnectFromChat(this.props.roomId);
  }
}
```

**Key Differences:**

| Aspect | useEffect | Class Lifecycle |
|--------|-----------|-----------------|
| Mental Model | Synchronization | Lifecycle Events |
| Code Organization | Single location per effect | Split across 3+ methods |
| Dependency Tracking | Automatic with dependency array | Manual comparison needed |
| Multiple Effects | Each effect is independent | All logic mixed together |
| Cleanup | Paired with setup in same function | Separate method |

---

### 1.1.3 Strict Mode Double Invocation

**Answer:**

**Why React Strict Mode Runs Setup/Cleanup Twice:**

In development mode, React's Strict Mode intentionally runs:
```
mount → setup → cleanup → setup
```

**Purpose:**
To expose bugs in cleanup logic by simulating what happens when a component is mounted, unmounted, and remounted.

**What Bugs This Exposes:**

1. **Missing Cleanup**
```javascript
// BUG: No cleanup
useEffect(() => {
  const interval = setInterval(() => {
    console.log('tick');
  }, 1000);
  // ❌ Missing return - interval keeps running!
}, []);

// With Strict Mode: You'll see TWO intervals running
// This reveals the bug immediately in development
```

2. **Incomplete Cleanup**
```javascript
// BUG: Incomplete cleanup
useEffect(() => {
  const listener = () => console.log('clicked');
  document.addEventListener('click', listener);
  
  return () => {
    // ❌ Forgot to remove listener!
  };
}, []);

// Strict Mode reveals multiple listeners accumulating
```

3. **Setup That Can't Be Repeated**
```javascript
// BUG: Assumes setup runs once
useEffect(() => {
  globalState.count++; // ❌ Side effect that accumulates!
}, []);

// Strict Mode shows count incremented twice
```

**Real-World Scenario:**
Without Strict Mode, these bugs might only appear when:
- User navigates away and back (unmount/remount)
- Component suspends and resumes
- React's concurrent features cause re-renders

**Best Practice:**
```javascript
// GOOD: Cleanup mirrors setup perfectly
useEffect(() => {
  const connection = createConnection();
  connection.connect();
  
  return () => {
    connection.disconnect(); // ✅ Perfect cleanup
  };
}, []);
```

---

## Section 2: The useRef Hook

### 2.2.1 useRef vs useState: Key Differences

**Answer:**

**Two Primary Differences:**

**1. Re-renders:**
- **useState**: Changing state triggers re-render
- **useRef**: Changing ref.current does NOT trigger re-render

```javascript
function Example() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  
  const handleClick = () => {
    setCount(count + 1);      // ✅ Component re-renders
    countRef.current = countRef.current + 1; // ❌ No re-render
    console.log(countRef.current); // Can see updated value
  };
  
  // Only 'count' appears in JSX, countRef changes invisible
  return <div>{count}</div>;
}
```

**2. Value Updates (Synchronous vs Asynchronous):**
- **useState**: Updates are asynchronous (batched)
- **useRef**: Updates are synchronous (immediate)

```javascript
function Example() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  
  const handleClick = () => {
    // useState - asynchronous
    setCount(count + 1);
    console.log(count); // Still 0! (old value)
    
    // useRef - synchronous
    countRef.current = countRef.current + 1;
    console.log(countRef.current); // 1! (new value immediately)
  };
}
```

**Summary Table:**

| Feature | useState | useRef |
|---------|----------|--------|
| Triggers Re-render | ✅ Yes | ❌ No |
| Update Timing | Asynchronous | Synchronous |
| Persists Across Renders | ✅ Yes | ✅ Yes |
| Use in JSX | ✅ Common | ❌ Rarely |
| Typical Use | UI state | DOM refs, mutable values |

---

### 2.2.2 Why useRef for setInterval ID

**Answer:**

**Scenario: Storing a setInterval ID**

```javascript
// ❌ BAD: Using useState
function Timer() {
  const [count, setCount] = useState(0);
  const [intervalId, setIntervalId] = useState(null); // Inefficient!
  
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    
    setIntervalId(id); // ⚠️ Causes unnecessary re-render!
    
    return () => clearInterval(intervalId);
  }, []);
  
  return <div>{count}</div>;
}

// ✅ GOOD: Using useRef
function Timer() {
  const [count, setCount] = useState(0);
  const intervalIdRef = useRef(null); // Efficient!
  
  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    
    return () => clearInterval(intervalIdRef.current);
  }, []);
  
  return <div>{count}</div>;
}
```

**Why useRef is Correct:**

1. **No Need to Re-render**
   - The interval ID is never displayed in the UI
   - Changing it shouldn't cause a re-render
   - useState would waste performance on unnecessary render

2. **Mutable Reference**
   - Need to store and update the ID
   - Don't need React to track it for rendering
   - Perfect use case for ref.current

3. **Cleanup Access**
   - Cleanup function needs access to the ID
   - useRef maintains the value across renders
   - Available immediately when cleanup runs

**Performance Impact:**
```javascript
// useState version:
// 1. setInterval runs
// 2. setIntervalId called → triggers re-render
// 3. Component re-renders unnecessarily
// 4. Total: 2 renders (mount + state update)

// useRef version:
// 1. setInterval runs
// 2. intervalIdRef.current updated (no re-render)
// 3. Total: 1 render (just mount)
```

---

### 2.2.3 Cardinal Rule: useState vs useRef

**Answer:**

**The Cardinal Rule:**

> **Use useState if the data is used for rendering. Use useRef if the data is not used for rendering.**

**Decision Tree:**
```
Does this value appear in JSX or affect what's rendered?
│
├─ YES → useState
│   └─ Examples: user input, visibility toggles, selected items
│
└─ NO → useRef
    └─ Examples: DOM references, timers, previous values, focus state
```

**Examples:**

**useState Cases (Used for Rendering):**
```javascript
// ✅ Correct: Value affects UI
const [isOpen, setIsOpen] = useState(false);
return <Modal show={isOpen} />;

// ✅ Correct: Value displayed
const [name, setName] = useState('');
return <input value={name} />;

// ✅ Correct: Value determines what renders
const [items, setItems] = useState([]);
return <ul>{items.map(item => <li>{item}</li>)}</ul>;
```

**useRef Cases (NOT Used for Rendering):**
```javascript
// ✅ Correct: DOM reference, not displayed
const inputRef = useRef(null);
const focusInput = () => inputRef.current.focus();
return <input ref={inputRef} />;

// ✅ Correct: Timer ID, not displayed
const timerRef = useRef(null);
timerRef.current = setInterval(/* ... */);

// ✅ Correct: Previous value for comparison
const prevCountRef = useRef();
useEffect(() => {
  prevCountRef.current = count;
});

// ✅ Correct: Mutable value that shouldn't trigger renders
const renderCountRef = useRef(0);
renderCountRef.current++;
```

**Common Mistake:**
```javascript
// ❌ WRONG: Using useRef for rendered data
const nameRef = useRef('');
return <input value={nameRef.current} />; // Won't update UI!

// ✅ CORRECT: Use useState for rendered data
const [name, setName] = useState('');
return <input value={name} />;
```

**Why This Rule Matters:**
- **useState**: React knows when to re-render the UI
- **useRef**: React doesn't track changes, so UI won't update
- Using the wrong one leads to bugs or performance issues

---

## Section 3: Data Fetching Strategies

### 3.1.1 fetch vs axios: Two Key Differences

**Answer:**

**1. JSON Parsing**

**fetch (Manual):**
```javascript
fetch('https://api.example.com/data')
  .then(response => response.json()) // ⚠️ Must manually parse
  .then(data => console.log(data));
```

**axios (Automatic):**
```javascript
axios.get('https://api.example.com/data')
  .then(response => console.log(response.data)); // ✅ Already parsed
```

**2. Error Handling**

**fetch (Only Network Errors):**
```javascript
fetch('https://api.example.com/data')
  .then(response => {
    // ⚠️ response.ok is still true for 404, 500, etc.!
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .catch(error => {
    // Only catches:
    // - Network failures (no internet)
    // - CORS errors
    // - Manually thrown errors
  });
```

**axios (HTTP Errors Too):**
```javascript
axios.get('https://api.example.com/data')
  .catch(error => {
    // Automatically catches:
    // - Network failures
    // - HTTP errors (404, 500, etc.)
    // - Timeout errors
    if (error.response) {
      console.log(error.response.status); // 404, 500, etc.
    }
  });
```

**Summary Table:**

| Feature | fetch | axios |
|---------|-------|-------|
| JSON Parsing | Manual (.json()) | Automatic |
| 404 Response | .then() | .catch() |
| 500 Response | .then() | .catch() |
| Network Error | .catch() | .catch() |
| Default Headers | None | Content-Type: application/json |
| Request Cancellation | AbortController | CancelToken |
| Interceptors | ❌ No | ✅ Yes |

---

### 3.1.2 Manual HTTP Error Checking with fetch

**Answer:**

With the `fetch` API, a 404 "Not Found" (or any HTTP error status) does **NOT** automatically trigger the `.catch()` block. The `.catch()` only fires for network failures.

**Why This Happens:**
- `fetch()` only rejects the promise on network failure
- HTTP error responses (4xx, 5xx) are considered "successful" fetches
- You received a response from the server, just not a successful one

**How to Manually Check:**

**Method 1: Check `response.ok`**
```javascript
fetch('https://api.example.com/users/999')
  .then(response => {
    if (!response.ok) { // false for any status >= 400
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Caught:', error));
```

**Method 2: Check `response.status`**
```javascript
fetch('https://api.example.com/users/999')
  .then(response => {
    if (response.status >= 400) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
  })
  .catch(error => console.error(error));
```

**Method 3: Detailed Status Checking**
```javascript
fetch('https://api.example.com/users/999')
  .then(response => {
    switch (response.status) {
      case 200:
        return response.json();
      case 404:
        throw new Error('User not found');
      case 500:
        throw new Error('Server error');
      default:
        throw new Error(`Unexpected status: ${response.status}`);
    }
  })
  .catch(error => console.error(error));
```

**Complete Pattern with async/await:**
```javascript
async function fetchUser(id) {
  try {
    const response = await fetch(`https://api.example.com/users/${id}`);
    
    // Manual error checking
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; // Re-throw to caller
  }
}
```

**What Gets Caught:**

```javascript
// ✅ Catches network errors only
fetch('https://invalid-domain-xyz.com/data')
  .catch(error => {
    // This WILL execute (network failure)
  });

// ❌ Does NOT catch HTTP errors
fetch('https://api.example.com/404-page')
  .catch(error => {
    // This will NOT execute (HTTP 404 is a "successful" fetch)
  });

// ✅ Catches HTTP errors with manual check
fetch('https://api.example.com/404-page')
  .then(response => {
    if (!response.ok) throw new Error('Not found');
  })
  .catch(error => {
    // This WILL execute (manual throw)
  });
```

---

## Section 4: Architecting Forms

### 4.2.1-4 Controlled vs Uncontrolled Components

**4.2.1: Single Source of Truth - Controlled Component**

**Answer:** React state

```javascript
function ControlledInput() {
  const [value, setValue] = useState('');
  
  // React state is the ONLY source of truth
  return (
    <input 
      value={value}              // ← Value comes from state
      onChange={(e) => setValue(e.target.value)} 
    />
  );
}
```

---

**4.2.2: Single Source of Truth - Uncontrolled Component**

**Answer:** The DOM

```javascript
function UncontrolledInput() {
  const inputRef = useRef();
  
  // DOM is the source of truth
  const handleSubmit = () => {
    console.log(inputRef.current.value); // ← Read from DOM
  };
  
  return <input ref={inputRef} />;
}
```

---

**4.2.3: Modern Way to Get Uncontrolled Form Values**

**Answer:** FormData API (NOT useRef for every field)

```javascript
function ModernUncontrolledForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // ✅ Modern approach: FormData API
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);
    
    console.log(values);
    // { email: '...', password: '...' }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" />      {/* ← name attribute! */}
      <input name="password" />
      <button type="submit">Submit</button>
    </form>
  );
}

// ❌ OLD WAY (don't do this):
function OldWayWithRefs() {
  const emailRef = useRef();
  const passwordRef = useRef();
  // ... too many refs for large forms!
}
```

**Why FormData is Better:**
- No need for multiple refs
- Automatically gathers all named inputs
- Handles file uploads
- Native browser API
- Cleaner code

---

**4.2.4: One Pro and One Con of Controlled Components**

**Answer:**

**PRO: Real-time Validation and Logic**
```javascript
function ControlledForm() {
  const [email, setEmail] = useState('');
  
  const handleChange = (e) => {
    const value = e.target.value;
    // ✅ Can validate or transform in real-time
    setEmail(value.toLowerCase().trim());
  };
  
  const isValid = email.includes('@');
  
  return (
    <>
      <input value={email} onChange={handleChange} />
      {!isValid && <span>Invalid email</span>}
      <button disabled={!isValid}>Submit</button>
    </>
  );
}
```

**Benefits:**
- Instant feedback
- Disable/enable buttons dynamically
- Format input on the fly (phone numbers, credit cards)
- Conditional rendering based on input

**CON: More Boilerplate Code**
```javascript
// Controlled - verbose for large forms
function ControlledSignup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    // ... 20 more fields
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  // JSX with value and onChange for every input...
}

// Uncontrolled - concise
function UncontrolledSignup() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    // All values in one line!
  };
  
  // JSX just needs name attributes
}
```

**Other Considerations:**

| Aspect | Controlled | Uncontrolled |
|--------|------------|--------------|
| Code | More verbose | More concise |
| Re-renders | Every keystroke | None until submit |
| Validation | Real-time | On submit |
| Complexity | Higher | Lower |
| Best For | Interactive forms | Simple forms |

---

## Section 5: React Router v6

### 5.3.1 Protected Route Pattern

**Answer:**

**Simple Pattern Using Outlet and Navigate:**

```javascript
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const { isAuthenticated } = useAuth(); // Get auth status
  
  // If NOT authenticated → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated → render child routes
  return <Outlet />;
}
```

**Router Setup:**
```javascript
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute />, // ← Wrapper
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'settings',
        element: <Settings />
      }
    ]
  }
]);
```

**How It Works:**

1. **User navigates to `/dashboard`**
2. **ProtectedRoute checks authentication**
   - If `isAuthenticated` is `false`:
     - Returns `<Navigate to="/login" replace />`
     - User redirected to login page
   - If `isAuthenticated` is `true`:
     - Returns `<Outlet />`
     - Outlet renders the matched child route
3. **Child routes render inside Outlet**

**Complete Example:**
```javascript
// AuthContext.jsx
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const isAuthenticated = !!user;
  
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// ProtectedRoute.jsx
function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

// App setup
<AuthProvider>
  <RouterProvider router={router} />
</AuthProvider>
```

---

### 5.3.2 Race Condition with Data Loaders

**Answer:**

**The Race Condition Problem:**

React Router v6.4+ introduced data loaders that fetch data BEFORE rendering routes. This creates a race condition with the simple ProtectedRoute pattern.

**Scenario:**
```javascript
// Route with loader
{
  path: '/dashboard',
  element: <ProtectedRoute />,
  loader: async () => {
    // This runs BEFORE ProtectedRoute checks auth!
    const data = await fetch('/api/user-data');
    return data.json();
  },
  children: [
    {
      index: true,
      element: <Dashboard />
    }
  ]
}
```

**The Race:**
```
1. User navigates to /dashboard
2. Router calls loader function
   ↓ (loader fetches /api/user-data)
3. Loader completes, returns data
4. ProtectedRoute component renders
   ↓ (checks authentication)
5. isAuthenticated is false
6. <Navigate to="/login" />
```

**Problem:**
- Loader ran and fetched data for unauthenticated user
- Wasted API call
- Potential security issue (accessed protected data)
- User sees flash of loading before redirect

**Solutions:**

**Solution 1: Check Auth in Loader**
```javascript
{
  path: '/dashboard',
  loader: async () => {
    const isAuthenticated = checkAuth(); // Check first!
    
    if (!isAuthenticated) {
      throw redirect('/login'); // Redirect early
    }
    
    // Only fetch if authenticated
    const data = await fetch('/api/user-data');
    return data.json();
  },
  element: <Dashboard />
}
```

**Solution 2: Root Loader with Auth Check**
```javascript
{
  path: '/',
  loader: async () => {
    // Load auth state first
    const user = await getCurrentUser();
    return { user };
  },
  element: <Root />,
  children: [
    {
      path: 'dashboard',
      loader: async ({ request }) => {
        // Auth already loaded by parent
        const { user } = await getParentData();
        if (!user) throw redirect('/login');
        
        return fetchDashboardData();
      },
      element: <Dashboard />
    }
  ]
}
```

**Solution 3: Route-level Auth Guard**
```javascript
function requireAuth(loader) {
  return async (...args) => {
    const isAuthenticated = checkAuth();
    if (!isAuthenticated) {
      throw redirect('/login');
    }
    return loader(...args);
  };
}

// Usage
{
  path: '/dashboard',
  loader: requireAuth(async () => {
    return fetchDashboardData();
  })
}
```

**Best Practice:**
```javascript
// ✅ Check auth BEFORE expensive operations
async function dashboardLoader({ request }) {
  // 1. Quick auth check first
  const token = localStorage.getItem('token');
  if (!token) {
    throw redirect('/login');
  }
  
  // 2. Then do expensive operations
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
  ]);
  
  return { user, posts };
}
```

**Why This Matters:**
- Prevents unnecessary API calls
- Better security (no unauthorized data access)
- Better UX (no loading flash before redirect)
- Saves server resources

---

## Section 6: The Context API

### 6.1.1 What is Prop Drilling?

**Answer:**

**Definition:**
Prop drilling is when you pass props through multiple layers of components that don't use the props themselves, just to get the data to a deeply nested component that needs it.

**Example:**
```javascript
// ❌ Prop Drilling Problem
function App() {
  const [user, setUser] = useState({ name: 'Alice', role: 'admin' });
  
  return <Dashboard user={user} />;
}

function Dashboard({ user }) {
  // Dashboard doesn't use user, just passes it down
  return (
    <div>
      <Sidebar user={user} />
    </div>
  );
}

function Sidebar({ user }) {
  // Sidebar doesn't use user either, just passes it down
  return (
    <div>
      <Navigation user={user} />
    </div>
  );
}

function Navigation({ user }) {
  // Navigation doesn't use user, still passing down
  return (
    <div>
      <UserMenu user={user} />
    </div>
  );
}

function UserMenu({ user }) {
  // Finally! This component actually uses it
  return <div>Welcome, {user.name}!</div>;
}
```

**Visual:**
```
App (has user)
 ↓ passes user
Dashboard (doesn't need user)
 ↓ passes user
Sidebar (doesn't need user)
 ↓ passes user
Navigation (doesn't need user)
 ↓ passes user
UserMenu (USES user) ✓
```

**Why It's a Problem:**

1. **Maintenance Nightmare**
   - Change prop name? Update all components in chain
   - Add new prop? Thread it through all layers
   - Remove prop? Remove from all layers

2. **Tight Coupling**
   ```javascript
   // Want to reuse Sidebar elsewhere?
   <Sidebar user={user} /> // Always need user, even if not using it
   ```

3. **Readability**
   ```javascript
   // Hard to understand why components need certain props
   function Sidebar({ user, theme, language, settings, ... }) {
     // Uses none of these, just passing through
   }
   ```

4. **Refactoring Difficulty**
   - Can't easily move components around
   - Each component becomes dependent on parent props
   - Hard to test in isolation

**Solution with Context:**
```javascript
// ✅ Context Solution
const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: 'Alice', role: 'admin' });
  
  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  );
}

function Dashboard() {
  // No props needed!
  return (
    <div>
      <Sidebar />
    </div>
  );
}

function Sidebar() {
  // No props needed!
  return (
    <div>
      <Navigation />
    </div>
  );
}

function Navigation() {
  // No props needed!
  return (
    <div>
      <UserMenu />
    </div>
  );
}

function UserMenu() {
  // Get user directly from context!
  const user = useContext(UserContext);
  return <div>Welcome, {user.name}!</div>;
}
```

**When Prop Drilling is Acceptable:**
- Only 1-2 levels deep
- Component composition is better (see below)
- Small, co-located components

**Alternative: Component Composition (Better than Context)**
```javascript
// ✅ Often better than Context
function App() {
  const [user, setUser] = useState({ name: 'Alice' });
  
  return (
    <Dashboard>
      <UserMenu user={user} /> {/* Pass as children */}
    </Dashboard>
  );
}

function Dashboard({ children }) {
  return (
    <div>
      <Sidebar>
        <Navigation>
          {children} {/* Render directly */}
        </Navigation>
      </Sidebar>
    </div>
  );
}
```

---

### 6.1.2 When Context is a Poor Choice

**Answer:**

**Context is a poor choice for frequently changing state** due to performance issues.

**The Problem:**

When Context value changes, **ALL components that use that context re-render**, even if they only need a small part of the data.

**Example:**
```javascript
// ❌ BAD: Frequently changing state in Context
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState({ name: 'Alice', role: 'admin' });
  const [notifications, setNotifications] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // This updates every mousemove!
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <AppContext.Provider value={{ user, notifications, mousePosition }}>
      {children}
    </AppContext.Provider>
  );
}

// Every component using this context re-renders on EVERY mousemove!
function UserProfile() {
  const { user } = useContext(AppContext);
  console.log('UserProfile rendered'); // Logs on every mousemove!
  return <div>{user.name}</div>;
}

function NotificationBell() {
  const { notifications } = useContext(AppContext);
  console.log('NotificationBell rendered'); // Also logs on every mousemove!
  return <div>{notifications.length}</div>;
}
```

**Performance Impact:**
```
User moves mouse → mousePosition changes → Context value changes
→ AppProvider re-renders
→ UserProfile re-renders (doesn't even use mousePosition!)
→ NotificationBell re-renders (doesn't even use mousePosition!)
→ Every other consumer re-renders
→ 60+ re-renders per second just from mouse movement!
```

**What State Should NOT Be in Context:**

1. **High-frequency updates**
   - Mouse position
   - Scroll position
   - Real-time game state
   - Animation values
   - Form inputs (every keystroke)

2. **Large, frequently updated lists**
   - Live chat messages
   - Real-time stock prices
   - Activity feeds

**Better Alternatives:**

**1. Local State (useState)**
```javascript
// ✅ Keep fast-changing state local
function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // Only this component re-renders
}
```

**2. Multiple Contexts (Separate Concerns)**
```javascript
// ✅ Separate stable and changing data
const UserContext = createContext(); // Rarely changes
const NotificationContext = createContext(); // Changes occasionally

function App() {
  return (
    <UserContext.Provider value={user}>
      <NotificationContext.Provider value={notifications}>
        <Dashboard />
      </NotificationContext.Provider>
    </UserContext.Provider>
  );
}

// Components only re-render when their specific context changes
```

**3. State Management Libraries**
```javascript
// ✅ For complex, frequently changing state
// Use Redux, Zustand, Jotai, or Recoil
import { useSelector } from 'react-redux';

function UserProfile() {
  const user = useSelector(state => state.user);
  // Only re-renders when user changes, not entire state
}
```

**4. Refs for Non-rendering State**
```javascript
// ✅ For values that don't need to trigger renders
function Component() {
  const mousePos = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      // No re-render!
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
}
```

**When Context IS Good:**

| Use Case | Frequency | Example |
|----------|-----------|---------|
| ✅ Theme | Rarely changes | Light/dark mode |
| ✅ Language | Rarely changes | en/es/fr |
| ✅ User auth | Changes on login/logout | User object |
| ✅ App config | Never changes | API URLs, feature flags |
| ❌ Form inputs | Every keystroke | Don't use Context! |
| ❌ Animations | 60 times/second | Don't use Context! |

**Rule of Thumb:**
- Changes less than once per minute? → Context is fine
- Changes multiple times per second? → Don't use Context

---

## Section 7: Custom Hooks

### 7.1.1 Custom Hook Naming Conventions

**Answer:**

**Two Mandatory Naming Conventions:**

**1. Must Start with "use" Prefix**

```javascript
// ✅ CORRECT: Starts with "use"
function useLocalStorage(key, initialValue) { /* ... */ }
function useFetch(url) { /* ... */ }
function useWindowSize() { /* ... */ }
function useDebounce(value, delay) { /* ... */ }

// ❌ INCORRECT: Doesn't start with "use"
function localStorage(key, initialValue) { /* ... */ }
function fetchData(url) { /* ... */ }
function getWindowSize() { /* ... */ }
```

**Why This Matters:**
- **React's Rules of Hooks** enforcer (linter) looks for the "use" prefix
- If it doesn't start with "use", React can't enforce hook rules
- Calling hooks conditionally will not be caught as an error

**Example of Why:**
```javascript
// ❌ This will break but linter won't catch it
function getUser() {
  const [user, setUser] = useState(null); // Hook in regular function!
}

// ✅ Linter catches this
function useUser() {
  const [user, setUser] = useState(null); // Hook in custom hook ✓
}
```

**2. Must Be a Function (Not a Class or Object)**

```javascript
// ✅ CORRECT: Function
function useCounter() {
  const [count, setCount] = useState(0);
  return { count, increment: () => setCount(c => c + 1) };
}

// ❌ INCORRECT: Class
class useCounter { /* ... */ }

// ❌ INCORRECT: Object
const useCounter = {
  count: 0,
  increment: () => {}
};
```

**Additional Best Practices (Strongly Recommended):**

**3. Must Follow Hook Rules Inside**
```javascript
function useCustomHook() {
  // ✅ Hooks at top level
  const [state, setState] = useState();
  useEffect(() => {}, []);
  
  // ❌ Don't put hooks in conditionals
  if (condition) {
    useState(); // WRONG!
  }
  
  // ❌ Don't put hooks in loops
  for (let i = 0; i < 10; i++) {
    useEffect(() => {}, []); // WRONG!
  }
}
```

**4. Return Consistent Value Type**
```javascript
// ✅ Good: Always returns same structure
function useUser() {
  const [user, setUser] = useState(null);
  return { user, setUser }; // Always returns object
}

// ❌ Bad: Returns different types
function useUser() {
  const [user, setUser] = useState(null);
  if (user) return user; // Returns user object
  return null; // Returns null
  // Inconsistent!
}
```

**Summary:**

| Rule | Required | Example |
|------|----------|---------|
| Starts with "use" | ✅ Mandatory | useFetch, useAuth |
| Is a function | ✅ Mandatory | function use...() {} |
| Follows Hook Rules | ✅ Mandatory | No conditional hooks |
| Consistent return | ⚠️ Best Practice | Always same structure |

---

### 7.1.2 Logic Sharing vs State Sharing

**Answer:**

**Key Difference: Custom hooks share LOGIC, not STATE**

**What Gets Shared:**
- The code/logic
- The behavior
- The implementation

**What Does NOT Get Shared:**
- State variables
- Effect instances
- Ref instances

**Example:**

```javascript
// Custom hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// Component A
function ComponentA() {
  const counter = useCounter(0);
  
  return (
    <div>
      <p>Component A: {counter.count}</p>
      <button onClick={counter.increment}>+</button>
    </div>
  );
}

// Component B
function ComponentB() {
  const counter = useCounter(10);
  
  return (
    <div>
      <p>Component B: {counter.count}</p>
      <button onClick={counter.increment}>+</button>
    </div>
  );
}
```

**What Happens:**
```
ComponentA calls useCounter(0)
  → Creates NEW state: count = 0
  → Creates NEW increment function
  → Returns { count: 0, increment, ... }

ComponentB calls useCounter(10)
  → Creates DIFFERENT state: count = 10
  → Creates DIFFERENT increment function
  → Returns { count: 10, increment, ... }

Clicking increment in ComponentA:
  → Only ComponentA's count changes (0 → 1)
  → ComponentB's count stays 10

They are COMPLETELY INDEPENDENT!
```

**Visual Representation:**
```
useCounter Logic (SHARED)
├─ useState logic
├─ increment logic
├─ decrement logic
└─ reset logic

ComponentA Instance (NOT SHARED)
├─ count: 0 ← Independent
├─ increment ← Independent
└─ decrement ← Independent

ComponentB Instance (NOT SHARED)
├─ count: 10 ← Independent
├─ increment ← Independent
└─ decrement ← Independent
```

**Each Call Creates New State:**

```javascript
function App() {
  const counter1 = useCounter(0);   // State: count = 0
  const counter2 = useCounter(5);   // State: count = 5
  const counter3 = useCounter(10);  // State: count = 10
  
  // Three completely independent counters in one component!
  return (
    <>
      <div>{counter1.count}</div> {/* Shows 0 */}
      <div>{counter2.count}</div> {/* Shows 5 */}
      <div>{counter3.count}</div> {/* Shows 10 */}
    </>
  );
}
```

**Contrast with Context (Which DOES Share State):**

```javascript
// ✅ Context: State IS shared
const CounterContext = createContext();

function CounterProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
}

function ComponentA() {
  const { count, setCount } = useContext(CounterContext);
  // SAME count as ComponentB!
}

function ComponentB() {
  const { count, setCount } = useContext(CounterContext);
  // SAME count as ComponentA!
}
```

**Real-World Example:**

```javascript
// Hook shares LOGIC for form handling
function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  return { value, onChange: handleChange };
}

// Component uses hook multiple times
function SignupForm() {
  const username = useFormInput('');    // Independent state
  const email = useFormInput('');       // Independent state
  const password = useFormInput('');    // Independent state
  
  // Each input has its own state!
  return (
    <form>
      <input {...username} />    {/* value and onChange from useFormInput */}
      <input {...email} />       {/* Different value and onChange */}
      <input {...password} />    {/* Different value and onChange */}
    </form>
  );
}
```

**Summary:**

| Aspect | Custom Hooks | Context |
|--------|--------------|---------|
| Code/Logic | ✅ Shared | ❌ Not applicable |
| State Variables | ❌ Independent | ✅ Shared |
| Effect Instances | ❌ Independent | ❌ Not applicable |
| Use Case | Reuse behavior | Share data |
| When to Use | Same logic, different data | Same data, many consumers |

**Rule of Thumb:**
- Want to reuse **logic**? → Custom hook
- Want to share **state**? → Context or props

---

**End of Conceptual Answers**

