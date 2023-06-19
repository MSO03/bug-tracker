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
            <form className="register-form" onSubmit={handlesubmit}>
                <label htmlFor="name"> Name </label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Your Name"  className="form-control" id="exampleFormControlInput1" />   
                <label htmlFor="email"> Email </label>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" name="email"  className="form-control" id="exampleFormControlInput1" />
                <label htmlFor="password"> Password </label>
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="******" id="password" name="password"  className="form-control" id="exampleFormControlInput1" />
                <button type="submit" className="btn btn-light"> Create an account </button>
            </form>
            <button className="btn btn-link" onClick={() => props.onFormSwitch('Login')}> Already have an account? Login </button>
        </div>
    );
};
