# 🚀 Quick Start Guide - React Lab 4

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn

## Installation Steps

### 1. Navigate to Project Directory
```bash
cd react-lab4
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 📍 Available Routes

### Main Application Routes
- **`/`** - Main showcase with all Section exercises (1-7)
  - Toggle between sections using navigation buttons
  - See all exercises at once with "All Exercises" option

### BlogDash Capstone Project
- **`/blogdash`** - Login page
  - Enter any username to login (demo mode)
  - Auto-focused input demonstrates useRef + useEffect
  
- **`/dashboard`** - Protected main dashboard
  - Requires login
  - Shows list of blog posts from JSONPlaceholder API
  - Click any post to view details
  
- **`/dashboard/post/:postId`** - Individual post page
  - Dynamic route using useParams
  - Fetches specific post data
  - Back button navigation

### Router Demo (Section 5 Examples)
- **`/router-demo`** - Home page with Link navigation
- **`/router-demo/about`** - About page with useNavigate
- **`/router-demo/users/:userId`** - Dynamic user profile page

## 🎯 What Each Section Demonstrates

### Section 1: useEffect Hook
**MouseTracker Component**
- Event listener setup and cleanup
- Preventing memory leaks
- Console logging (check browser console when moving mouse)

### Section 2: useRef Hook
**UncontrolledLogin Component**
- DOM reference with useRef
- Accessing input values without state
- Form submission handling

### Section 3: Data Fetching
**PostFetcher Component**
- Loading states
- Error handling
- Success state with data display
- Fetches from JSONPlaceholder API

### Section 4: Forms
**ControlledSignup Component**
- Controlled inputs
- Single state object for multiple inputs
- Dynamic handleChange with event.target.name
- Real-time state display

### Section 6: Context API
**ThemeDemo Component**
- Context creation and provision
- Deeply nested component consuming context
- No prop drilling
- Theme toggle functionality

### Section 7: Custom Hooks
**LocalStorageDemo Component**
- useLocalStorage custom hook
- Persistent counter across page refreshes
- Persistent name input
- Check localStorage in browser DevTools

## 🔧 Useful Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Important Files

- **`src/App.jsx`** - Main application component
- **`src/main.jsx`** - Router configuration
- **`src/hooks/`** - Custom hooks (useFetch, useLocalStorage)
- **`src/context/`** - Context providers (AuthContext, ThemeContext)
- **`src/components/BlogDash/`** - Capstone project components
- **`README.md`** - Comprehensive documentation
- **`ANSWERS.md`** - Detailed answers to all conceptual questions

## 💡 Tips

1. **Check the Console**: MouseTracker logs mouse coordinates to console
2. **Test Persistence**: LocalStorageDemo values persist after page refresh
3. **Try Different Routes**: Navigate between routes to see React Router in action
4. **BlogDash Login**: Any username works - it's a demo
5. **Inspect State**: Form components show current state in real-time

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
# Kill the process using the port
# macOS/Linux:
lsof -ti:5173 | xargs kill -9

# Or specify a different port
npm run dev -- --port 3000
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Build Errors
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Rebuild
npm run build
```

## 📚 Next Steps

1. Explore each section's implementation in `src/components/`
2. Read `ANSWERS.md` for detailed explanations of concepts
3. Modify components to experiment with different patterns
4. Try building your own custom hooks
5. Extend the BlogDash project with new features

## ✨ Features to Try

- Move your mouse around to see MouseTracker in action
- Submit the uncontrolled form and see the alert
- Watch the PostFetcher loading states
- Type in the controlled form and see state update in real-time
- Toggle the theme in ThemeDemo
- Increment the persistent counter and refresh the page
- Login to BlogDash and explore the posts
- Navigate between different routes

Enjoy learning React! 🎓
