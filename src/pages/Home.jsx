import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h2>Home</h2>
      <Link to="/about">Go to About</Link>
      <br />
      <Link to="/users/123">View User 123</Link>
    </div>
  );
}
