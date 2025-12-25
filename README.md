# React Lab 4: Intermediate React

A comprehensive implementation of all exercises from React Lab 4 by MSc. Tran Vinh Khiem, covering intermediate React concepts including hooks, routing, context, and custom hooks.

## 🎯 Overview

This project implements all sections from the lab document:
- **Section 1**: The useEffect Hook
- **Section 2**: The useRef Hook
- **Section 3**: Data Fetching Strategies
- **Section 4**: Architecting Forms
- **Section 5**: React Router v6
- **Section 6**: The Context API
- **Section 7**: Custom Hooks
- **Section 8**: Capstone Project - BlogDash

## 🚀 Quick Start

### Installation

```bash
cd react-lab4
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
react-lab4/
├── src/
│   ├── components/
│   │   ├── Section1/
│   │   │   └── MouseTracker.jsx          # useEffect with cleanup
│   │   ├── Section2/
│   │   │   └── UncontrolledLogin.jsx     # useRef for DOM access
│   │   ├── Section3/
│   │   │   └── PostFetcher.jsx           # Data fetching with states
│   │   ├── Section4/
│   │   │   └── ControlledSignup.jsx      # Controlled form components
│   │   ├── Section6/
│   │   │   └── ThemeDemo.jsx             # Context API demo
│   │   ├── Section7/
│   │   │   └── LocalStorageDemo.jsx      # Custom hook demo
│   │   ├── BlogDash/                     # Capstone Project
│   │   │   ├── Login.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── PostDetail.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   └── RouterDemo/                   # Router examples
│   │       ├── Home.jsx
│   │       ├── About.jsx
│   │       ├── UserProfile.jsx
│   │       └── RouterLayout.jsx
│   ├── context/
│   │   ├── AuthContext.jsx               # Auth context for BlogDash
│   │   └── ThemeContext.jsx              # Theme context
│   ├── hooks/
│   │   ├── useFetch.js                   # Custom data fetching hook
│   │   └── useLocalStorage.js            # Custom localStorage hook
│   ├── App.jsx                           # Main component
│   ├── App.css                           # Styles
│   └── main.jsx                          # Entry point with router
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎓 Features by Section

### Section 1: useEffect Hook

**MouseTracker Component** (`/src/components/Section1/MouseTracker.jsx`)
- ✅ Demonstrates useEffect lifecycle (setup and cleanup)
- ✅ Adds mousemove event listener on mount
- ✅ Logs mouse coordinates to console
- ✅ Properly removes listener on unmount (cleanup function)
- ✅ Prevents memory leaks

**Key Concepts:**
- Effect lifecycle vs class component lifecycle
- Dependency arrays (empty array for mount-only effects)
- Cleanup functions
- React Strict Mode behavior

### Section 2: useRef Hook

**UncontrolledLogin Component** (`/src/components/Section2/UncontrolledLogin.jsx`)
- ✅ Uses useRef to create DOM reference
- ✅ Accesses input value via ref.current.value
- ✅ Demonstrates uncontrolled component pattern
- ✅ Shows form submission without state

**Key Concepts:**
- useRef vs useState differences
- DOM references
- Uncontrolled components
- When to use refs over state

### Section 3: Data Fetching

**PostFetcher Component** (`/src/components/Section3/PostFetcher.jsx`)
- ✅ Implements full loading/error/success states
- ✅ Uses fetch API with proper error handling
- ✅ Manual HTTP error checking (fetch doesn't auto-reject on 404)
- ✅ Conditional rendering based on state
- ✅ Clean try-catch-finally pattern

**Key Concepts:**
- fetch vs axios differences
- State management for async operations
- Error handling strategies
- Loading indicators

### Section 4: Forms

**ControlledSignup Component** (`/src/components/Section4/ControlledSignup.jsx`)
- ✅ Single state object for multiple inputs
- ✅ Dynamic handleChange using event.target.name
- ✅ React state as single source of truth
- ✅ Real-time state display for debugging
- ✅ Form validation and submission

**Key Concepts:**
- Controlled vs uncontrolled components
- Single source of truth
- Dynamic form handlers
- FormData API (modern approach)

### Section 5: React Router v6

**Router Demo** (`/router-demo`)
- ✅ Basic setup with createBrowserRouter
- ✅ Navigation using Link components
- ✅ Programmatic navigation with useNavigate
- ✅ Nested routes with Outlet
- ✅ Dynamic routes with useParams
- ✅ Layout components

**Routes:**
- `/router-demo` - Home page with navigation
- `/router-demo/about` - About page with useNavigate
- `/router-demo/users/:userId` - Dynamic user profile

### Section 6: Context API

**ThemeDemo Component** (`/src/components/Section6/ThemeDemo.jsx`)
- ✅ Creates ThemeContext with createContext
- ✅ Provides theme state with Provider
- ✅ Deeply nested component consumes context
- ✅ No prop drilling required
- ✅ Theme toggle functionality
- ✅ Visual demonstration of context flow

**Key Concepts:**
- Solving prop drilling
- Context creation and provision
- useContext hook
- When NOT to use Context (performance)

### Section 7: Custom Hooks

**useLocalStorage Hook** (`/src/hooks/useLocalStorage.js`)
- ✅ Custom hook naming convention (use* prefix)
- ✅ Syncs state with localStorage
- ✅ Lazy initialization from localStorage
- ✅ Error handling for localStorage access
- ✅ Same API as useState
- ✅ Reusable across components

**useFetch Hook** (`/src/hooks/useFetch.js`)
- ✅ Manages data, loading, error states
- ✅ Automatic re-fetching on URL change
- ✅ Reusable data fetching logic
- ✅ Clean separation of concerns

**Key Concepts:**
- Custom hook rules and conventions
- Logic sharing vs state sharing
- Composition patterns
- Hook reusability

### Section 8: Capstone - BlogDash

**Complete Blog Dashboard Application** (`/blogdash`)

A fully functional blog dashboard demonstrating integration of all concepts:

#### Features:
1. **Authentication System**
   - Login page with auto-focused input (useRef + useEffect)
   - AuthContext for global auth state
   - Protected routes wrapper

2. **Routing Structure**
   - `/blogdash` - Login page
   - `/dashboard` - Protected main dashboard
   - `/dashboard/post/:postId` - Dynamic post detail

3. **Data Fetching**
   - Custom useFetch hook
   - Loading, error, and success states
   - JSONPlaceholder API integration
   - Post list and individual post views

4. **Protected Routes**
   - ProtectedRoute component using Outlet
   - Navigate redirect for unauthorized access
   - Auth context integration

5. **Layout & Navigation**
   - Nested routes with shared layout
   - Navigation bar with logout
   - Responsive design

**How to Use:**
1. Go to `/blogdash`
2. Enter any username (demo - no real auth)
3. View list of blog posts
4. Click any post to see details
5. Navigate using dynamic routes
6. Logout to return to login

## 🔑 Key Answers to Conceptual Questions

### 1.1 useEffect Lifecycle
- **Purpose**: Synchronize components with external systems (APIs, DOM, subscriptions)
- **Lifecycle**: Start synchronizing (setup) → Stop synchronizing (cleanup)
- **Differs from class components**: Think in terms of synchronization, not lifecycle events

### 1.2 Dependency Arrays
- **Scenario A** (mount once): `[]` empty array
- **Scenario B** (every render): No second argument (not recommended)
- **Scenario C** (when userId changes): `[userId]`

### 2.2 useRef vs useState
- **Differences**: 
  - useRef doesn't trigger re-renders
  - useRef updates are synchronous
  - useState updates are asynchronous and trigger re-renders
- **setInterval ID**: Use useRef (no need to re-render when ID changes)
- **Cardinal rule**: Use useState if data is used for rendering, useRef otherwise

### 3.1 fetch vs axios
- **JSON parsing**: fetch requires manual `.json()`, axios auto-parses
- **Error handling**: fetch only rejects on network errors, axios rejects on HTTP errors
- **404 with fetch**: Must manually check `response.ok` or `response.status`

### 4.2 Controlled vs Uncontrolled
- **Controlled source of truth**: React state
- **Uncontrolled source of truth**: The DOM
- **Modern uncontrolled approach**: FormData API (not just useRef)
- **Pros/Cons**: 
  - Pro: Real-time validation, complex logic
  - Con: More code, potential performance issues

### 5.3 Protected Routes
- **Pattern**: Check auth → render `<Outlet />` or `<Navigate />`
- **Race condition**: Data loaders may run before auth check completes

### 6.1 Prop Drilling
- **Problem**: Passing props through many intermediate components
- **Poor choice**: Frequently changing state (performance issues)

### 7.1 Custom Hooks
- **Naming**: Must start with "use" prefix
- **State sharing**: NO - each call gets independent state
- **Logic sharing**: YES - the logic is shared, not the state

## 🎨 Design Patterns Used

1. **Compound Components**: Layout with Outlet for nested routes
2. **Custom Hooks**: Reusable logic (useFetch, useLocalStorage)
3. **Context + Hooks**: Global state management
4. **Higher-Order Components**: ProtectedRoute wrapper
5. **Controlled Components**: Form state management
6. **Conditional Rendering**: Loading/error/success states

## 🛠️ Technologies

- **React 18.2** - Latest React with Concurrent Features
- **React Router 6.20** - Client-side routing
- **Vite 5** - Fast build tool and dev server
- **JSONPlaceholder** - Fake REST API for demos

## 📝 Notes

- All components follow React best practices
- Proper cleanup in useEffect hooks
- Error boundaries could be added for production
- Accessibility features included where applicable
- Comments explain key concepts inline

## 🎯 Learning Outcomes

After completing this lab, you should understand:
- ✅ useEffect lifecycle and cleanup
- ✅ useRef for DOM access and mutable values
- ✅ Data fetching patterns and state management
- ✅ Controlled vs uncontrolled forms
- ✅ React Router v6 routing patterns
- ✅ Context API for state management
- ✅ Creating custom hooks
- ✅ Integrating multiple concepts in a real application

## 🚀 Routes Reference

- `/` - Main exercises showcase
- `/blogdash` - Capstone project login
- `/dashboard` - Protected dashboard (requires login)
- `/dashboard/post/:postId` - Individual post view
- `/router-demo` - Router basics demo
- `/router-demo/about` - About page
- `/router-demo/users/:userId` - Dynamic user profile

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)

## 👨‍🏫 Credits

Lab designed by **MSc. Tran Vinh Khiem**
Implementation follows all requirements from the lab document.

---

**Happy Learning! 🎓**
