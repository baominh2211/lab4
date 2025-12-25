import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { data: post, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={() => navigate('/dashboard')}>Back</button>
      <h1>{post?.title}</h1>
      <p>{post?.body}</p>
      <p>Post ID: {postId}</p>
    </div>
  );
}
