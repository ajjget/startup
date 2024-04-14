(async () => {
  const userName = localStorage.getItem('userName');
  if (userName) {
    //document.querySelector('#username_place').textContent = `Logged in as ${userName}`;
    setDisplay('loginControls', 'none');
    setDisplay('playControls', 'block');
  } else {
    setDisplay('loginControls', 'block');
    setDisplay('playControls', 'none');
  }
})();

async function login() {
  loginOrCreate(`/api/auth/login`);
}

async function register() {
  loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
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

function play() {
  window.location.href = 'play.html';
}

function logout() {
  localStorage.removeItem('userName');
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => (window.location.href = '/'));
}

async function getUser(username) {
  let scores = [];
  // See if we have a user with the given username.
  const response = await fetch(`/api/user/${username}`);
  if (response.status === 200) {
    return response.json();
  }

  return null;
}

function setDisplay(controlId, display) {
  const playControlEl = document.querySelector(`#${controlId}`);
  if (playControlEl) {
    playControlEl.style.display = display;
  }
}
