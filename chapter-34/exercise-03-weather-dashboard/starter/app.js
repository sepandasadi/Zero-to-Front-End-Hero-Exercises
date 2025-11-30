// ===========================================
// Weather Dashboard - STARTER
// TODO: Complete the weather functions
// ===========================================

console.log('🌤️ Weather Dashboard loaded');

// ⚠️ IMPORTANT: Get your free API key from https://openweathermap.org/api
const API_KEY = 'YOUR_API_KEY_HERE';  // TODO: Add your API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const loadingState = document.getElementById('loading');
const errorState = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const retryBtn = document.getElementById('retry-btn');
const weatherContainer = document.getElementById('weather-container');
const unitToggle = document.getElementById('unit-toggle');

// Weather display elements
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temp = document.getElementById('temp');
const weatherDescription = document.getElementById('weather-description');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const forecastContainer = document.getElementById('forecast-container');

// State
let currentCity = '';
let currentUnits = 'metric';  // metric = Celsius, imperial = Fahrenheit

// ===========================================
// TODO 1: Fetch Current Weather
// ===========================================

async function fetchCurrentWeather(city) {
  // TODO: Implement this function
  // 1. Build URL with city, API key, and units
  // 2. Fetch data
  // 3. Check response.ok
  // 4. Parse JSON
  // 5. Display current weather
  // 6. Handle errors (city not found, network error)

  console.log('TODO: Implement fetchCurrentWeather()');
}

// ===========================================
// TODO 2: Fetch 5-Day Forecast
// ===========================================

async function fetchForecast(city) {
  // TODO: Implement this function
  // 1. Build URL for forecast endpoint
  // 2. Fetch data
  // 3. Parse JSON
  // 4. Filter for daily forecasts (12:00 PM each day)
  // 5. Display forecast cards

  console.log('TODO: Implement fetchForecast()');
}

// ===========================================
// TODO 3: Display Current Weather
// ===========================================

function displayCurrentWeather(data) {
  // TODO: Implement this function
  // 1. Extract data from response
  // 2. Update DOM elements:
  //    - City name
  //    - Temperature
  //    - Weather icon
  //    - Description
  //    - Feels like
  //    - Humidity
  //    - Wind speed

  console.log('TODO: Implement displayCurrentWeather()');
}

// ===========================================
// TODO 4: Display Forecast
// ===========================================

function displayForecast(data) {
  // TODO: Implement this function
  // 1. Clear forecast container
  // 2. Filter data for one reading per day
  // 3. Create forecast card for each day
  // 4. Include: date, icon, temperature

  console.log('TODO: Implement displayForecast()');
}

function createForecastCard(forecast) {
  // TODO: Create and return forecast card HTML
  console.log('TODO: Implement createForecastCard()');
}

// ===========================================
// TODO 5: Helper Functions
// ===========================================

function showLoading() {
  // TODO: Show loading, hide others
}

function hideLoading() {
  // TODO: Hide loading, show weather
}

function showError(message) {
  // TODO: Show error state
}

function hideError() {
  // TODO: Hide error state
}

// ===========================================
// TODO 6: Unit Toggle (°C / °F)
// ===========================================

function toggleUnits() {
  // TODO: Switch between metric and imperial
  // Re-fetch weather with new units
  console.log('TODO: Implement toggleUnits()');
}

// ===========================================
// TODO 7: Event Listeners
// ===========================================

// TODO: Add form submit listener
// searchForm.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const city = cityInput.value.trim();
//   if (city) {
//     await fetchWeather(city);
//   }
// });

// TODO: Add unit toggle listener
// unitToggle.addEventListener('click', toggleUnits);

// TODO: Add retry button listener

// ===========================================
// Initialize
// ===========================================

console.log('⚠️ Don\'t forget to add your API key!');
console.log('💡 Check hints.md for step-by-step help!');

