let buttons = document.getElementsByClassName("tooth_button");
let teethPoppedUp = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let score = 0;
let gameInProgress = false;

function clickTooth(toothID) {
  console.log("in click tooth");
    if (teethPoppedUp[toothID] == 1) {
        score++;
        teethPoppedUp[toothID] = 0;
        paintTooth(toothID);
        updateScore(score);
    }
}

function clickPlay() {
  console.log("click play");
    if (gameInProgress == false) {
        updateScore(0);
        gameInProgress = true;
        this.whackAPlaque();
    }
}

async function whackAPlaque() {
  console.log("in whack a plaque");
    while (score < 20 && gameInProgress == true) {
        console.log("in loop");
        toothID = await getRandomNumber();
        teethPoppedUp[toothID] = 1;
        paintTooth(toothID);
        
        await delay();

        teethPoppedUp[toothID] = 0;
        paintTooth(toothID);
    }
    if (score >= 20) {
        console.log("yay you win!");
        finishGame();
        
        //add to database
    }
}

async function getRandomNumber() {
  console.log("get random number");
    return Math.floor(Math.random() * 9);
}

function paintTooth(toothID) {
  console.log("in paint tooth");
    if (teethPoppedUp[toothID] == 1) {
        document.getElementById(`t${toothID}`).style.display="block";
    }
    else {
        document.getElementById(`t${toothID}`).style.display="none";
    }
}

async function clickReset() {
  console.log("in click reset");
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
    console.log("update score");
    const scoreEl = document.querySelector('#score');
    scoreEl.value = scoreMessage;
}

async function delay() {
    console.log("delay");
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
    });
}

function finishGame() {
    updateScore("You win! Please click \"Reset\" to play again.");

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