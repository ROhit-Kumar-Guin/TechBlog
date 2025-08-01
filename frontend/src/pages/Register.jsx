import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {URL} from '../url';

import Footer from '../components/Footer'

function Register() {

  const [username, setUsername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState(false);
  const navigate = useNavigate();


  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", {
        username,
        email,
        password
      });
      setUsername(res.data.username);
      setemail(res.data.email);
      setpassword(res.data.password);
      seterror(false);
      navigate('/login');
    } catch (err) {
      seterror(true);
      console.log(err);
    }
  }

  return (
    <div>
      <div className='flex items-center justify-between px-6 md:px-[200px] py-4'>
        <h1 className='text-lg md:text-xl font-extrabold'>
          <Link to="/">TechBlog</Link>
        </h1>
        <h3>
          <Link to="/login">Login</Link>
        </h3>
      </div>

      <div className='w-full flex justify-center items-center h-[80vh]'>
        <div className='flex flex-col justify-center space-y-4 w-[80%] md:w-[25%]'>
          <h2 className='text-xl font-bold text-left'>Create an Account</h2>
          
          
              <input
                type='text'
                placeholder='Enter your username'
                onChange={(e) => setUsername(e.target.value)}
                className='w-full px-4 py-2 border-black outline-0 '
              />
        
              <input
                type='email'
                placeholder='Enter your email'
                onChange={(e) => setemail(e.target.value)}
                className='w-full px-4 py-2 border-black outline-0 '
              />
        
              <input
                type='password'
                placeholder='Enter your password'
                onChange={(e) => setpassword(e.target.value)}
                className='w-full px-4 py-2 border-black outline-0 '
              />
        
            <button onClick={handleRegister} type='submit' className='w-full hover:bg-gray-500 hover:text-black bg-black text-white py-4 px-4 rounded-lg font-bold'>
              Register
            </button>

            {error && <h3 className='text-red-500'>Something went wrong!</h3>}

        <div className='flex items-center justify-center space-x-3'>
              <p className='text-sm text-gray-500 hover:text-black'>Already have an account?</p>
              <p><Link to="/login" className='text-sm font-bold'>Login</Link></p>
        </div>
      </div>
      </div>
      
      {/* Footer component */}
      <Footer />
    </div>
     
  )
}

export default Register
