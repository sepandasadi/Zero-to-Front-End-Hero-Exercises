// ===========================================
// Multi-API Dashboard - STARTER
// TODO: Integrate multiple APIs
// ===========================================

console.log('📊 Dashboard loaded');

// API URLs
const APIS = {
  weather: 'https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true',
  quote: 'https://api.quotable.io/random',
  cat: 'https://catfact.ninja/fact',
  joke: 'https://official-joke-api.appspot.com/random_joke'
};

// DOM Elements
const weatherContent = document.getElementById('weather-content');
const quoteContent = document.getElementById('quote-content');
const catContent = document.getElementById('cat-content');
const jokeContent = document.getElementById('joke-content');

// ===========================================
// TODO 1: Fetch Weather
// ===========================================

async function fetchWeather() {
  // TODO: Fetch weather data
  // Display temperature and conditions
  console.log('TODO: Implement fetchWeather()');
}

// ===========================================
// TODO 2: Fetch Quote
// ===========================================

async function fetchQuote() {
  // TODO: Fetch quote
  // Display quote and author
  console.log('TODO: Implement fetchQuote()');
}

// ===========================================
// TODO 3: Fetch Cat Fact
// ===========================================

async function fetchCatFact() {
  // TODO: Fetch cat fact
  // Display fact
  console.log('TODO: Implement fetchCatFact()');
}

// ===========================================
// TODO 4: Fetch Joke
// ===========================================

async function fetchJoke() {
  // TODO: Fetch joke
  // Display setup and punchline
  console.log('TODO: Implement fetchJoke()');
}

// ===========================================
// TODO 5: Load All Data
// ===========================================

async function loadDashboard() {
  // TODO: Use Promise.allSettled to load all APIs
  // Handle each result independently
  console.log('TODO: Implement loadDashboard()');
}

// ===========================================
// TODO 6: Refresh Individual Card
// ===========================================

function refreshCard(cardName) {
  // TODO: Refresh specific card
  console.log('TODO: Implement refreshCard()');
}

// ===========================================
// TODO 7: Event Listeners
// ===========================================

// TODO: Add click listeners for refresh buttons

// ===========================================
// Initialize
// ===========================================

// TODO: Load all data on page load
// loadDashboard();

console.log('💡 Check hints.md for help!');

