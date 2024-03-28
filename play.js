document.addEventListener('DOMContentLoaded', (event) => {
    const startButton = document.getElementById('start_button');
    const resetButton = document.getElementById('reset_button');
    const scoreDisplay = document.getElementById('score_display');
    const teeth = document.querySelectorAll('.tooth_button');

    let count = 0;
    let activeTeeth = 0;

    function getRandomTooth(teeth) {
        const i = Math.floor(Math.random() * teeth.length);
        return teeth[i];
    }

    function showTooth() {
        const time = randomTime(500, 1500);
        const tooth = getRandomTooth(teeth);
        tooth.classList.add('up');
        let dirty_tooth_img = document.createElement('dirty_tooth_img');
        dirty_tooth_image.src = "https://cdn-icons-png.freepik.com/512/2140/2140042.png"
        tooth.appendChild(dirty_tooth_img);
        setTimeout(() => {
            tooth.classList.remove('up');
        }, time);
    }

    function playGame() {
        startButton.disabled = true;
        console.log("in play game");

        while (count <= 32) {
            console.log("showing tooth...");
            setTimeout(() => {
                showTooth();
            }, 1500);   // maybe change 1500 in future to be random between 500-1000
        }

        endGame();
    }

    function whack() {

    }

    function resetGame() {
        scoreDisplay.value = 0;
        count = 0;
        activeTeeth = 0;
        startButton.disabled = false;
    }

    function endGame() {

    }

    startButton.addEventListener('click', playGame());
    tooth.forEach(tooth => tooth.addEventListener('click', whack()));
});