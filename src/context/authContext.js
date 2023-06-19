import { auth } from '../firebase/firebaseConfig';
import { createContext, useEffect, useReducer } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const reducerFunc = (state, action) => {
  switch (action.type) {
    case 'AUTHSTATECHANGED':
      return { user: action.payload, authIsReady: true };
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};
export const Auth = createContext();
export const AuthContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunc, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) =>
      dispatch({ type: 'AUTHSTATECHANGED', payload: user })
    );
    unsub();
  }, []);

  return (
    <Auth.Provider value={{ ...state, dispatch }}>{children}</Auth.Provider>
  );
};
