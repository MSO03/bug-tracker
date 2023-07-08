import { useContext } from 'react';
import { Auth } from '../context/authContext';

export default function useAuth() {
  const context = useContext(Auth);
  if (context === undefined) {
    throw new Error('Context not accesible');
  }

return context;
}
