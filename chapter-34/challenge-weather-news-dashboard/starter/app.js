// ===========================================
// Weather & News Dashboard - STARTER
// TODO: Complete the challenge
// ===========================================

console.log('🌤️ Dashboard loaded');

// API Keys - ADD YOUR KEYS HERE
const WEATHER_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const NEWS_API_KEY = 'YOUR_NEWSAPI_KEY';

// API URLs
const WEATHER_BASE = 'https://api.openweathermap.org/data/2.5';
const NEWS_BASE = 'https://newsapi.org/v2';

// DOM Elements
const cityInput = document.getElementById('city-input');
const weatherSearch = document.getElementById('weather-search');
const weatherContent = document.getElementById('weather-content');
const forecastContent = document.getElementById('forecast-content');
const categorySelect = document.getElementById('category-select');
const newsContent = document.getElementById('news-content');
const prevPage = document.getElementById('prev-page');
const nextPage = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

// State
let currentPage = 1;
let currentCategory = 'general';

// ===========================================
// TODO: Implement Weather Functions
// ===========================================

async function fetchWeather(city) {
  // TODO: Fetch current weather
  console.log('TODO: Implement fetchWeather()');
}

async function fetchForecast(city) {
  // TODO: Fetch 5-day forecast
  console.log('TODO: Implement fetchForecast()');
}

function displayWeather(data) {
  // TODO: Display weather data
  console.log('TODO: Implement displayWeather()');
}

function displayForecast(data) {
  // TODO: Display forecast
  console.log('TODO: Implement displayForecast()');
}

// ===========================================
// TODO: Implement News Functions
// ===========================================

async function fetchNews(category, page) {
  // TODO: Fetch news headlines
  console.log('TODO: Implement fetchNews()');
}

function displayNews(articles) {
  // TODO: Display news articles
  console.log('TODO: Implement displayNews()');
}

function createArticleCard(article) {
  // TODO: Create article card
  console.log('TODO: Implement createArticleCard()');
}

// ===========================================
// TODO: Event Listeners
// ===========================================

// Weather search
// weatherSearch.addEventListener('submit', (e) => {
//   e.preventDefault();
//   // Fetch weather
// });

// Category change
// categorySelect.addEventListener('change', (e) => {
//   // Fetch news with new category
// });

// Pagination
// prevPage.addEventListener('click', () => {
//   // Load previous page
// });

// nextPage.addEventListener('click', () => {
//   // Load next page
// });

// ===========================================
// TODO: Initialize
// ===========================================

// TODO: Load initial data
// fetchNews('general', 1);

console.log('💡 Add your API keys in app.js!');
console.log('💡 Check hints.md for detailed guidance!');

