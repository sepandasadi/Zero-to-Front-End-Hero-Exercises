// Exercise 03: Geolocation API - SOLUTION

console.log("=== Exercise 3: Geolocation API ===\n");

// Check if Geolocation API is available
function checkGeolocationSupport() {
  return 'geolocation' in navigator;
}

// Get current position (one-time)
function getCurrentLocation() {
  const output = document.getElementById('position-output');
  output.innerHTML = '<p>🔍 Getting location...</p>';
  
  // Check browser support first
  if (!checkGeolocationSupport()) {
    output.innerHTML = '<p class="error">❌ Geolocation not supported by your browser</p>';
    return;
  }
  
  // Options for getCurrentPosition
  const options = {
    enableHighAccuracy: true,  // Use GPS if available
    timeout: 10000,             // Wait max 10 seconds
    maximumAge: 0               // Don't use cached position
  };
  
  // Request position
  navigator.geolocation.getCurrentPosition(
    displayPosition,
    handleError,
    options
  );
}

// Display position information
function displayPosition(position) {
  const { latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed } = position.coords;
  const timestamp = new Date(position.timestamp);
  
  const output = document.getElementById('position-output');
  
  // Build informative display with all available data
  output.innerHTML = `
    <div class="info">
      <span class="info-label">Latitude:</span>
      <span>${latitude.toFixed(6)}°</span>
      
      <span class="info-label">Longitude:</span>
      <span>${longitude.toFixed(6)}°</span>
      
      <span class="info-label">Accuracy:</span>
      <span>${accuracy.toFixed(0)} meters</span>
      
      <span class="info-label">Altitude:</span>
      <span>${altitude !== null ? altitude.toFixed(1) + ' meters' : 'Not available'}</span>
      
      <span class="info-label">Speed:</span>
      <span>${speed !== null ? (speed * 3.6).toFixed(1) + ' km/h' : 'Not available'}</span>
      
      <span class="info-label">Heading:</span>
      <span>${heading !== null ? heading.toFixed(1) + '°' : 'Not available'}</span>
      
      <span class="info-label">Timestamp:</span>
      <span>${timestamp.toLocaleString()}</span>
    </div>
    
    <div style="margin-top: 15px;">
      <a href="https://www.google.com/maps?q=${latitude},${longitude}" target="_blank">
        📍 View on Google Maps
      </a>
    </div>
  `;
  
  console.log('Position obtained:', { latitude, longitude, accuracy });
}

// Handle geolocation errors
function handleError(error) {
  let message = '';
  let details = '';
  
  switch (error.code) {
    case error.PERMISSION_DENIED:
      message = "❌ Permission Denied";
      details = "You denied the request for geolocation. Please allow location access in your browser settings to use this feature.";
      break;
    case error.POSITION_UNAVAILABLE:
      message = "❌ Position Unavailable";
      details = "Location information is unavailable. This could be due to network issues or location services being disabled.";
      break;
    case error.TIMEOUT:
      message = "❌ Timeout";
      details = "The request to get your location timed out. Please try again.";
      break;
    default:
      message = "❌ Unknown Error";
      details = "An unknown error occurred while getting your location.";
  }
  
  const output = document.getElementById('position-output') || 
                 document.getElementById('watch-output') || 
                 document.getElementById('distance-output');
  
  output.innerHTML = `
    <div class="error">
      <strong>${message}</strong>
      <p>${details}</p>
      <p><small>Error code: ${error.code}</small></p>
    </div>
  `;
  
  console.error('Geolocation error:', error.code, error.message);
}

// Watch position (continuous tracking)
let watchId = null;
let watchCount = 0;

