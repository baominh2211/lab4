import { useRef } from 'react';

export default function UncontrolledLogin() {
  const usernameRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Username: ${usernameRef.current.value}`);
  };

  return (
    <div>
      <h3>2.1 UncontrolledLogin</h3>
      <form onSubmit={handleSubmit}>
        <input ref={usernameRef} type="text" placeholder="Username" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
