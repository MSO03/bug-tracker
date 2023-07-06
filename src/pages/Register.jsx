import { useState, useEffect, useRef } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import "./Submitbuttons.css";
export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [formError, setFormError] = useState("");
  const [signUpErr, setSignUpErr] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const { dispatch } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const passElement = useRef();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    passElement.placeholder = " ";
    passElement.type = "email";
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "" || displayName === "") {
      setFormError("A required field is missing");
      setTimeout(() => setFormError(null), 3000);
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      const update = await updateProfile({ displayName });
      if (res) {
        dispatch({ type: "LOGIN", payload: res.user });
      }
      if (update) {
        setDisplayName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setSignUpErr(error.message);
    }
  };

  useEffect(() => {
    document.body.style.backgroundImage =
      "url(https://cdn.wallpapersafari.com/5/88/FnDoyH.jpg)";
    document.body.style.backgroundPosition = "70% 30%";
    document.body.style.backgroundRepeat = "no-repeat"; // Add this line
    document.body.style.backgroundSize = "cover";
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "";
    };
  }, []);

  return (
    <div className="d-flex justify-content-center align-content-center mt-5">
      <form onSubmit={handleSubmit} className="bg-white rounded-4 p-5 mt-3">
      <div className="account-login">
        <h4>Create new Account</h4>
      </div>
        <div className="form-group">
          <label htmlFor="name"> Name </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="name"
            placeholder="Your Name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email"> Email </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            name="email"
            className="form-control"
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
            type={showPassword ? "text" : "password"}
            ref={passElement}
          />
          <div align="right">
            <label>
              Show Password:
              <input
                type="checkbox"
                checked={showPassword}
                onChange={toggleShowPassword}
              />
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="username"> Username </label>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            type="username"
            placeholder="Your Username"
            name="displayName"
            className="form-control"
          />
        </div>
        <button id="regbtn" type="submit" className="btn btn-light w-100">
          {error && <h1>{error}</h1>} Sign Up{" "}
        </button>
        <button className="btn btn-link">
          <Link to="/login">Already have an account? Login </Link>
        </button>
      </form>
    </div>
  );
};
