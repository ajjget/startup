let buttons = document.getElementsByClassName("tooth_button");
let teethPoppedUp = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let score = 0;
let gameInProgress = false;

function loadUsername() {
  
}

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
    while (score < 2 && gameInProgress == true) {
        toothID = await getRandomNumber();
        teethPoppedUp[toothID] = 1;
        paintTooth(toothID);
        
        await delay();

        teethPoppedUp[toothID] = 0;
        paintTooth(toothID);
    }
    if (score >= 2) {
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
  // const username = localStorage.getItem('userName');
  // const response = await fetch('/api/score', {
  //   method: 'POST',
  //   headers: {
  //       'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ username: username })
  // });
  // await response.text();

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

  //const userName = this.getPlayerName();
  //let scores = localStorage.getItem('scores');
  // if (scores) {
  //   scores++;
  // }
  // else {
  //   scores = 1;
  // }

  // localStorage.setItem('scores', JSON.stringify(scores));
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
}



/*
  set up buttons
  
  While (score < 32) {
    randomly choose a state to update
    paint_holes() -> goes through array and puts tooth on hole, takes teeth from 0 holes
    delay()
    array = 0
  }

  onClick() {
    if (array[i] == 1)
      score++
      array[0] = 0
      paint_holes()
  }

  */
  
  /*
  TA ADVICE
  <div>
    <div class="button" id="bt1" onclick="getButton(0)"\>
    <div class="button" id="bt2" onclick="getButton(1)"\>
    <div class="button" id="bt3" onclick="getButton(2)"\>
  </div>

  js

  let buttons = document.getElementsByClassName("button")
  // buttons = [bt1, bt2, bt3]

  function getButton (num) {
    let button = document.getElementById(`bt${num}`);
  }
  */

  /*
  Insert photo
  - you can do CSS manipulation to hide and show photo
  class.display: none
  class.display: block
  */

  /*
  Interrupt function while while() is in delay
  lolz don't need to cuz im not fancy and this game gonn suck
  */