import React, { useState, useEffect } from 'react';


export function Play(props) {
const WhackAPlaque = () => {
    const [teethPoppedUp, setTeethPoppedUp] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [score, setScore] = useState(0);
    const [gameInProgress, setGameInProgress] = useState(false);

    useEffect(() => {
        const handleClick = (toothID) => {
            if (teethPoppedUp[toothID] === 1) {
                setScore(prevScore => prevScore + 1);
                const updatedTeethPoppedUp = [...teethPoppedUp];
                updatedTeethPoppedUp[toothID] = 0;
                setTeethPoppedUp(updatedTeethPoppedUp);
                updateScore(score + 1);
            }
        };

        const handlePlay = () => {
            if (!gameInProgress) {
                updateScore(0);
                setGameInProgress(true);
                whackAPlaque();
            }
        };

        const whackAPlaque = async () => {
            while (score < 20 && gameInProgress) {
                const toothID = await getRandomNumber();
                const updatedTeethPoppedUp = [...teethPoppedUp];
                updatedTeethPoppedUp[toothID] = 1;
                setTeethPoppedUp(updatedTeethPoppedUp);
                await delay();
                const teethPoppedDown = [...teethPoppedUp];
                teethPoppedDown[toothID] = 0;
                setTeethPoppedUp(teethPoppedDown);
            }
            if (score >= 20) {
                finishGame();
            }
        };

        const getRandomNumber = async () => {
            return Math.floor(Math.random() * 9);
        };

        const updateScore = (scoreMessage) => {
            const scoreEl = document.getElementById('score');
            scoreEl.value = scoreMessage;
        };

        const delay = async () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 800);
            });
        };

        const finishGame = () => {
            updateScore("You win! Please click \"Reset\" to play again.");
            saveScore();
            const shinyTeeth = document.getElementsByClassName("shiny_tooth");
            for (let i = 0; i < shinyTeeth.length; i++) {
                shinyTeeth[i].style.display = "block";
            }
            broadcastEvent(localStorage.getItem('userName'));
        };

        const saveScore = async () => {
            const username = localStorage.getItem('userName');
            const url = `/api/score?username=${encodeURIComponent(username)}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const scoreText = parseInt(await response.text());
        };

        const broadcastEvent = (player) => {
            const event = {
                player: player
            };
            // Implement WebSocket logic here
        };

        return () => {
            // Cleanup logic if needed
        };
    }, [teethPoppedUp, score, gameInProgress]);

    const clickReset = () => {
        setScore(0);
        setGameInProgress(false);
        updateScore('Please wait for a second, then hit "play" to play again.');

        const shinyTeeth = document.getElementsByClassName("shiny_tooth");
        for (let i = 0; i < shinyTeeth.length; i++) {
            shinyTeeth[i].style.display = "none";
        }

        const updatedTeethPoppedUp = teethPoppedUp.map(() => 0);
        setTeethPoppedUp(updatedTeethPoppedUp);

        delay();
    };
  }

    return (
        <main>
            <div className="not_logged_in" style={{ display: 'none' }}>
                <p className="general_text">Please log in to play.</p>
            </div>
            <div className="logged_in" style={{ display: 'block' }}>
                <div>
                    <p className="purple_text">These teeth are covered in plaque and need to be brushed! Press the "Start" button to play. Click on the teeth to brush them when they pop up. <br /><br />Kids typically have 20 teeth. Once all 20 teeth are brushed, the game is over and you win the joyous and rewarding prize of clean teeth!</p>
                </div>
                <br />
                <div className="general_text">
                    <label className="general_text" htmlFor="count">Teeth brushed</label>
                    <input style={{ width: '550px' }} type="text" id="score" value="--" readOnly />
                </div>
                <br />
                <div className="general_text">
                    <button className="general_text" id="start_button" onClick={handlePlay}>Start</button>
                </div>
                <div className="general_text" id="reset_button">
                    <button className="general_text" onClick={clickReset}>Reset</button>
                </div>
                <br />
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="tooth_button" id="0" onClick={() => handleClick(0)}>
                                        <img className="dirty_tooth" id="t0" src="gross_tooth.png" height="100" width="100" alt="" />
                                        <img className="shiny_tooth" src="shiny_tooth_1.png" height="100" width="100" alt="" />
                                        <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100">
                                            <circle cx="50" cy="50" r="50" align="center" fill="#6e1e64" />
                                        </svg>
                                    </div>
                                </td>
                                <td>
                                    <div className="tooth_button" id="1" onClick={() => handleClick(0)}>
                                        <img className="dirty_tooth" id="t1" src="gross_tooth.png" height="100" width="100" alt="" />
                                        <img className="shiny_tooth" src="shiny_tooth_2.png" height="100" width="100" alt="" />
                                        <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100">
                                            <circle cx="50" cy="50" r="50" align="center" fill="#6e1e64" />
                                        </svg>
                                    </div>
                                </td>
                                <td>
                                    <div className="tooth_button" id="2" onClick={() => handleClick(0)}>
                                        <img className="dirty_tooth" id="t2" src="gross_tooth.png" height="100" width="100" alt="" />
                                        <img className="shiny_tooth" src="shiny_tooth_3.png" height="100" width="100" alt="" />
                                        <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100">
                                            <circle cx="50" cy="50" r="50" align="center" fill="#6e1e64" />
                                        </svg>
                                    </div>
                                </td>
                                <td>
                                    <div className="tooth_button" id="3" onClick={() => handleClick(0)}>
                                        <img className="dirty_tooth" id="t3" src="gross_tooth.png" height="100" width="100" alt="" />
                                        <img className="shiny_tooth" src="shiny_tooth_4.png" height="100" width="100" alt="" />
                                        <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100">
                                            <circle cx="50" cy="50" r="50" align="center" fill="#6e1e64" />
                                        </svg>
                                    </div>
                                </td>
                                <td>
                                    <div className="tooth_button" id="4" onClick={() => handleClick(0)}>
                                        <img className="dirty_tooth" id="t4" src="gross_tooth.png" height="100" width="100" alt="" />
                                        <img className="shiny_tooth" src="shiny_tooth_5.png" height="100" width="100" alt="" />
                                        <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100">
                                            <circle cx="50" cy="50" r="50" align="center" fill="#6e1e64" />
                                        </svg>
                                    </div>
                                </td>
                                <td>
                                    <div className="tooth_button" id="5" onClick={() => handleClick(0)}>
                                        <img className="dirty_tooth" id="t5" src="gross_tooth.png" height="100" width="100" alt="" />
                                        <img className="shiny_tooth" src="shiny_tooth_6.png" height="100" width="100" alt="" />
                                        <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100">
                                            <circle cx="50" cy="50" r="50" align="center" fill="#6e1e64" />
                                        </svg>
                                    </div>
                                </td>
                                <td>
                                    <div className="tooth_button" id="6" onClick={() => handleClick(0)}>
                                        <img className="dirty_tooth" id="t6" src="gross_tooth.png" height="100" width="100" alt="" />
                                        <img className="shiny_tooth" src="shiny_tooth_7.png" height="100" width="100" alt="" />
                                        <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100">
                                            <circle cx="50" cy="50" r="50" align="center" fill="#6e1e64" />
                                        </svg>
                                    </div>
                                </td>
                                <td>
                                    <div className="tooth_button" id="7" onClick={() => handleClick(0)}>
                                        <img className="dirty_tooth" id="t7" src="gross_tooth.png" height="100" width="100" alt="" />
                                        <img className="shiny_tooth" src="shiny_tooth_8.png" height="100" width="100" alt="" />
                                        <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100">
                                            <circle cx="50" cy="50" r="50" align="center" fill="#6e1e64" />
                                        </svg>
                                    </div>
                                </td>
                                <td>
                                    <div className="tooth_button" id="8" onClick={() => handleClick(0)}>
                                        <img className="dirty_tooth" id="t8" src="gross_tooth.png" height="100" width="100" alt="" />
                                        <img className="shiny_tooth" src="shiny_tooth_9.png" height="100" width="100" alt="" />
                                        <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100">
                                            <circle cx="50" cy="50" r="50" align="center" fill="#6e1e64" />
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
};

