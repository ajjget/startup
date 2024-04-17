import React from 'react';

import Button from 'react-bootstrap/Button';
//import {MessageDialog} from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  //const [displayError, setDisplayError] = React.useState(null);
  const [error, setError] = React.useState('');

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const error = document.querySelector('#error');
    error.textContent = "";
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({username: userName, password: password}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      if (response.status === 401) {
        setError("Error: Incorrect login information");
      }
      else if (response.status === 409) {
        setError("Error: Username already taken");
      }
      else {
        setError(`Error: ${body.msg}`);
      }
    }
  }

  return (
    <>
      <div>
        <div className='general_text'>
          <span>Username</span>
          <input
            id="userName"
            className='informational_links'
            type='text'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder='Your name here'
          />
        </div>
        <div className='general_text'>
          <span>Password</span>
          <input
            className='informational_links'
            type='password'
            id="userPassword"
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Super secret password'
          />
        </div>
        <Button className="general_text" onClick={() => loginUser()}>
          Login
        </Button>
        <Button className="general_text" onClick={() => createUser()}>
          Register
        </Button>
        <div className="general_text" id="error">{error}</div>
      </div>

    </>
  );
}
