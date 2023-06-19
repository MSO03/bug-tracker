import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseConfig';
export default function Navbar() {
  const { user, dispatch } = useAuth();

  const [signOut, loading, error] = useSignOut(auth);

  const handleClick = async () => {
    const signedout = await signOut();
    if (signedout) {
      dispatch({ type: 'LOGOUT' });
    }
  };

  return (
    <div className=" w-full h-[8%] bg-[#36454F] flex items-center ">
      <div className=" w-[40%] flex justify-start  text-lg text-white mr-10">
        <div className=" w-[40%] flex justify-evenly">
          {user ? <Link onClick={handleClick}>logout</Link> : null}
        </div>
      </div>
    </div>
  );
}
