import React from 'react';
import './about.css';

export function About(props) {
    const [imageUrl, setImageUrl] = React.useState('');
    const [quote, setQuote] = React.useState('Loading...');
    const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');
  
    // We only want this to render the first time the component is created and so we provide an empty dependency list.
    React.useEffect(() => {
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
            //console.log(randomFact);
        })
        .catch(error => {
            console.error('Error fetching trivia:', error)});
    }, []);
  
    return (
        <main>
            <div id="picture" className="picture-box"><img width="200px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Oxygen480-emotes-face-smile-big.svg/2048px-Oxygen480-emotes-face-smile-big.svg.png" alt="random" /></div>
            <p className='info'>
            Did you know that if plaque covers teeth for longer than
                48 hours, then it begins to harden and can eventually become inflammation, bleeding, and gum disease?
                This can cause <a className='informational_links' href="https://www.cdc.gov/oralhealth/conditions/periodontal-disease.html#:~:text=In%20its%20early%20stage%2C%20called,loosen%20or%20even%20fall%20out.">
                your teeth to fall out!</a> Additionally, failure to brush your teeth can turn them yellow and cause bad breath.
            </p>
            <p className='info'>
                It is so important to brush your teeth for this reason! 
                As a child, I hated brushing my teeth simply because I was told to do it and didn't want to. 
                This game is designed to teach children the importance of brushing
                their teeth in a fun way, so that they can have build healthy habits that will last their entire life.
            </p>
            <p className='info'>Fun Fact:</p>
            <p className='info' id="api_place"></p>
  
      </main>
    );
  }