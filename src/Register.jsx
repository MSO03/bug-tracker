import { useState } from "react";
export const Register = (props) => {
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');
    const[name, setName] = useState('');

    const handlesubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    return (
        <div className="auth-form-container">
        <form className = "register-form"onSubmit={handlesubmit}>
      <label htmlFor="name">Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Your Name"></input>      
      <label htmlFor="email">email</label>
      <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"></input >
      <label htmlFor="password">password</label>
      <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="******" id="password" name="password"></input>
       <button type="submit">Create an account</button>
      </form>
      <button  className="link-btn" onClick={() => props.onFormSwitch('Login')}>Already have an account? Login</button>
        
        
        </div>
    );
};
