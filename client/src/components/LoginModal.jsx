import React, { useState } from 'react';
import { login } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const LoginModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await login(email, password);
      const { user, token } = res;
      localStorage.setItem('access-token', token);
      if (user.type === 'customer') navigate('/customer/home');
      else navigate('/restaurant/info');
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-md z-20 flex flex-col items-center">
        <div className="mb-4 w-full">
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
        <div className="mb-4 w-full">
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
          <button className='btn btn-primary' type="submit">Login</button>
        </div>
      </form>
  );
};

export default LoginModal;
