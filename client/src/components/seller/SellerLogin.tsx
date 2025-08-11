import React from 'react'
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/useAppContext"
import toast from 'react-hot-toast';

const SellerLogin = () => {
  const {isSeller, setIsSeller, navigate, axios} = useAppContext();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { data } = await axios.post('/api/seller/login', {email, password});
      if(data.success) {
        setIsSeller(true);
        navigate('/seller');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    if(isSeller) {
      navigate('/seller');
    }
  }, [isSeller, navigate]);

  return !isSeller && (
    <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>
      <div className='flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200 bg-white'>
        <p className='text-2xl font-medium m-auto'><span className='text-primary'>Seller</span> Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input 
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email" placeholder='Enter your email' required
            className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
          />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input 
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password" placeholder='Enter your password' required
            className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
          />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md cursor-pointer'>Login</button>
      </div>
    </form>
  )
}

export default SellerLogin
