import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.css";



export const Login = (props) => {
   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');

   const handlesubmit =(e) => {
    e.preventDefault();
    console.log(email);
   }
   return (
    <div className="auth-form-container">
       <form className ="login-form"onSubmit={handlesubmit}>
      <label htmlFor="email">email</label>
      <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"></input >
      <label htmlFor="password">password</label>
      <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="******" id="password" name="password"></input>
       <button type="submit">Log In</button>
      </form>
      <button className="btn-login"onClick={() => props.onFormSwitch('Register')}>Don't have an account? Register</button>
    </div>
   );
}   