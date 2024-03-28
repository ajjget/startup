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
        setTimeout(() => {
            tooth.classList.remove('up');
        }, time);
    }

    function playGame() {
        startButton.disabled = true;

        while (count <= 32) {
            setTimeout(() => {
                showTooth();
            }, 1500);   // maybe change 1500 in future to be random between 500-1000
        }
    }

    function resetGame() {
        scoreDisplay.value = 0;
        count = 0;
        activeTeeth = 0;
        startButton.disabled = false;
    }

});