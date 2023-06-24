import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import useAuth from './hooks/useAuth';
import Navbar from './components/NavBar';

function App() {
  const [currentForm, setCurrentForm] = useState('Login');
  const { user } = useAuth();
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/signup" element={user ? <Home /> : <Register />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
