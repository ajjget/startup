function loadUsername() {
    let username = localStorage.getItem('userName');
    const usernameEl = document.querySelector('#username_place');
    const loginUsernameEl = document.querySelector('#login_username_place');

    if (username) {
        usernameEl.textContent = `Logged in as ${username}`;
        if (loginUsernameEl) {
            loginUsernameEl.textContent = username;
        }
    }
    else {
        usernameEl.textContent = "Please login!";
    }
}

async function websocketNotifications() {
    const websocketEl = document.querySelector('#websocket_place');
    for (i = 0; i < 50; i+=5) {
        websocketEl.textContent = `${i} sets of teeth have been brushed by the community in the last 3 seconds!`;
        await delay();
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
websocketNotifications();