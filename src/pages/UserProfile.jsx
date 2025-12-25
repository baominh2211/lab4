import { useParams } from 'react-router-dom';

export default function UserProfile() {
  const { userId } = useParams();

  return (
    <div>
      <h1>Profile for User: {userId}</h1>
    </div>
  );
}
