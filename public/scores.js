async function loadScores() {
  //const scoreText = localStorage.getItem('scores');
  const username = localStorage.getItem('userName');
  const url =  `/api/score?username=${encodeURIComponent(username)}`;
  //console.log(url);
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