import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Main App
import App from './App';

// BlogDash Capstone (Section 8)
import Login from './components/BlogDash/Login';
import Layout from './components/BlogDash/Layout';
import Dashboard from './components/BlogDash/Dashboard';
import PostDetail from './components/BlogDash/PostDetail';
import ProtectedRoute from './components/BlogDash/ProtectedRoute';

// Router Demo (Section 5)
import RouterLayout from './components/RouterDemo/RouterLayout';
import Home from './components/RouterDemo/Home';
import About from './components/RouterDemo/About';
import UserProfile from './components/RouterDemo/UserProfile';

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  // BlogDash Capstone Project Routes
  {
    path: '/blogdash',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'post/:postId',
            element: <PostDetail />,
          },
        ],
      },
    ],
  },
  // Router Demo Routes (Section 5)
  {
    path: '/router-demo',
    element: <RouterLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'users/:userId',
        element: <UserProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
