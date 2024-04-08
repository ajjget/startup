let buttons =  new Map();
let teethPoppedUp = [];
let score = 0;
  
  class Button {
    el;
    id;

    constructor(id, el) {
      this.id = id;
      this.el = el;
    }

  
    popUpTooth() {
      console.log("in pop up tooth");
      this.el.innerHTML = '<img src="gross_tooth.png">';
      //this.el.css("red");
    }
  
    async clickTooth() {
      console.log("in click tooth");
      // check if the clicked tooth is set as 1 in the array, then put the tooth down
      // otherwise ignore
    }
  }
  
  class Game {
    allowPlayer;
  
    constructor() {
      this.allowPlayer = false;
  
      document.querySelectorAll('.tooth_button').forEach((el, i) => {
        if (i < 9) {
          this.buttons.set(i, new Button(btnDescriptions[i], el));
        }
      });
  
      // const playerNameEl = document.querySelector('.player-name');
      // playerNameEl.textContent = this.getPlayerName();
    }

    async clickPlay() {
      console.log("in play");
      if (this.allowPlayer == true) {
        this.allowPlayer = false;
        this.addButton();
        this.whackAPlaque();
      }
    }

    async whackAPlaque() {
      while (score < 32) {
        button = this.getRandomButton();
        teethPoppedUp[button.id] = 1;
        this.paintTeeth();
        this.delay();
        teethPoppedUp[button.id] = 0;
      }
    }

    paintTeeth() {
      for (i = 0; i < 9; i++) {
        if (i == 1) {
          // paint tooth
        }
        else {
          //unpaint tooth
        }
      }
    }
  
    async reset() {
      console.log("in reset");
      this.allowPlayer = true;
      this.sequence = [];
      this.updateScore('--');
      // you need to stop the current whackAPlaque loop
    }
  
    getPlayerName() {
      console.log("in getPlayerName")
      return localStorage.getItem('userName') ?? 'Mystery player';
    }
  
    updateScore(score) {
      console.log("in update score");
      const scoreEl = document.querySelector('#score');
      scoreEl.textContent = score;
    }
  
    getRandomButton() {
      console.log("in get random button");
      let buttons = Array.from(this.buttons.values());
      return buttons[Math.floor(Math.random() * this.buttons.size)];
    }
  }
  
  //   saveScore(score) {
  //     console.log("in save score");
  //     const userName = this.getPlayerName();
  //     let scores = [];
  //     const scoresText = localStorage.getItem('scores');
  //     if (scoresText) {
  //       scores = JSON.parse(scoresText);
  //     }
  //     scores = this.updateScores(userName, score, scores);
  
  //     localStorage.setItem('scores', JSON.stringify(scores));
  //   }
  
  //   updateScores(userName, score, scores) {
  //     console.log("in update scores");
  //     const date = new Date().toLocaleDateString();
  //     const newScore = { name: userName, score: score, date: date };
  
  //     let found = false;
  //     for (const [i, prevScore] of scores.entries()) {
  //       console.log("in update scores");
  //       if (score > prevScore.score) {
  //         scores.splice(i, 0, newScore);
  //         found = true;
  //         break;
  //       }
  //     }
  
  //     if (!found) {
  //       scores.push(newScore);
  //     }
  
  //     if (scores.length > 10) {
  //       scores.length = 10;
  //     }
  
  //     return scores;
  //   }
  // }
  
  const game = new Game();
  
  function delay(milliseconds) {
    console.log("in delay");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, milliseconds);
    });
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

  */