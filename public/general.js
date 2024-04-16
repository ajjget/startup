const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
let socket = new WebSocket(`${protocol}://${window.location.host}/ws`); // initialize websocket. used also on play.js
configureWebSocket();

// load username based on whether or not a user is logged in
function loadUsername() {
    let username = localStorage.getItem('userName');
    const usernameEl = document.querySelector('#username_place');
    const loginUsernameEl = document.querySelector('#login_username_place');

    if (username) {
        usernameEl.textContent = `Logged in as ${username}`;
        setDisplay('playButton', 'block');
        setDisplay('scoresButton', 'block');
        if (loginUsernameEl) {
            loginUsernameEl.textContent = username;
        }
    }
    else {
        usernameEl.textContent = "Please login!";
        if (!document.URL.includes("index.html") && !document.URL.includes("about.html")) {
            window.location.href = 'index.html';
        }
        setDisplay('playButton', 'none');
        setDisplay('scoresButton', 'none');
    }
}

// set up websocket to accept different events
function configureWebSocket() {
    socket.onopen = (event) => {
      this.displayMsg("Winners will have their name displayed here!");
    };
    socket.onclose = (event) => {
      this.displayMsg("Socket closed.");
    };
    socket.onmessage = async (event) => {
      const newMessage = JSON.parse(await event.data.text());
      displayMsg(`${newMessage.player} has just brushed their teeth!`);
    };
  }

// display message on the websocket spot at the top of the page
function displayMsg(msg) {
    const websocketPlace = document.querySelector('#websocket_place');
    websocketPlace.textContent = msg;
  }

// general helper function to help update displays
function setDisplay(controlId, display) {
    const playControlEl = document.querySelector(`#${controlId}`);
    if (playControlEl) {
      playControlEl.style.display = display;
    }
  }
  
loadUsername();