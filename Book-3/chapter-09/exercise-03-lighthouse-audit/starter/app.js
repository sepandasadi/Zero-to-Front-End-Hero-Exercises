// ❌ ISSUE: Render-blocking JavaScript
// This should be deferred or moved to bottom

console.log('App loaded');

// ❌ ISSUE: Large blocking operation on main thread
function heavyCalculation() {
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(i);
  }
  return result;
}

// This runs immediately, blocking page load
heavyCalculation();

// ❌ ISSUE: Inefficient DOM manipulation
window.addEventListener('load', () => {
  // Could be optimized
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.style.border = '1px solid #ddd';
  });
});

// ❌ ISSUE: Unused functions
function unusedFunction1() {
  console.log('This is never called');
}

function unusedFunction2() {
  console.log('This is also never called');
}

function unusedFunction3() {
  console.log('Neither is this');
}

// More unused code...
const unusedArray = [1, 2, 3, 4, 5];
const unusedObject = { a: 1, b: 2, c: 3 };

