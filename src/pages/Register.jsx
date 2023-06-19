import { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [formError, setFormError] = useState('');
  const [signUpErr, setSignUpErr] = useState('');
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const { dispatch } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || password === '' || displayName === '') {
      setFormError('A required field is missing');
      setTimeout(() => setFormError(null), 3000);
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      const update = await updateProfile({ displayName });
      if (res) {
        dispatch({ type: 'LOGIN', payload: res.user });
      }
      if (update) {
        setDisplayName('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setSignUpErr(error.message);
    }
  };

  return (
    <div className="auth-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name"> Name </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="name"
          placeholder="Your Name"
          className="form-control"
          id="exampleFormControlInput1"
        />
        <label htmlFor="email"> Email </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          name="email"
          className="form-control"
          id="exampleFormControlInput1"
        />
        <label htmlFor="password"> Password </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="******"
          id="password"
          name="password"
          className="form-control"
        />
        <label htmlFor="username"> Username </label>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          type="password"
          placeholder="******"
          id="displayName"
          name="displayName"
          className="form-control"
        />
        <button type="submit" className="btn btn-light">
          {' '}
          Create an account{' '}
        </button>
      </form>
      <button className="btn btn-link">
        <Link to="/login"> Already have an account? Login </Link>
      </button>
    </div>
  );
};
