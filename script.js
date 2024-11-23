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
const feedbackText = document.getElementById('feedback-text');

// Starting touch coordinates
let startX = 0;
let startY = 0;

// Detect swipe direction
document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
});

// Bar chart data
const swipeData = {
    labels: ['ВИЖУ↓', 'СЛЫШУ←', 'ЧУВСТВУЮ↑', 'ДУМАЮ→'], // Categories for swipes
    datasets: [{
        label: 'Swipe Counts',
        data: [0, 0, 0, 0], // Initial counts
        backgroundColor: ['#ffce56', '#36a2eb', '#ff6384', '#4bc0c0'], // Bar colors
        borderRadius: 5, // Rounded bars
        borderWidth: 1
    }]
};

// Bar chart options
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows resizing
    scales: {
        x: {
            ticks: {
                color: 'white' // White text for labels
            },
            grid: {
                display: false // Hide grid lines
            }
        },
        y: {
            ticks: {
                color: 'white', // White text for values
                beginAtZero: true
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.2)' // Light grid lines
            }
        }
    },
    plugins: {
        legend: {
            display: false // Hide legend
        }
    }
};

// Initialize the chart
const ctx = document.getElementById('swipeChart').getContext('2d');
const swipeChart = new Chart(ctx, {
    type: 'bar',
    data: swipeData,
    options: chartOptions
});

// Update chart data on swipe
function updateChart(index) {
    swipeData.datasets[0].data[index]++; // Increment the relevant swipe count
    swipeChart.update(); // Refresh the chart
}

document.addEventListener('touchend', (e) => {
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    // Determine swipe direction
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 50) {
            updateCounter('brain', endX, endY, 'THINK'); // Swipe right
            updateChart(3); // THINK
        } else if (diffX < -50) {
            updateCounter('ear', endX, endY, 'HEAR'); // Swipe left
            updateChart(1); // HEAR
        }
    } else {
        if (diffY > 50) {
            // Swipe down
            updateCounter('eyes', endX, endY, 'SEE');
            updateChart(0); // SEE

        } else if (diffY < -50) {
            updateCounter('body', endX, endY, 'FEEL'); // Swipe up
            updateChart(2); // FEEL
        }
    }
});

// Update counters and show floating "+1" animation
function updateCounter(type, x, y, label) {
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

    showFeedbackText(label);
    showFloatingText(text, x, y, label);
    updateTimer();
}

// Show feedback text at the top
function label2ru(label){
    if (label == "THINK") return 'ДУМАЮ'
    if (label == "FEEL") return 'ЧУВСТВУЮ'
    if (label == "HEAR") return 'СЛЫШУ'
    if (label == "SEE") return 'ВИЖУ'

}
const currentTime = Date.now()
let lastKeyPressTime = 0;

let started = false

let pretimeSinceLastKeyPress;
let prepretimeSinceLastKeyPress;

let preLastKeyPressTime = 0;
let prepreLastKeyPressTime = 0;
let preprepreLastKeyPressTime = 0;

// Show floating "+1" text near swipe location
function showFloatingText(text, x, y, label) {
    const floatingText = document.createElement('div');
    floatingText.className = 'floating-text';
    floatingText.textContent = text;
    floatingText.style.left = `${x}px`;
    floatingText.style.top = `${y}px`;
    if (label == "THINK"){
        floatingText.classList.add("flightblue")
    } 
    if (label == "FEEL") {
        floatingText.classList.add("fpink")
    }
    if (label == "HEAR") {
        floatingText.classList.add("fblue")
    }
    if (label == "SEE") {
        floatingText.classList.add("fyellow")
    }
    floatingTextContainer.appendChild(floatingText);

    // Remove text after animation
    floatingText.addEventListener('animationend', () => {
        floatingText.remove();
    });
}

function showFeedbackText(label) {
    feedbackText.textContent = label2ru(label);
    while (feedbackText.classList.length > 0) {
        feedbackText.classList.remove(feedbackText.classList.item(0));
     }
    if (label == "THINK"){
        
        feedbackText.classList.add("lightblue")
    } 
    if (label == "FEEL") {

        feedbackText.classList.add("pink")

    }
    if (label == "HEAR") {

        feedbackText.classList.add("blue")
    }
    if (label == "SEE") {

        feedbackText.classList.add("yellow")
    }
    const currentTime = Date.now()
    //preprepreLastKeyPressTime = prepreLastKeyPressTime;
    //prepreLastKeyPressTime = preLastKeyPressTime
    preLastKeyPressTime = lastKeyPressTime;
    lastKeyPressTime = currentTime;
    if (pretimeSinceLastKeyPress) {
        document.getElementById('precounterL').textContent = `${formatTime(pretimeSinceLastKeyPress * 1000, true)}`;
}
    if (prepretimeSinceLastKeyPress) {
        document.getElementById('preprecounterL').textContent = `${formatTime(prepretimeSinceLastKeyPress * 1000, true)}`;
}
    if (!started) started = true
    // Reset animation by removing and re-adding the class
    feedbackText.style.animation = 'none'; // Clear animation
    feedbackText.offsetHeight;             // Trigger reflow
    feedbackText.style.animation = 'fadeOut 1.5s ease-out forwards'; // Restart animation
}

if (started) {
    setInterval(updateClock, 1000)
}

let TIMELEFT;

function updateClock() {
    document.getElementById('clock').textContent = `${formatTime(TIMELEFT * 1000, true)}`;
    TIMELEFT -= 1000
}

function startTimer(){
    setInterval(updateTimer, 1000)
}


function updateTimer() {
    const currentTime = Date.now()
    const timeSinceLastKeyPress = (currentTime - lastKeyPressTime) / 1000 // Calculate time since last key press in seconds
    if (lastKeyPressTime != 0){
        document.getElementById('counterL').textContent = `${formatTime(timeSinceLastKeyPress * 1000, true)}`;
        //prepretimeSinceLastKeyPress = (preLastKeyPressTime - prepreLastKeyPressTime) / 1000
        //prepretimeSinceLastKeyPress = pretimeSinceLastKeyPress
        pretimeSinceLastKeyPress = timeSinceLastKeyPress
    }

    

    //if (timerStarted && timeSinceLastKeyPress > longestTimeBetweenPresses) {
      //longestTimeBetweenPresses = timeSinceLastKeyPress
      //document.getElementById('longestTime').textContent = `Longest Time Between Presses: ${longestTimeBetweenPresses.toFixed(2)} seconds`
    //}
}

function formatTime(milliseconds, shortFormat = true) {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
  
    if (shortFormat) {
      return `${String(minutes).padStart(1, '0')}:${String(seconds).padStart(2, '0')}`
    }
  
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  window.onload = function () {
    startTimer();
  }