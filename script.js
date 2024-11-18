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
    labels: ['ЧУВСТВУЮ', 'ВИЖУ', 'СЛЫШУ', 'ДУМАЮ'], // Categories for swipes
    datasets: [{
        label: 'Swipe Counts',
        data: [0, 0, 0, 0], // Initial counts
        backgroundColor: ['#ff6384', '#ffce56', '#36a2eb', '#4bc0c0'], // Bar colors
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
            updateChart(2); // HEAR
        }
    } else {
        if (diffY > 50) {
            // Swipe down
            updateCounter('eyes', endX, endY, 'SEE');
            updateChart(1); // SEE

        } else if (diffY < -50) {
            updateCounter('body', endX, endY, 'FEEL'); // Swipe up
            updateChart(0); // FEEL
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
    showFloatingText(text, x, y);
}

// Show feedback text at the top
function label2ru(label){
    if (label == "THINK") return 'ДУМАЮ'
    if (label == "FEEL") return 'ЧУВСТВУЮ'
    if (label == "HEAR") return 'СЛЫШУ'
    if (label == "SEE") return 'ВИЖУ'

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
    // Reset animation by removing and re-adding the class
    feedbackText.style.animation = 'none'; // Clear animation
    feedbackText.offsetHeight;             // Trigger reflow
    feedbackText.style.animation = 'fadeOut 1.5s ease-out forwards'; // Restart animation
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
