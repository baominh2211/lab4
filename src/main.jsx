import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import App from './App';
import Login from './pages/Login';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import PostDetail from './pages/PostDetail';
import ProtectedRoute from './components/ProtectedRoute';
import RouterLayout from './pages/RouterLayout';
import Home from './pages/Home';
import About from './pages/About';
import UserProfile from './pages/UserProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RouterLayout />,
    children: [
      { index: true, element: <App /> },
      { path: 'about', element: <About /> },
      { path: 'users/:userId', element: <UserProfile /> },
    ],
  },
  {
    path: '/blogdash',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'post/:postId', element: <PostDetail /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