function startWatching() {
  const output = document.getElementById('watch-output');
  const indicator = document.getElementById('watching-indicator');
  
  if (!checkGeolocationSupport()) {
    output.innerHTML = '<p class="error">❌ Geolocation not supported</p>';
    return;
  }
  
  if (watchId !== null) {
    console.log('Already watching position');
    return;
  }
  
  output.innerHTML = '<p>👀 Starting to watch position...</p>';
  watchCount = 0;
  
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  // watchPosition calls the callback every time position changes
  watchId = navigator.geolocation.watchPosition(
    (position) => {
      watchCount++;
      const { latitude, longitude, accuracy } = position.coords;
      
      output.innerHTML = `
        <div class="info">
          <span class="info-label">Update Count:</span>
          <span>${watchCount}</span>
          
          <span class="info-label">Latitude:</span>
          <span>${latitude.toFixed(6)}°</span>
          
          <span class="info-label">Longitude:</span>
          <span>${longitude.toFixed(6)}°</span>
          
          <span class="info-label">Accuracy:</span>
          <span>${accuracy.toFixed(0)} meters</span>
          
          <span class="info-label">Time:</span>
          <span>${new Date().toLocaleTimeString()}</span>
        </div>
      `;
      
      console.log(`Position update ${watchCount}:`, latitude, longitude);
    },
    handleError,
    options
  );
  
  // Update UI
  indicator.innerHTML = '<span class="watching">Watching</span>';
  document.getElementById('watch-start-btn').disabled = true;
  document.getElementById('watch-stop-btn').disabled = false;
  
  console.log('Started watching position, watchId:', watchId);
}

function stopWatching() {
  if (watchId === null) {
    console.log('Not currently watching');
    return;
  }
  
  // Clear the watch
  navigator.geolocation.clearWatch(watchId);
  watchId = null;
  
  // Update UI
  const indicator = document.getElementById('watching-indicator');
  indicator.innerHTML = '';
  document.getElementById('watch-start-btn').disabled = false;
  document.getElementById('watch-stop-btn').disabled = true;
  
  const output = document.getElementById('watch-output');
  output.innerHTML += '<p>⏹ Stopped watching position</p>';
  
  console.log('Stopped watching position');
}

// Calculate distance using Haversine formula
// This calculates the great-circle distance between two points on a sphere
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  
  // Convert degrees to radians
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const radLat1 = toRadians(lat1);
  const radLat2 = toRadians(lat2);
  
  // Haversine formula
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(radLat1) * Math.cos(radLat2) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  const distance = R * c; // Distance in kilometers
  
  return distance;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Calculate distance to New York City
function calculateDistanceToNYC() {
  const NYC_LAT = 40.7128;
  const NYC_LON = -74.0060;
  const output = document.getElementById('distance-output');
  
  output.innerHTML = '<p>🔍 Getting your location...</p>';
  
  if (!checkGeolocationSupport()) {
    output.innerHTML = '<p class="error">❌ Geolocation not supported</p>';
    return;
  }
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      
      // Calculate distance
      const distanceKm = calculateDistance(latitude, longitude, NYC_LAT, NYC_LON);
      const distanceMiles = distanceKm * 0.621371; // Convert to miles
      
      output.innerHTML = `
        <div class="info">
          <span class="info-label">Your Location:</span>
          <span>${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°</span>
          
          <span class="info-label">NYC Location:</span>
          <span>${NYC_LAT}°, ${NYC_LON}°</span>
          
          <span class="info-label">Distance:</span>
          <span>${distanceKm.toFixed(2)} km (${distanceMiles.toFixed(2)} miles)</span>
        </div>
      `;
      
      console.log(`Distance to NYC: ${distanceKm.toFixed(2)} km`);
    },
    handleError
  );
}

// Set up event listeners
document.getElementById('get-position-btn').addEventListener('click', getCurrentLocation);
document.getElementById('watch-start-btn').addEventListener('click', startWatching);
document.getElementById('watch-stop-btn').addEventListener('click', stopWatching);
document.getElementById('calculate-distance-btn').addEventListener('click', calculateDistanceToNYC);

// Initial log
console.log("📍 Geolocation Demo Ready!");
console.log("Geolocation supported:", checkGeolocationSupport());
console.log("\n💡 Tips:");
console.log("- You must allow location permission when prompted");
console.log("- HTTPS required (or localhost for testing)");
console.log("- Chrome DevTools → Sensors tab to simulate locations");
console.log("- Mobile devices typically more accurate than desktop");

// BONUS: Detect system location permission status (modern browsers)
if (navigator.permissions) {
  navigator.permissions.query({ name: 'geolocation' }).then((result) => {
    console.log(`Current permission: ${result.state}`);
    
    result.addEventListener('change', () => {
      console.log(`Permission changed to: ${result.state}`);
    });
  });
}

// BONUS: Use browser's preferred accuracy
function getHighAccuracyPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}

// BONUS: Get low accuracy (faster, less battery)
function getLowAccuracyPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 300000 // Accept 5-minute old position
      }
    );
  });
}
