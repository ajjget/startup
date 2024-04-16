// gets a fun fact from the API and displays it on the about page
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
        const randomFact = facts[factIndex];

        containerEl.textContent = randomFact;
        console.log(randomFact);
    })
    .catch(error => {
        console.error('Error fetching trivia:', error);
    });
}

  
displayFact();