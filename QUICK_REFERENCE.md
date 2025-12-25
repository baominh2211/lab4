# Quick Reference Card - React Lab 4

## 🚀 Common Commands

```bash
# Development
npm install          # Install dependencies
npm run dev         # Start dev server (http://localhost:5173)
npm run build       # Build for production
npm run preview     # Preview production build

# Deployment
vercel              # Deploy to Vercel
vercel --prod       # Deploy to production
```

## 🗺️ Routes Map

### Main Application
| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | App | All exercises showcase |

### BlogDash Capstone
| Route | Component | Auth Required | Purpose |
|-------|-----------|---------------|---------|
| `/blogdash` | Login | ❌ | Login page |
| `/dashboard` | Dashboard | ✅ | Posts list |
| `/dashboard/post/:id` | PostDetail | ✅ | Single post view |

### Router Demo
| Route | Component | Purpose |
|-------|-----------|---------|
| `/router-demo` | Home | Router examples home |
| `/router-demo/about` | About | useNavigate demo |
| `/router-demo/users/:id` | UserProfile | Dynamic route demo |

## 📦 Components Map

### Section 1: useEffect
```
MouseTracker
└─ Logs mouse coordinates
└─ Demonstrates cleanup
```

### Section 2: useRef
```
UncontrolledLogin
└─ DOM reference
└─ Uncontrolled form
```

### Section 3: Data Fetching
```
PostFetcher
└─ Loading state
└─ Error handling
└─ Success display
```

### Section 4: Forms
```
ControlledSignup
└─ Controlled inputs
└─ Single state object
└─ Dynamic handler
```

### Section 6: Context
```
ThemeDemo
├─ ThemeContext.Provider
└─ ThemedButton (consumer)
    └─ No prop drilling
```

### Section 7: Custom Hooks
```
LocalStorageDemo
└─ useLocalStorage hook
    ├─ Persistent counter
    └─ Persistent input
```

### Section 8: BlogDash
```
BlogDash
├─ AuthContext
├─ Login (useRef auto-focus)
├─ ProtectedRoute
├─ Layout (Outlet)
├─ Dashboard (useFetch)
└─ PostDetail (useParams)
```

## 🔧 Custom Hooks

```javascript
// useFetch(url)
const { data, loading, error } = useFetch(url);

// useLocalStorage(key, initialValue)
const [value, setValue] = useLocalStorage('key', defaultValue);
```

## 🎨 Context Usage

```javascript
// AuthContext
const { isAuthenticated, login, logout } = useAuth();

// ThemeContext
const theme = useContext(ThemeContext);
```

## 🛣️ Router Hooks

```javascript
// Navigate programmatically
const navigate = useNavigate();
navigate('/path');

// Get URL params
const { paramName } = useParams();

// Create links
<Link to="/path">Text</Link>
```

## 📁 File Structure Quick Ref

```
react-lab4/
├── src/
│   ├── components/
│   │   ├── Section1/MouseTracker.jsx
│   │   ├── Section2/UncontrolledLogin.jsx
│   │   ├── Section3/PostFetcher.jsx
│   │   ├── Section4/ControlledSignup.jsx
│   │   ├── Section6/ThemeDemo.jsx
│   │   ├── Section7/LocalStorageDemo.jsx
│   │   ├── BlogDash/
│   │   │   ├── Login.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── PostDetail.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   └── RouterDemo/
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   ├── useFetch.js
│   │   └── useLocalStorage.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

## 🎯 Key Concepts Checklist

- [x] useEffect with cleanup
- [x] useRef for DOM access
- [x] useState for controlled forms
- [x] Data fetching with loading/error states
- [x] React Router v6 (nested, dynamic routes)
- [x] Context API (no prop drilling)
- [x] Custom hooks (reusable logic)
- [x] Protected routes pattern
- [x] useParams for dynamic routes
- [x] useNavigate for programmatic navigation
- [x] Outlet for nested routes

## 💡 Quick Tips

**useEffect Deps:**
- `[]` - Run once on mount
- `[dep]` - Run when dep changes
- No array - Run every render

**useRef vs useState:**
- Render needed? → useState
- No render needed? → useRef

**Controlled vs Uncontrolled:**
- Need validation? → Controlled
- Simple form? → Uncontrolled

**Context or Props?**
- Changes rarely? → Context
- Changes frequently? → Props or state management

## 🐛 Common Issues

**Issue:** Routes 404 in production
**Fix:** Add vercel.json with rewrites

**Issue:** Component not re-rendering
**Fix:** Use useState, not useRef

**Issue:** Memory leak warning
**Fix:** Add cleanup in useEffect

**Issue:** Can't access protected route
**Fix:** Login first at /blogdash

## 📞 Need Help?

- README.md - Full documentation
- ANSWERS.md - Conceptual questions
- GETTING_STARTED.md - Setup guide
- DEPLOYMENT.md - Deploy guide
- BUILD_ERROR_FIX.md - Build issues

---

**Quick Start:** `npm install && npm run dev`
