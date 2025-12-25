import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>About</h2>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
}
