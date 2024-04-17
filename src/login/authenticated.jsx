import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        props.onLogout();
      });
  }

  return (
    <div class="general_text" id="playControls">
      <div className="general_text" id="login_username_place">{props.userName}</div>
      <Button className="general_text" onclick={() => navigate('/play')}>Play</Button>
      <Button className="general_text" onclick={() => logout()}>Logout</Button>
    </div>
  );
}
