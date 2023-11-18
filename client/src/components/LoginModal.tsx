import React, { useState } from 'react';
import { login } from '../services/auth.service';
import { Button } from 'react-daisyui';

const LoginModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('Logging in with:', { email, password });
    try {
      const res = await login(email, password);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className="bg-white p-8 rounded-md z-20">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Button color="primary" onClick={handleLogin} >Login</Button>
        </div>
      </div>
  );
};

export default LoginModal;
