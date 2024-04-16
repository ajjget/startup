// shows login/register controls if there is no username in localstorage; otherwise, shows play/logout
(async () => {
  const userName = localStorage.getItem('userName');
  if (userName) {
    setDisplay('loginControls', 'none');
    setDisplay('playControls', 'block');
  } else {
    setDisplay('loginControls', 'block');
    setDisplay('playControls', 'none');
  }
})();

// making a request to authenticate a login
async function login() {
  loginOrRegister(`/api/auth/login`);
}

// making a request to register an account
async function register() {
  loginOrRegister(`/api/auth/create`);
}

// handles login/registering with the API
// sends the API user data
// processes response accordingly 
async function loginOrRegister(endpoint) {
  const error = document.querySelector('#error');
  error.textContent = "";
  const userName = document.querySelector('#userName')?.value;
  const password = document.querySelector('#userPassword')?.value;
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ username: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (response.ok) {
    localStorage.setItem('userName', userName);
    window.location.href = 'play.html';
  } else {
    const body = await response.json();
    if (response.status === 401) {
      error.textContent = "Error: Incorrect login information";
    }
    else if (response.status === 409) {
      error.textContent = "Error: Username already taken";
    }
    else {
      error.textContent = `Error: ${body.msg}`;
    }
  }
}

// redirects the play button to the play page
function play() {
  window.location.href = 'play.html';
}

// handles logout button press with API, removes username from localStorage
function logout() {
  localStorage.removeItem('userName');
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => (window.location.href = '/'));
}

// determiens if there is a user with a given username
async function getUser(username) {
  let scores = [];
  const response = await fetch(`/api/user/${username}`);
  if (response.status === 200) {
    return response.json();
  }

  return null;
}

// generally set a display of some item in the document
function setDisplay(controlId, display) {
  const playControlEl = document.querySelector(`#${controlId}`);
  if (playControlEl) {
    playControlEl.style.display = display;
  }
}
