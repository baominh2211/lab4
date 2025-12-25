import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function Dashboard() {
  const { data: posts, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts?.slice(0, 10).map(post => (
          <li key={post.id}>
            <Link to={`/dashboard/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
