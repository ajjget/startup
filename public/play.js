let buttons = document.getElementsByClassName("tooth_button");
let teethPoppedUp = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let score = 0;
let gameInProgress = false;
// const playProtocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
// let playSocket = new WebSocket(`${playProtocol}://${window.location.host}/ws`);

function clickTooth(toothID) {
    if (teethPoppedUp[toothID] == 1) {
        score++;
        teethPoppedUp[toothID] = 0;
        paintTooth(toothID);
        updateScore(score);
    }
}

function clickPlay() {
    if (gameInProgress == false) {
        updateScore(0);
        gameInProgress = true;
        this.whackAPlaque();
    }
}

async function whackAPlaque() {
    while (score < 20 && gameInProgress == true) {
        toothID = await getRandomNumber();
        teethPoppedUp[toothID] = 1;
        paintTooth(toothID);
        
        await delay();

        teethPoppedUp[toothID] = 0;
        paintTooth(toothID);
    }
    if (score >= 20) {
        finishGame();
    }
}

async function getRandomNumber() {
    return Math.floor(Math.random() * 9);
}

function paintTooth(toothID) {
    if (teethPoppedUp[toothID] == 1) {
        document.getElementById(`t${toothID}`).style.display="block";
    }
    else {
        document.getElementById(`t${toothID}`).style.display="none";
    }
}

async function clickReset() {
  score = 0;
  gameInProgress = false;
  updateScore('Please wait for a second, then hit "play" to play again.');

  let shinyTeeth = document.getElementsByClassName("shiny_tooth");
    for (i = 0; i < shinyTeeth.length; i++) {
      shinyTeeth[i].style.display="none";
    }

  for (i = 0; i < 9; i++) {
    if (teethPoppedUp[i] == 1) {
      teethPoppedUp[i] = 0;
      paintTooth(i);
    }
  }

  await delay();
}

function updateScore(scoreMessage) {
    const scoreEl = document.querySelector('#score');
    scoreEl.value = scoreMessage;
}

async function saveScore() {
  const username = localStorage.getItem('userName');
  const url =  `/api/score?username=${encodeURIComponent(username)}`;
  //console.log(url);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
  });
  let scoreText = parseInt(await response.text());
}

async function delay() {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
    });
}

function finishGame() {
    updateScore("You win! Please click \"Reset\" to play again.");
    saveScore();
    let shinyTeeth = document.getElementsByClassName("shiny_tooth");
    for (i = 0; i < shinyTeeth.length; i++) {
      shinyTeeth[i].style.display="block";
    }
    broadcastEvent(localStorage.getItem('userName'));
}


function broadcastEvent(player) {
  const event = {
    player: player
  };
  socket.send(JSON.stringify(event));
}