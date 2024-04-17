let buttons = document.getElementsByClassName("tooth_button");
let teethPoppedUp = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let score = 0;
let gameInProgress = false;


// Processes a click if a tooth is popped up
function clickTooth(toothID) {
    if (teethPoppedUp[toothID] == 1) {
        score++;
        teethPoppedUp[toothID] = 0;
        paintTooth(toothID);
        updateScore(score);
    }
}

// Starts the game
function clickPlay() {
    if (gameInProgress == false) {
        updateScore(0);
        gameInProgress = true;
        this.whackAPlaque();
    }
}

// Manages the actual game loop once play is pressed
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

// Returns a random tooth index
async function getRandomNumber() {
    return Math.floor(Math.random() * 9);
}

// Shows/hides a tooth depending on its value in teethPoppedUp
function paintTooth(toothID) {
    if (teethPoppedUp[toothID] == 1) {
        document.getElementById(`t${toothID}`).style.display="block";
    }
    else {
        document.getElementById(`t${toothID}`).style.display="none";
    }
}

// Resets game and prepares it to be replayed
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

// Updates on-screen score of how many teeth have been brushed
function updateScore(scoreMessage) {
    const scoreEl = document.querySelector('#score');
    scoreEl.value = scoreMessage;
}

// Increments database score once user wins
async function saveScore() {
  const username = localStorage.getItem('userName');
  const url =  `/api/score?username=${encodeURIComponent(username)}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
  });
  let scoreText = parseInt(await response.text());
}

// A .8 second delay, used to pop teeth up and down
async function delay() {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 800);
    });
}

// Sequence that runs when the game is finished. Pops up clean teeth
function finishGame() {
    updateScore("You win! Please click \"Reset\" to play again.");
    saveScore();
    let shinyTeeth = document.getElementsByClassName("shiny_tooth");
    for (i = 0; i < shinyTeeth.length; i++) {
      shinyTeeth[i].style.display="block";
    }
    broadcastEvent(localStorage.getItem('userName'));
}

// Uses websocket to broadcast when someone wins to all players
function broadcastEvent(player) {
  const event = {
    player: player
  };
  socket.send(JSON.stringify(event));
}