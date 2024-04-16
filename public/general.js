const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
let genSocket = new WebSocket(`${protocol}://${window.location.host}/ws`);
configureWebSocket();

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

// async function websocketNotifications() {
//     const websocketEl = document.querySelector('#websocket_place');
//     for (i = 0; i < 50; i+=5) {
//         const playerNum = Math.floor(Math.random() * 3000);
//         websocketEl.textContent = `Player ${playerNum} just brushed their teeth!`;
//         //websocketEl.textContent = `${i} sets of teeth have been brushed by the community in the last 3 seconds!`;
//         await delay();
//     }
// }

function configureWebSocket() {
    genSocket.onopen = (event) => {
      this.displayMsg("Winners will have their name displayed here!");
    };
    genSocket.onclose = (event) => {
      this.displayMsg("Socket closed.");
    };
    genSocket.onmessage = async (event) => {
      const newMessage = JSON.parse(await event.data.text());
      displayMsg(`${newMessage.player} has just brushed their teeth!`);
    };
  }
  
  function displayMsg(msg) {
    const websocketPlace = document.querySelector('#websocket_place');
    websocketPlace.textContent = msg;
  }

function setDisplay(controlId, display) {
    const playControlEl = document.querySelector(`#${controlId}`);
    if (playControlEl) {
      playControlEl.style.display = display;
    }
  }

async function delay() {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 3000);
    });
}
  
loadUsername();
//websocketNotifications();