// ===========================================
// Weather Dashboard - SOLUTION
// ===========================================

console.log('🌤️ Weather Dashboard loaded');

// ⚠️ IMPORTANT: Replace with your API key from https://openweathermap.org/api
const API_KEY = 'YOUR_API_KEY_HERE';
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

const cityName = document.getElementById('city-name');
const currentDate = document.getElementById('current-date');
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
// Fetch Current Weather
// ===========================================

async function fetchCurrentWeather(city) {
  try {
    const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${currentUnits}`;

    console.log(`Fetching current weather for ${city}...`);

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please check the spelling.');
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your API key.');
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    }

    const data = await response.json();
    console.log('✓ Current weather data:', data);

    return data;

  } catch (error) {
    console.error('✗ Failed to fetch current weather:', error);
    throw error;
  }
}

// ===========================================
// Fetch 5-Day Forecast
// ===========================================

async function fetchForecast(city) {
  try {
    const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${currentUnits}`;

    console.log(`Fetching forecast for ${city}...`);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✓ Forecast data:', data);

    return data;

  } catch (error) {
    console.error('✗ Failed to fetch forecast:', error);
    throw error;
  }
}

// ===========================================
// Fetch All Weather Data
// ===========================================

async function fetchWeather(city) {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    showError('Please add your OpenWeatherMap API key in app.js');
    return;
  }

  try {
    showLoading();
    hideError();

    currentCity = city;

    // Fetch both current weather and forecast
    const [currentData, forecastData] = await Promise.all([
      fetchCurrentWeather(city),
      fetchForecast(city)
    ]);

    displayCurrentWeather(currentData);
    displayForecast(forecastData);

    hideLoading();

  } catch (error) {
    hideLoading();
    showError(error.message);
  }
}

// ===========================================
// Display Current Weather
// ===========================================

function displayCurrentWeather(data) {
  const unitSymbol = currentUnits === 'metric' ? '°C' : '°F';
  const speedUnit = currentUnits === 'metric' ? 'km/h' : 'mph';

  // City name
  cityName.textContent = `${data.name}, ${data.sys.country}`;

  // Current date
  const date = new Date();
  currentDate.textContent = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Temperature
  temp.textContent = Math.round(data.main.temp);
  document.querySelector('.unit').textContent = unitSymbol;

  // Weather icon
  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  weatherIcon.alt = data.weather[0].description;

  // Description
  weatherDescription.textContent = data.weather[0].description;

  // Details
  feelsLike.textContent = `${Math.round(data.main.feels_like)}${unitSymbol}`;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${Math.round(data.wind.speed)} ${speedUnit}`;

  console.log('✓ Current weather displayed');
}

// ===========================================
// Display Forecast
// ===========================================

function displayForecast(data) {
  forecastContainer.innerHTML = '';

  // Filter for one forecast per day (around 12:00 PM)
  const dailyForecasts = data.list.filter(item => {
    return item.dt_txt.includes('12:00:00');
  });

  // Take first 5 days
  const forecasts = dailyForecasts.slice(0, 5);

  forecasts.forEach(forecast => {
    const card = createForecastCard(forecast);
    forecastContainer.appendChild(card);
  });

  console.log(`✓ Displayed ${forecasts.length} forecast days`);
}

function createForecastCard(forecast) {
  const unitSymbol = currentUnits === 'metric' ? '°C' : '°F';

  const card = document.createElement('div');
  card.className = 'forecast-card';

  // Parse date
  const date = new Date(forecast.dt * 1000);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // Weather info
  const iconCode = forecast.weather[0].icon;
  const temp = Math.round(forecast.main.temp);
  const description = forecast.weather[0].description;

  card.innerHTML = `
    <div class="forecast-date">${monthDay}</div>
    <div class="forecast-day">${dayName}</div>
    <img
      src="https://openweathermap.org/img/wn/${iconCode}@2x.png"
      alt="${description}"
      class="forecast-icon"
    >
    <div class="forecast-temp">${temp}${unitSymbol}</div>
    <div class="forecast-desc">${description}</div>
  `;

  return card;
}

// ===========================================
// UI State Management
// ===========================================

function showLoading() {
  loadingState.style.display = 'block';
  weatherContainer.style.display = 'none';
  errorState.style.display = 'none';
}

function hideLoading() {
  loadingState.style.display = 'none';
  weatherContainer.style.display = 'block';
}

function showError(message) {
  errorState.style.display = 'block';
  errorMessage.textContent = `❌ ${message}`;
  weatherContainer.style.display = 'none';
  loadingState.style.display = 'none';
}

function hideError() {
  errorState.style.display = 'none';
}

// ===========================================
// Unit Toggle (°C / °F)
// ===========================================

function toggleUnits() {
  if (currentUnits === 'metric') {
    currentUnits = 'imperial';
    unitToggle.textContent = '°C';
  } else {
    currentUnits = 'metric';
    unitToggle.textContent = '°F';
  }

  console.log(`Units toggled to: ${currentUnits}`);

  // Re-fetch weather with new units
  if (currentCity) {
    fetchWeather(currentCity);
  }
}

// ===========================================
// Event Listeners
// ===========================================

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();
  if (city) {
    await fetchWeather(city);
    cityInput.value = '';
  }
});

unitToggle.addEventListener('click', toggleUnits);

retryBtn.addEventListener('click', () => {
  if (currentCity) {
    fetchWeather(currentCity);
  } else {
    hideError();
  }
});

// ===========================================
// Initialize
// ===========================================

// Check for API key
if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
  console.warn('⚠️ Please add your OpenWeatherMap API key!');
  console.log('Get a free API key at: https://openweathermap.org/api');
} else {
  console.log('✓ API key configured');
  // Optionally load default city
  // fetchWeather('London');
}

console.log('\n📝 Features:');
console.log('   ✓ Search any city');
console.log('   ✓ Current weather with icon');
console.log('   ✓ 5-day forecast');
console.log('   ✓ Toggle °C / °F');
console.log('   ✓ Error handling');
console.log('\n💡 Open Network tab to see API requests!');

