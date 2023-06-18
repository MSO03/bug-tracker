
import logo from './logo.svg';
import './App.css';
import {Login} from './Login';
import {Register} from './Register';
import { useState } from 'react';



function App() {
  const [currentForm,setCurrentForm] = useState('Login');

  const toggleForm = (formName) =>{
    setCurrentForm(formName);
  }
  return (
    <>
   <title>The Bugg Trackerr</title>
    <div className="App">

     {currentForm ==="Login" ? <Login onFormSwitch={toggleForm}/>: <Register onFormSwitch={toggleForm}/>}
    </div>
    </>
  );
}

export default App;