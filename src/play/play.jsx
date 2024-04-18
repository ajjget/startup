import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';

export function Play(props) {
  const [teethPoppedUp, setTeethPoppedUp] = useState(Array(9).fill(0));
  //const [score, setScore] = useState(0);
  const [scoreMsg, setScoreMsg] = useState('--');
  const [displayType, setDisplayType] = useState('none');
  //const [gameInProgress, setGameInProgress] = useState(false);
  const gameInProgress = useRef(false);
  const score = useRef(0);

  const [grossDisplay, setGrossDisplay] = useState(Array(9).fill(false));
  const [shinyDisplay, setShinyDisplay] = useState(false);
  const [holeDisplay, setHoleDisplay] = useState(Array(9).fill(true));

const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`); // initialize websocket. used also on play.js
    // Uses websocket to broadcast when someone wins to all players
function broadcastEvent(player) {
    const event = {
        player: player
    };
    socket.send(JSON.stringify(event));
    }


  const updateScore = (scoreMessage) => {
    //document.getElementById('score').value = scoreMessage;
    setScoreMsg(scoreMessage);
  }

  const paintTooth = (toothID, poppedUp) => {
    if (poppedUp) {
        let grossTeeth = [...grossDisplay];
        grossTeeth[toothID] = true;
        setGrossDisplay(grossTeeth);

        let holes = [...holeDisplay];
        holes[toothID] = false;
        setHoleDisplay(holes);
    }
    else {
        let grossTeeth = [...grossDisplay];
        grossTeeth[toothID] = false;
        setGrossDisplay(grossTeeth);

        let holes = [...holeDisplay];
        holes[toothID] = true;
        setHoleDisplay(holes);
    }
    //document.getElementById(`t${toothID}`).style.display = teethPoppedUp[toothID] ? "block" : "none";

  }

  const clickTooth = (toothID) => {
    if (teethPoppedUp[toothID] === 1) {
      //setScore(score + 1);
      score.current = score.current + 1;
      teethPoppedUp[toothID] = 0;
      paintTooth(toothID, 0);
      updateScore(score.current);
      //score.current++;
    }
  }

  const handlePlay = async () => {
    if (!gameInProgress.current) {
      updateScore(0);
      //setGameInProgress(true);
      gameInProgress.current = true;
      await delay();
      whackAPlaque();
    }
  }

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 9);
  }

  const delay = async (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

  const whackAPlaque = async () => {
    while (score.current < 20 && gameInProgress.current) {
      console.log("looping...");
      const toothID = getRandomNumber();
      let newTeethPoppedUp = [...teethPoppedUp];
      newTeethPoppedUp[toothID] = 1;
      setTeethPoppedUp(newTeethPoppedUp);
      paintTooth(toothID, 1);

      await delay();

      newTeethPoppedUp[toothID] = 0;
      setTeethPoppedUp(newTeethPoppedUp);
      paintTooth(toothID, 0);
    }
    if (score.current >= 20) {
      finishGame();
    }
  }

  const finishGame = async () => {
    updateScore("You win! Please click \"Reset\" to play again.");
    gameInProgress.current = false;
    // Trigger shiny teeth and score saving logic
    broadcastEvent(localStorage.getItem('userName'));
    setShinyDisplay(true);
    setHoleDisplay(Array(9).fill(false));
    const username = localStorage.getItem('userName');
    const url =  `/api/score?username=${encodeURIComponent(username)}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
  }

  const clickReset = async () => {
    score.current = 0;
    //setScore(0);
    gameInProgress.current = false;
    updateScore('Please wait for a second, then hit "play" to play again.');
    await delay();
    setTeethPoppedUp(Array(9).fill(0));
    setShinyDisplay(false);
    setHoleDisplay(Array(9).fill(true));
  }

  return (
    <main>
      <div style={{ display: 'none' }}>
        <p>Please log in to play.</p>
      </div>
      <div>
        <div>
          <p>These teeth are covered in plaque and need to be brushed! Press the "Start" button to play. Click on the teeth to brush them when they pop up.<br /><br />Kids typically have 20 teeth. Once all 20 teeth are brushed, the game is over and you win the joyous and rewarding prize of clean teeth!</p>
        </div>
        <br />
        <div>
          <label htmlFor="count">Teeth brushed</label>
          <input style={{ width: '550px' }} type="text" id="score" value={scoreMsg} readOnly />
        </div>
        <br />
        <div>
          <Button onClick={handlePlay}>Start</Button>
        </div>
        <div>
          <Button onClick={clickReset}>Reset</Button>
        </div>
        <br />
        <div>
        <table>
            <tbody>
          <tr>
            <td>
              <div className="tooth_button" id="0" onClick={() => clickTooth(0)}>
                <img className="dirty_tooth" id="t0" src="gross_tooth.png" height="100" width="100" style={{ display: grossDisplay[0] ? 'block' : 'none' }}></img>
                <img className="shiny_tooth" src="shiny_tooth_1.png" height="100" width="100" style={{ display: shinyDisplay ? 'block' : 'none' }}></img>
                <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100" style={{ display: holeDisplay[0] ? 'block' : 'none' }}>
                  <circle cx="50" cy="50" r="50" align-items="center" fill="#6e1e64"/>
                </svg>
              </div>
            </td>
            <td>
              <div className="tooth_button" id="1" onClick={() => clickTooth(1)}>
                <img className="dirty_tooth" id="t1" src="gross_tooth.png" height="100" width="100" style={{ display: grossDisplay[1] ? 'block' : 'none' }}></img>
                <img className="shiny_tooth" src="shiny_tooth_2.png" height="100" width="100" style={{ display: shinyDisplay ? 'block' : 'none' }}></img>
                <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100" style={{ display: holeDisplay[1] ? 'block' : 'none' }}>
                  <circle cx="50" cy="50" r="50" align-items="center" fill="#6e1e64"/>
                </svg>
              </div>
            </td>
            <td>
              <div className="tooth_button" id="2" onClick={() => clickTooth(2)}>
                <img className="dirty_tooth" id="t2" src="gross_tooth.png" height="100" width="100" style={{ display: grossDisplay[2] ? 'block' : 'none' }}></img>
                <img className="shiny_tooth" src="shiny_tooth_3.png" height="100" width="100" style={{ display: shinyDisplay ? 'block' : 'none' }}></img>
                <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100" style={{ display: holeDisplay[2] ? 'block' : 'none' }}>
                  <circle cx="50" cy="50" r="50" align-items="center" fill="#6e1e64"/>
                </svg>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="tooth_button" id="3" onClick={() => clickTooth(3)}>
                <img className="dirty_tooth" id="t3" src="gross_tooth.png" height="100" width="100" style={{ display: grossDisplay[3] ? 'block' : 'none' }}></img>
                <img className="shiny_tooth" src="shiny_tooth_4.png" height="100" width="100" style={{ display: shinyDisplay ? 'block' : 'none' }}></img>
                <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100" style={{ display: holeDisplay[3] ? 'block' : 'none' }}>
                  <circle cx="50" cy="50" r="50" align-items="center" fill="#6e1e64"/>
                </svg>
              </div>
            </td>
            <td>
              <div className="tooth_button" id="4" onClick={() => clickTooth(4)}>
                <img className="dirty_tooth" id="t4" src="gross_tooth.png" height="100" width="100" style={{ display: grossDisplay[4] ? 'block' : 'none' }}></img>
                <img className="shiny_tooth" src="shiny_tooth_5.png" height="100" width="100" style={{ display: shinyDisplay ? 'block' : 'none' }}></img>
                <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100" style={{ display: holeDisplay[4] ? 'block' : 'none' }} >
                  <circle cx="50" cy="50" r="50" align-items="center" fill="#6e1e64"/>
                </svg>
              </div>
            </td>
            <td>
              <div className="tooth_button" id="5" onClick={() => clickTooth(5)}>
                <img className="dirty_tooth" id="t5" src="gross_tooth.png" height="100" width="100" style={{ display: grossDisplay[5] ? 'block' : 'none' }}></img>
                <img className="shiny_tooth" src="shiny_tooth_6.png" height="100" width="100" style={{ display: shinyDisplay ? 'block' : 'none' }}></img>
                <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100" style={{ display: holeDisplay[5] ? 'block' : 'none' }}>
                  <circle cx="50" cy="50" r="50" align-items="center" fill="#6e1e64"/>
                </svg>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="tooth_button" id="6" onClick={() => clickTooth(6)}>
                <img className="dirty_tooth" id="t6" src="gross_tooth.png" height="100" width="100" style={{ display: grossDisplay[6] ? 'block' : 'none' }}></img>
                <img className="shiny_tooth" src="shiny_tooth_7.png" height="100" width="100" style={{ display: shinyDisplay ? 'block' : 'none' }}></img>
                <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100" style={{ display: holeDisplay[6] ? 'block' : 'none' }}>
                  <circle cx="50" cy="50" r="50" align-items="center" fill="#6e1e64"/>
                </svg>
              </div>
            </td>
            <td>
              <div className="tooth_button" id="7" onClick={() => clickTooth(7)}>
                <img className="dirty_tooth" id="t7" src="gross_tooth.png" height="100" width="100" style={{ display: grossDisplay[7] ? 'block' : 'none' }}></img>
                <img className="shiny_tooth" src="shiny_tooth_8.png" height="100" width="100" style={{ display: shinyDisplay ? 'block' : 'none' }}></img>
                <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100" style={{ display: holeDisplay[7] ? 'block' : 'none' }}>
                  <circle cx="50" cy="50" r="50" align-items="center" fill="#6e1e64"/>
                </svg>
              </div>
            </td>
            <td>
              <div className="tooth_button" id="8" onClick={() => clickTooth(8)}>
                <img className="dirty_tooth" id="t8" src="gross_tooth.png" height="100" width="100" style={{ display: grossDisplay[8] ? 'block' : 'none' }}></img>
                <img className="shiny_tooth" src="shiny_tooth_9.png" height="100" width="100" style={{ display: shinyDisplay ? 'block' : 'none' }}></img>
                <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100" style={{ display: holeDisplay[8] ? 'block' : 'none' }}>
                  <circle cx="50" cy="50" r="50" align-items="center" fill="#6e1e64"/>
                </svg>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      </div>
    </main>
  );
}
