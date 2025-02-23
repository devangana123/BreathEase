const circle = document.querySelector('.circle');
const startStopButton = document.getElementById('start-stop');
const timerDisplay = document.getElementById('timer');

let animationInterval;
let isRunning = false;

const breathingPatterns = {
    box: { inhale: 4, hold: 4, exhale: 4, hold2: 4 }, 
    fourSevenEight: { inhale: 4, hold: 7, exhale: 8, hold2: 0 } 
};

let currentPattern = breathingPatterns.box;

function startBreathing(pattern) {
    let step = 0;
    const totalTime = pattern.inhale + pattern.hold + pattern.exhale + pattern.hold2;

    function animate() {
        const scale = (time) => Math.sin((Math.PI / 2) * (time / pattern.inhale));

        if (step < pattern.inhale) {
            circle.style.transform = `scale(${1 + scale(step)})`;
            timerDisplay.textContent = `Inhale: ${pattern.inhale - step}s`;
        } else if (step < pattern.inhale + pattern.hold) {
            timerDisplay.textContent = `Hold: ${pattern.inhale + pattern.hold - step}s`;
        } else if (step < pattern.inhale + pattern.hold + pattern.exhale) {
            circle.style.transform = `scale(${1 + scale(pattern.inhale + pattern.hold + pattern.exhale - step)})`;
            timerDisplay.textContent = `Exhale: ${pattern.inhale + pattern.hold + pattern.exhale - step}s`;
        } else {
            timerDisplay.textContent = `Hold: ${totalTime - step}s`;
        }

        step = (step + 1) % totalTime;
    }

    animationInterval = setInterval(animate, 1000);
}

function startStop() {
    if (isRunning) {
        clearInterval(animationInterval);
        startStopButton.textContent = 'Start';
        timerDisplay.textContent = '00:00';
        circle.style.transform = 'scale(1)';
    } else {
        startBreathing(currentPattern);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

document.getElementById('box-breathing').addEventListener('click', () => {
    currentPattern = breathingPatterns.box;
    if (isRunning) {
        clearInterval(animationInterval);
        startBreathing(currentPattern);
    }
});

document.getElementById('four-seven-eight').addEventListener('click', () => {
    currentPattern = breathingPatterns.fourSevenEight;
    if (isRunning) {
        clearInterval(animationInterval);
        startBreathing(currentPattern);
    }
});

startStopButton.addEventListener('click', startStop);
