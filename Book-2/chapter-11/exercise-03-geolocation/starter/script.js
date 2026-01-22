// Exercise 03: Geolocation API - STARTER CODE

console.log("=== Exercise 3: Geolocation API ===\n");

// TODO: Check if Geolocation API is available
function checkGeolocationSupport() {
  // Return true if 'geolocation' in navigator
}

// TODO: Get current position (one-time)
function getCurrentLocation() {
  const output = document.getElementById('position-output');
  output.innerHTML = '<p>Getting location...</p>';
  
  // Check support
  
  // Use navigator.geolocation.getCurrentPosition()
  // Success callback: display position
  // Error callback: display error
}

// TODO: Display position information
function displayPosition(position) {
  const { latitude, longitude, accuracy, altitude, speed } = position.coords;
  const timestamp = new Date(position.timestamp);
  
  // TODO: Create HTML to display all information
  
}

// TODO: Handle geolocation errors
function handleError(error) {
  // error.code: 1 = PERMISSION_DENIED, 2 = POSITION_UNAVAILABLE, 3 = TIMEOUT
  let message = '';
  
  switch (error.code) {
    case error.PERMISSION_DENIED:
      message = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      message = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      message = "The request to get user location timed out.";
      break;
    default:
      message = "An unknown error occurred.";
  }
  
  // TODO: Display error message
}

// TODO: Watch position (continuous tracking)
let watchId = null;

function startWatching() {
  // TODO: Use watchPosition()
  // Update display on each position change
  // Store watchId for later clearing
}

function stopWatching() {
  // TODO: clearWatch(watchId)
  // Update UI
}

// TODO: Calculate distance using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  // TODO: Implement Haversine formula
  // Return distance in kilometers
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// TODO: Calculate distance to NYC
function calculateDistanceToNYC() {
  const NYC_LAT = 40.7128;
  const NYC_LON = -74.0060;
  
  // TODO: Get current position
  // Calculate distance
  // Display result
}

// Set up event listeners
document.getElementById('get-position-btn').addEventListener('click', getCurrentLocation);
document.getElementById('watch-start-btn').addEventListener('click', startWatching);
document.getElementById('watch-stop-btn').addEventListener('click', stopWatching);
document.getElementById('calculate-distance-btn').addEventListener('click', calculateDistanceToNYC);

console.log("Click 'Get My Location' to start!");
console.log("Note: You must grant permission to use geolocation.");
