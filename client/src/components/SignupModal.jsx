import React, { useState } from 'react';
import { signup } from '../services/auth.service';

const SignupModal = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(email, password);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSignup} className="bg-white p-8 rounded-md z-20 flex flex-col items-center">
      <div className="mb-4 w-full">
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
      <div className="mb-4 w-full">
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
        <button className='btn btn-primary' type="submit" >Sign Up</button>
      </div>
    </form>
  );
};

export default SignupModal;
