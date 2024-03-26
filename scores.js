function loadScores() {
    const scoreText = localStorage.getItem('score');
    if (scoresText) {
      winCount = JSON.parse(scoresText);
    }
    else {
      winCount = '0';
    }
    
  
    const totalWins = document.querySelector('#totalWins');
  
    totalWins = 11;
    loadScores();
  }