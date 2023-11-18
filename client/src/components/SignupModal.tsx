import React, { useState } from 'react';
import { signup } from '../services/auth.service';
import { Button } from 'react-daisyui';

const SignupModal = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    console.log('Signing in with:', { email, password });
    try {
      const res = await signup(email, password);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className="bg-white p-8 rounded-md z-20">
            <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="userName"
            className="mt-1 p-2 w-full border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border rounded-md"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
          <Button color="primary" onClick={handleSignup} >Signup</Button>
        </div>
      </div>
  );
};

export default SignupModal;
