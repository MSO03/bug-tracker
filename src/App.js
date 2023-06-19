import {Login} from './pages/Login';
import {Register} from './pages/Register';
import { useState } from 'react';
import './App.css';

function App() {
  const [currentForm,setCurrentForm] = useState('Login');

  const toggleForm = (formName) =>{
    setCurrentForm(formName);
  }
  
  return (
    <>
      <div className="App">
          {currentForm ==="Login" ? <Login onFormSwitch={toggleForm}/>: <Register onFormSwitch={toggleForm}/>}
      </div>
    </>
  );
}

export default App;