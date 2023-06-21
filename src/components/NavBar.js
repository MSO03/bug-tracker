import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseConfig';

export default function Navbar() {
  const { user, dispatch } = useAuth();

  const [signOut, loading, error] = useSignOut(auth);

  const handleClick = async () => {
    const signedout = await signOut();
    if (signedout) {
      dispatch({ type: 'LOGOUT' });
    }
  };

  return (
    <nav className="navbar navbar-light" style={{backgroundColor: '#90EE90'}}>
      <Link to="/" className="navbar-brand">
        <img src={require("../assets/logo.png")} alt="" width="30" height="30" className="d-inline-block align-top"/>
        Bugg Trackerr
      </Link>
      <div className="navbar-nav flex-sm-row ">
        <Link to="/home" className="nav-item nav-link active mx-3"> Home </Link>
          <Link to="/signup" className="nav-item nav-link active mx-3 "> Register </Link>
          {user ? <Link onClick={handleClick} className="nav-item nav-link active mx-3"> Logout </Link> : null} 
          <a href= "https://github.com/MSO03/bugTracker" target="_blank" className="navbar-brand">
            <img src={require("../assets/gitHubLogo.png")}
            width="30" height="30" className="d-inline-block align-top"/>
          </a>
        </div>
    </nav>  
  );
}



