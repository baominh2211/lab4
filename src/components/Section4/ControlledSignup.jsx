import { useState } from 'react';

export default function ControlledSignup() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  // Single handler for all inputs using name attribute
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value  // Dynamically update the correct key
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert(`Email: ${formData.email}\nPassword: ${formData.password}`);
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #9b59b6', borderRadius: '8px', margin: '20px 0' }}>
      <h3>✍️ Controlled Signup Form</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #bdc3c7' }}
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #bdc3c7' }}
          required
        />
        <button 
          type="submit"
          style={{ 
            padding: '10px', 
            backgroundColor: '#9b59b6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Sign Up
        </button>
      </form>
      <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <small><strong>Current State:</strong></small>
        <pre style={{ fontSize: '0.8rem' }}>{JSON.stringify(formData, null, 2)}</pre>
      </div>
      <small style={{ color: '#7f8c8d', marginTop: '10px', display: 'block' }}>
        React state is the single source of truth for input values.
      </small>
    </div>
  );
}
