let startTime, updatedTime, difference;
let tInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        startStopButton.textContent = 'Stop';
        startStopButton.style.background = '#f44336';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopButton.textContent = 'Start';
        startStopButton.style.background = '#4caf50';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    display.textContent = '00:00:00.00';
    difference = 0;
    running = false;
    startStopButton.textContent = 'Start';
    startStopButton.style.background = '#4caf50';
    laps.innerHTML = '';
    lapCount = 0;
}

function lap() {
    if (running) {
        lapCount++;
        const lapTime = document.createElement('div');
        lapTime.className = 'lap';
        lapTime.textContent = `Lap ${lapCount}: ${display.textContent}`;
        laps.appendChild(lapTime);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.textContent =
        (hours ? (hours > 9 ? hours : '0' + hours) : '00') + ':' +
        (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' +
        (seconds > 9 ? seconds : '0' + seconds) + '.' +
        (milliseconds > 9 ? milliseconds : '0' + milliseconds);
}
