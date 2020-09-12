import React, {useState, useContext} from 'react';
import {UserContext} from '../../App';
import {useHistory, useLocation} from 'react-router-dom';
import {initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword} from './loginManager';


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSIgnIn: false,
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false);
    })
  }
  
  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from)
    }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
     isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
        })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
       .then(res => {
        handleResponse(res, true);
        })
    }
  e.preventDefault();
  }



  return (
    <div style={{textAlign: "center"}}>
      {
        user.isSIgnIn ? (<button onClick={signOut}>Sign out</button>) : 
        (<button onClick={googleSignIn}>Sign in with Google</button>)
      }

      <br/>

      { 
        <button onClick={fbSignIn}>Sign in using Facebook</button>
      }

      <br />
      <br />

      <h1>Email atrhentication form</h1>

      <br/>

      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="nueUser" id=""/>
      <label htmlFor="newUser">New user sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" placeholder="Name" onBlur={handleBlur}/>}
        <br/>
        <input type="email" name="email" placeholder="Enter email" required onBlur={handleBlur}/>
        <br />
        <input type="password" name="password" placeholder="Enter password" required onBlur={handleBlur}/>
        <br />
        <input type="submit" name="password" value="Submit" />
      </form>

      <small style={{color: 'red'}}>{user.error}</small>
      {
        user.success && <small style={{color: 'green'}}>User { newUser ? 'created' : 'logged in'} successfully</small>
      }

      {user.isSIgnIn && (
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
    </div>
  );
}

export default Login;
