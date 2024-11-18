// Counter variables
let bodyCount = 0; // Swipe down
let eyesCount = 0; // Swipe up
let earCount = 0;  // Swipe left
let brainCount = 0; // Swipe right

// DOM references
const bodyCountDisplay = document.getElementById('body-count');
const eyesCountDisplay = document.getElementById('eyes-count');
const earCountDisplay = document.getElementById('ear-count');
const brainCountDisplay = document.getElementById('brain-count');
const floatingTextContainer = document.getElementById('floating-text-container');

// Starting touch coordinates
let startX = 0;
let startY = 0;

// Detect swipe direction
document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
});

document.addEventListener('touchend', (e) => {
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    // Determine swipe direction
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 50) {
            updateCounter('brain', endX, endY); // Swipe right
        } else if (diffX < -50) {
            updateCounter('ear', endX, endY); // Swipe left
        }
    } else {
        if (diffY > 50) {
            updateCounter('body', endX, endY); // Swipe down
        } else if (diffY < -50) {
            updateCounter('eyes', endX, endY); // Swipe up
        }
    }
});

// Update counters and show floating "+1" animation
function updateCounter(type, x, y) {
    let text;
    if (type === 'body') {
        bodyCount++;
        bodyCountDisplay.textContent = bodyCount;
        text = '+1';
    } else if (type === 'eyes') {
        eyesCount++;
        eyesCountDisplay.textContent = eyesCount;
        text = '+1';
    } else if (type === 'ear') {
        earCount++;
        earCountDisplay.textContent = earCount;
        text = '+1';
    } else if (type === 'brain') {
        brainCount++;
        brainCountDisplay.textContent = brainCount;
        text = '+1';
    }

    showFloatingText(text, x, y);
}

// Show floating "+1" text near swipe location
function showFloatingText(text, x, y) {
    const floatingText = document.createElement('div');
    floatingText.className = 'floating-text';
    floatingText.textContent = text;
    floatingText.style.left = `${x}px`;
    floatingText.style.top = `${y}px`;
    floatingTextContainer.appendChild(floatingText);

    // Remove text after animation
    floatingText.addEventListener('animationend', () => {
        floatingText.remove();
    });
}