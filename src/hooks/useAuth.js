import { useContext } from 'react';
import { Auth } from '../context/authContext';
const useAuth = () => {
  const context = useContext(Auth);
  if (!context) {
    console.log('Breach of context');
  }

  return context;
};

export default useAuth;
