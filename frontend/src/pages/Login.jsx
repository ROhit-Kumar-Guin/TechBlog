import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';



import Footer from '../components/Footer'
import {UserContext} from '../context/UserContext';

function Login() {
  
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/login" ,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({email: email, password: password})
      })
      if(res.ok){
        const data = await res.json();
        const cookies = res.headers.get('Set-Cookie');
        console.warn('Data',data)
        console.warn('Cookies:', cookies);

        setUser(data);
      }
      else{
        console.error('Request failed with status:', res.status);
      }
      navigate('/');
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
          <Link to="/register">Register</Link>
        </h3>
      </div>

      <div className='w-full flex justify-center items-center h-[80vh]'>
        <div className='flex flex-col justify-center space-y-4 w-[80%] md:w-[25%]'>
          <h2 className='text-xl font-bold text-left'>Login to your Account</h2>
          
          
              
        
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
        
            <button onClick={handleLogin} type='submit' className='w-full hover:bg-gray-500 hover:text-black bg-black text-white py-4 px-4 rounded-lg font-bold'>
              Login
            </button>

            {error && <h3 className='text-red-500'>Something went wrong!</h3>}

        <div className='flex items-center justify-center space-x-3'>
              <p className='text-sm text-gray-500 hover:text-black'>New here</p>
              <p><Link to="/register" className='text-sm font-bold'>Register</Link></p>
        </div>
      </div>
      </div>
      
      {/* Footer component */}
      <Footer />
    </div>
  )
}

export default Login
