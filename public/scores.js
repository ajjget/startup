function loadScores() {
  const scoreText = localStorage.getItem('scores');

    if (!scoreText) {
      winCount = '0';
    }
    else {
      winCount = JSON.parse(scoreText);
    }

  const totalWins = document.querySelector('#totalWins');

  totalWins.textContent = winCount;
}

loadScores();