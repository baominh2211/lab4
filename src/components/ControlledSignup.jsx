import { useState } from 'react';

export default function ControlledSignup() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert(`Email: ${formData.email}\nPassword: ${formData.password}`);
  };

  return (
    <div>
      <h3>4.1 ControlledSignup</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}
