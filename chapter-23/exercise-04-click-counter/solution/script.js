// Exercise 04: Interactive Click Counter - SOLUTION
// Complete solution with all features and bonuses

// ========================================
// Task 1: Basic Counter Setup
// ========================================

// Select HTML elements
const countDisplay = document.getElementById('count-display');
const incrementBtn = document.getElementById('increment-btn');
const decrementBtn = document.getElementById('decrement-btn');
const resetBtn = document.getElementById('reset-btn');
const customInput = document.getElementById('custom-input');
const customBtn = document.getElementById('custom-btn');

// Statistics elements
const totalClicksDisplay = document.getElementById('total-clicks');
const highestDisplay = document.getElementById('highest');
const lowestDisplay = document.getElementById('lowest');

// Initialize variables
let count = 0;
let totalClicks = 0;
let highest = 0;
let lowest = 0;

// Load saved count from localStorage if available
const savedCount = localStorage.getItem('count');
if (savedCount !== null) {
  count = parseInt(savedCount);
  updateDisplay();
}

// Function to update the display with visual feedback
function updateDisplay() {
  // Update count display
  countDisplay.textContent = count;

  // Add animation
  countDisplay.classList.remove('animate');
  // Force reflow to restart animation
  void countDisplay.offsetWidth;
  countDisplay.classList.add('animate');

  // Change color based on value (Task 5)
  if (count > 0) {
    countDisplay.style.color = '#10b981'; // Green
  } else if (count < 0) {
    countDisplay.style.color = '#ef4444'; // Red
  } else {
    countDisplay.style.color = '#6b7280'; // Gray
  }

  // Update statistics
  updateStatistics();

  // Save to localStorage
  localStorage.setItem('count', count);

  // Check for milestones
  checkMilestone();
}

// Function to update statistics (Task 7)
function updateStatistics() {
  // Update highest
  if (count > highest) {
    highest = count;
    highestDisplay.textContent = highest;
  }

  // Update lowest
  if (count < lowest) {
    lowest = count;
    lowestDisplay.textContent = lowest;
  }

  // Update total clicks
  totalClicksDisplay.textContent = totalClicks;
}

// Function to increment total clicks
function incrementTotalClicks() {
  totalClicks++;
  updateStatistics();
}

// ========================================
// Task 2: Increment Button
// ========================================

incrementBtn.addEventListener('click', function() {
  count++;
  incrementTotalClicks();
  console.log('Incremented to:', count);
  updateDisplay();
});

// ========================================
// Task 3: Decrement Button
// ========================================

decrementBtn.addEventListener('click', function() {
  count--;
  // Optional: Prevent negative numbers
  // if (count < 0) count = 0;
  incrementTotalClicks();
  console.log('Decremented to:', count);
  updateDisplay();
});

// ========================================
// Task 4: Reset Button
// ========================================

resetBtn.addEventListener('click', function() {
  count = 0;
  incrementTotalClicks();
  console.log('Counter reset');
  updateDisplay();
});

// ========================================
// Task 6: Custom Increment
// ========================================

customBtn.addEventListener('click', function() {
  const customValue = parseInt(customInput.value);

  // Validate input
  if (isNaN(customValue)) {
    alert('Please enter a valid number');
    return;
  }

  count += customValue;
  incrementTotalClicks();
  console.log(`Added ${customValue}, new count:`, count);
  updateDisplay();
});

// Allow pressing Enter in the input field
customInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    customBtn.click();
  }
});

// ========================================
// Bonus: Keyboard Controls
// ========================================

document.addEventListener('keydown', function(event) {
  switch(event.key) {
    case 'ArrowUp':
      event.preventDefault();
      incrementBtn.click();
      break;
    case 'ArrowDown':
      event.preventDefault();
      decrementBtn.click();
      break;
    case 'r':
    case 'R':
      resetBtn.click();
      break;
  }
});

// ========================================
// Bonus: Milestone Messages
// ========================================

function checkMilestone() {
  let message = '';

  if (count === 10) {
    message = '🎉 Double digits!';
  } else if (count === 50) {
    message = '🔥 Halfway to 100!';
  } else if (count === 100) {
    message = '💯 Century!';
  } else if (count === -10) {
    message = '❄️ Getting negative!';
  }

  if (message) {
    showMilestone(message);
  }
}

function showMilestone(message) {
  // Create milestone element
  const milestone = document.createElement('div');
  milestone.className = 'milestone';
  milestone.textContent = message;
  document.body.appendChild(milestone);

  // Remove after animation
  setTimeout(() => {
    milestone.remove();
  }, 2000);
}

// ========================================
// Bonus: Double Click Feature
// ========================================

incrementBtn.addEventListener('dblclick', function() {
  count++; // One more for double click
  incrementTotalClicks();
  console.log('Double-click! Added 2 total, new count:', count);
  updateDisplay();
});

decrementBtn.addEventListener('dblclick', function() {
  count--; // One more for double click
  incrementTotalClicks();
  console.log('Double-click! Subtracted 2 total, new count:', count);
  updateDisplay();
});

// ========================================
// Initialize on page load
// ========================================

console.log('Click Counter initialized!');
console.log('Try these keyboard shortcuts:');
console.log('- Arrow Up: Increment');
console.log('- Arrow Down: Decrement');
console.log('- R: Reset');

