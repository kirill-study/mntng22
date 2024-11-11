// Variables to keep count of each tap type
let bodyCount = 0;
let eyesCount = 0;
let earCount = 0;
let brainCount = 0;

// Reference to DOM elements
const bodyBtn = document.getElementById('body-btn');
const eyesBtn = document.getElementById('eyes-btn');
const earBtn = document.getElementById('ear-btn');
const brainBtn = document.getElementById('brain-btn');

const bodyCountDisplay = document.getElementById('body-count');
const eyesCountDisplay = document.getElementById('eyes-count');
const earCountDisplay = document.getElementById('ear-count');
const brainCountDisplay = document.getElementById('brain-count');

// Event Listeners for each button
bodyBtn.addEventListener('click', () => {
    bodyCount++;
    bodyCountDisplay.textContent = bodyCount;
});

eyesBtn.addEventListener('click', () => {
    eyesCount++;
    eyesCountDisplay.textContent = eyesCount;
});

earBtn.addEventListener('click', () => {
    earCount++;
    earCountDisplay.textContent = earCount;
});

brainBtn.addEventListener('click', () => {
    brainCount++;
    brainCountDisplay.textContent = brainCount;
});
