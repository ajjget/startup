function loadUsername() {
    let username = localStorage.getItem('username');
    const usernameEl = document.querySelector('#username_place');

    if (username) {
        usernameEl.textContent = `${username} logged in`;
    }
    else {
        usernameEl.textContent = "Please login!";
    }
}

async function funFacts() {
    const apiEl = document.querySelector('#api_place');
    for (i = 0; i < 15; i++) {
        apiEl.textContent = `fun fact #${i}`;
        await delay();
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
  
function displayFact(data) {
fetch('https://webknox-trivia-knowledge-facts-v1.p.rapidapi.com/trivia/search')
    .then((response) => response.json())
    .then((data) => {
    const containerEl = document.querySelector('#api_place');

    let facts = data.trivia;
    let fact = Math.floor(Math.random() * facts.length)

    containerEl.textContent = fact
    });
}
  
displayFact();
loadUsername();
funFacts();
websocketNotifications();