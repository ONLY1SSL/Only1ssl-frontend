// src/components/Login.js
import axios from 'axios';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem('token', token); // Save token for future use
      setMessage(`✅ Welcome, ${user.username}`);
    } catch (err) {
      console.error(err);
      setMessage('❌ Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ display: 'block', margin: '10px 0' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', margin: '10px 0' }}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
}

export default Login;
