const circle = document.querySelector('.circle');
const startStopButton = document.getElementById('start-stop');
const timerDisplay = document.getElementById('timer');
const shapeSelector = document.getElementById('shape-selector');
const themeSelector = document.getElementById('theme-selector');

let animationInterval;
let isRunning = false;
let currentShape = 'circle';
let currentShapeColor = '#1e90ff'; // Default shape color

const breathingPatterns = {
    box: { inhale: 4, hold: 4, exhale: 4, hold2: 4 }, 
    fourSevenEight: { inhale: 4, hold: 7, exhale: 8, hold2: 0 } 
};

let currentPattern = breathingPatterns.box;

const shapes = {
    circle: 'border-radius: 50%',
    square: 'border-radius: 0',
    triangle: 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%)',
    diamond: 'clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    star: 'clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
};

const shapeColors = {
    blue: '#1e90ff',
    green: '#2ecc71',
    red: '#e74c3c',
    purple: '#9b59b6',
    orange: '#e67e22'
};

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

function changeShape() {
    const shapeKeys = Object.keys(shapes);
    const currentIndex = shapeKeys.indexOf(currentShape);
    const nextIndex = (currentIndex + 1) % shapeKeys.length;
    currentShape = shapeKeys[nextIndex];
    circle.setAttribute('style', `${shapes[currentShape]}; background-color: ${currentShapeColor};`);
}

function changeShapeColor() {
    const colorKeys = Object.keys(shapeColors);
    const currentIndex = colorKeys.indexOf(Object.keys(shapeColors).find(key => shapeColors[key] === currentShapeColor));
    const nextIndex = (currentIndex + 1) % colorKeys.length;
    currentShapeColor = shapeColors[colorKeys[nextIndex]];
    circle.style.backgroundColor = currentShapeColor;
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

const lightDarkModeButton = document.getElementById('light-dark-mode');

function toggleDarkLightMode() {
    const body = document.body;
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
        lightDarkModeButton.innerHTML = '<i class="fa-solid fa-sun"></i>'; // Sun icon for light mode
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        lightDarkModeButton.innerHTML = '<i class="fa-solid fa-moon"></i>'; // Moon icon for dark mode
    }
}

lightDarkModeButton.addEventListener('click', toggleDarkLightMode);

startStopButton.addEventListener('click', startStop);
shapeSelector.addEventListener('click', changeShape);
themeSelector.addEventListener('click', changeShapeColor); // Updated to change shape color
