# Lab 4: Intermediate React

Implementation of all exercises from React Lab 4 by MSc. Tran Vinh Khiem.

## Setup

```bash
npm install
npm run dev
```

## Sections Implemented

### Section 1: useEffect Hook
- **MouseTracker** - Event listener with cleanup
- Check browser console for mouse coordinates

### Section 2: useRef Hook
- **UncontrolledLogin** - DOM reference example

### Section 3: Data Fetching
- **PostFetcher** - Loading/error/success states

### Section 4: Forms
- **ControlledSignup** - Controlled components

### Section 5: React Router
- Implemented in routing structure
- `/` - Home with router demo
- `/about` - About page
- `/users/:userId` - Dynamic route

### Section 6: Context API
- **ThemeDemo** - Context provider/consumer without prop drilling

### Section 7: Custom Hooks
- **useLocalStorage** - Persistent state hook
- **useFetch** - Data fetching hook

### Section 8: BlogDash Capstone
- `/blogdash` - Login page
- `/dashboard` - Protected posts list
- `/dashboard/post/:id` - Post details

## Routes

- `/` - Main page with all exercises
- `/blogdash` - Login (use any credentials)
- `/dashboard` - Protected dashboard
- `/about` - About page
- `/users/:userId` - User profile

## Features

- All hooks properly implemented
- Mouse tracking works (check console)
- Protected routes with authentication
- Context API without prop drilling
- Custom hooks for reusability
- Clean, simple design focused on functionality

## Deploy

```bash
npm run build
```

Ready for Vercel deployment with included `vercel.json`.
