import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutInitiate } from '../redux/actions';


const Home = () => {


  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAuth = () => {
    if(currentUser){
      dispatch(logoutInitiate());
    }
  }

  return (
    <>
    {currentUser &&
      <>
        Welcome {currentUser?.displayName}
        <h3>You're logged in</h3>
        <button onClick={handleAuth}>Logout</button>
      </>  
    }
    </>

  )
}

export default Home