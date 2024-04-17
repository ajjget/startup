import React from 'react';

import './scores.css';

export function Scores() {

  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  React.useEffect(() => {
    async function loadScores() {
        const username = localStorage.getItem('userName');
        const url =  `/api/score?username=${encodeURIComponent(username)}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let scoreText = parseInt(await response.text());

            if (scoreText == null) {
            winCount = 'error';
            }
            else {
            winCount = JSON.parse(scoreText);
            }

        const totalWins = document.querySelector('#totalWins');

        totalWins.textContent = winCount;
    }

    loadScores();
  }, []);

  // Demonstrates rendering an array with React
  const scoreRows = [];
  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      scoreRows.push(
        <tr key={i}>
          <td>{i}</td>
          <td>{score.name.split('@')[0]}</td>
          <td>{score.score}</td>
          <td>{score.date}</td>
        </tr>
      );
    }
  } else {
    scoreRows.push(
      <tr key='0'>
        <td colSpan='4'>Be the first to score</td>
      </tr>
    );
  }

  return (
    <main>
      <div id="picture" class="picture-box"><img width="200px" src="https://c-cl.cdn.smule.com/rs-s25/arr/ee/69/0d745ba6-9251-47d7-b548-7ba9e92a9210.jpg" alt="random" /></div>
      <div className='general_text'>Number of times teeth you have brushed your teeth</div>
      <div className='general_text' id="totalWins"></div>
    </main>
  );
}
