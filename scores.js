function loadScores() {
  localStorage.setItem('score', 11);
  
  const scoreText = localStorage.getItem('score');

    if (!scoreText) {
      winCount = '0';
    }
    else {
      winCount = scoreText;
    }

  const totalWins = document.querySelector('#totalWins');

  totalWins.textContent = winCount;
}

loadScores();