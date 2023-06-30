import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { Link } from 'react-router-dom';
import './LandingPage.css';


export default function LandingPage() {


  return (
    <>
    <div id="home" className="d-flex align-content-center justify-content-center">
      <div className="d-flex align-content-center justify-content-center">
        <h1>The Bugg Trackerr</h1>
        <img src={require("../assets/logo.png")} alt="" width="50" height="50" />
      </div>
      <div className="d-flex align-content-center justify-content-center">
        <p style={{fontSize:'21px'}}>Empowering Bug-Free Journeys!</p>
      </div>
      <div className="d-flex align-content-center justify-content-center">
          <Link className="btn btn-primary" to="/login">Login</Link>
      </div>
      <div className="d-flex align-content-center justify-content-center">
        <div className="down-arrow"></div>
      </div>
    </div>
    
      
    </>
  
  );
};
