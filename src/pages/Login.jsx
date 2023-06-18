import React, {useState} from "react";

export const Login = (props) => {
   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');

   const handlesubmit =(e) => {
    e.preventDefault();
    console.log(email);
   }

   return (
    <div className="auth-form-container">
      <form className ="login-form" onSubmit={handlesubmit}>
         <label htmlFor="email"> Email </label>
         <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" class="form-control" id="exampleFormControlInput1" name="email" />
         <label htmlFor="password"> Password </label>
         <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="******" class="form-control" id="exampleInputPassword1" name="password" />
         <button type="submit" class="btn btn-light" > Log In </button>
      </form>
      <button className="btn btn-link" onClick={() => props.onFormSwitch('Register')}> Don't have an account? Register </button>
    </div>
   );
}   