import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useAuth from '../hooks/useAuth';



 
export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(null);
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    passElement.placeholder = ' ';
    passElement.type ='email';
  };

  const passElement = useRef();

 
  const [signInWithEmailAndPassword, user, error] =
    useSignInWithEmailAndPassword(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setFormError('A required field is missing');
      setTimeout(() => setFormError(null), 12000);
      return;
    }
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res) {
        setEmail('');
        setPassword('');
        navigate.push('/home');
       
      }
      dispatch({ type: 'LOGIN', payload: res.user });
    } catch (err) {
      setFormError('Password or email is incorrect');
      setTimeout(() => setFormError(null), 12000);
    }
  };

  

  useEffect(() => {
    document.body.style.backgroundImage = 'url(https://cdn.wallpapersafari.com/5/88/FnDoyH.jpg)';
    document.body.style.backgroundPosition = '70% 30%';
    document.body.style.backgroundRepeat = 'no-repeat'; 
    document.body.style.backgroundSize = 'cover';
    document.body.style.height = '100vh';
  
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundSize = '';
  
      
    };
  },[]);

  return (
    <div className="d-flex justify-content-center align-content-center mt-5">
      <form onSubmit={handleSubmit} style={{width:'33%'}} 
        className="bg-white rounded-4 mt-5 p-5" >
        <div className="text-center">
          <h4>Account Login</h4>
        </div>
        {formError && <div className="alert alert-danger" role="alert" 
        style={{padding: "5px",margin: "5px"}}> {formError} </div>}
        <div className="form-group">
          <label htmlFor="email"> Email </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            className="form-control"
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"> Password </label>
          <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
         
          placeholder="******"
          className="form-control"
          name="password"
          type={showPassword ? 'text' : 'password'}
          ref={passElement}
        />
        <div>
        <label>
        Show Password:
        <input type="checkbox" checked={showPassword} onChange={toggleShowPassword} />
      </label>
        </div>
        </div>
        <button type="submit" className="btn btn-light w-100 ">
          Log In
        </button>
        <div className="d-flex flex-column align-items-start">
        <div class="btn btn-link">
          <Link to="/forgot-password">Forgot Password? </Link>
        </div>
        <button className="btn btn-link">
          <Link to="/signup">Don't have an account? Register</Link>
        </button>
        </div>
      </form>
    </div>
  );
};
