let totalTime = 25 * 60; // 25 minutos em segundos
let breakTime = 5 * 60; // 5 minutos de tempo de descanso
let timeLeft = totalTime;
let timerInterval;
let timerState = 'stopped';
let isWorkPeriod = true;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const displayText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timer-display').textContent = displayText;
}

function startTimer() {
    if (timerState !== 'running') {
        timerInterval = setInterval(function () {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                if (isWorkPeriod) {
                    isWorkPeriod = false;
                    totalTime = breakTime;
                } else {
                    isWorkPeriod = true;
                    totalTime = 25 * 60;
                }
                timeLeft = totalTime;
                updateTimerDisplay();
                startTimer(); 
            }
        }, 1000);
        timerState = 'running';
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerState = 'paused';
}

function resetTimer() {
    clearInterval(timerInterval);
    timerState = 'stopped';
    totalTime = isWorkPeriod ? (25 * 60) : (breakTime);
    timeLeft = totalTime;
    updateTimerDisplay();
}

function playSound() {
    const audio = new Audio('alarme.mp3'); 
    audio.play();
}

function startTimer() {
    if (timerState !== 'running') {
        timerInterval = setInterval(function () {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                if (isWorkPeriod) {
                    isWorkPeriod = false;
                    totalTime = breakTime;
                } else {
                    isWorkPeriod = true;
                    totalTime = 25 * 60;
                }
                timeLeft = totalTime;
                updateTimerDisplay();
                startTimer();

                if (!isWorkPeriod) {
                    playSound();
                }
            }
        }, 1000);
        timerState = 'running';
    }
}

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);

window.onload = function () {
    updateTimerDisplay();
};