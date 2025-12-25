import { Outlet, Link } from 'react-router-dom';

export default function RouterLayout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Outlet />
    </div>
  );
}
