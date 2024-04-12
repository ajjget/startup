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
  
function displayFact() {
    const apiKey = '6e3ef13a0bmsh371c2c3d53ec18fp148385jsn1cce91e21da0';
    const apiUrl = 'https://webknox-trivia-knowledge-facts-v1.p.rapidapi.com/trivia/search';

    fetch(apiUrl + '?topic=teeth', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'webknox-trivia-knowledge-facts-v1.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(data => {
        const containerEl = document.querySelector('#api_place');
        const facts = data.trivia;
        const factIndex = Math.floor(Math.random() * facts.length);
        // console.log(facts.length)
        // for (let i = 0; i < facts.length; i++) {
        //     console.log(facts[i]);
        // }
        const randomFact = facts[factIndex];

        containerEl.textContent = randomFact;
        console.log(randomFact);
    })
    .catch(error => {
        console.error('Error fetching trivia:', error);
    });
}

  
displayFact();
loadUsername();
websocketNotifications();