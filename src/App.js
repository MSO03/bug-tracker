import { Login } from './pages/Login';
import { Register } from './pages/Register';
import TestHome from './pages/TestHome';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import useAuth from './hooks/useAuth';
import './App.css';
import Navbar from './components/NavBar';

function App() {
  const [currentForm, setCurrentForm] = useState('Login');
  const { user } = useAuth();
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={user ? <TestHome /> : <Login />} />
          <Route path="/signup" element={user ? <TestHome /> : <Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
