import useLocalStorage from '../hooks/useLocalStorage';

export default function LocalStorageDemo() {
  const [count, setCount] = useLocalStorage('myCounter', 0);

  return (
    <div>
      <h3>7.2 LocalStorageDemo</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <p>Refresh the page to see persistence</p>
    </div>
  );
}
