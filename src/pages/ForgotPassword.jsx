import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPassword(){
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState(null);
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '') {
      setFormError('Please enter email');
      setTimeout(() => setFormError(null), 12000);
      return;
    }
    try {
    	await sendPasswordResetEmail(auth, email);
    	setFormError('Email Sent! Check your inbox for further instructions');
      }
     catch (err) {
      setFormError('Failed to reset password');
      setTimeout(() => setFormError(null), 12000);
    }
  };

  useEffect(() => {
    document.body.style.backgroundImage = 'url(https://cdn.wallpapersafari.com/5/88/FnDoyH.jpg)';
    document.body.style.backgroundPosition = ' 70% 30%';
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundPosition = '';
    };
  },[]);

	return(
	<div className="d-flex justify-content-center align-content-center mt-5">
      <form onSubmit={handleSubmit} style={{width:'33%'}} 
        className="bg-white rounded-4 mt-5 p-5" >
        <div className="text-center">
          <h4>Password Reset</h4>
        </div>
        {formError && <div className="alert alert-primary" role="alert" 
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
        <button type="submit" className="btn btn-light w-100">
          Reset Password
        </button>
        <div className="d-flex flex-column align-items-start">
        <div class="btn btn-link">
          <Link to="/login">Login</Link>
        </div>
        <button className="btn btn-link">
          <Link to="/signup">Don't have an account? Register</Link>
        </button>
        </div>
      </form>
    </div>

	);
}