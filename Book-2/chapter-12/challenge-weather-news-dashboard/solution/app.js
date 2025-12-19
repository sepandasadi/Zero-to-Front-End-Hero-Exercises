// ===========================================
// Weather & News Dashboard - SOLUTION
// ===========================================

console.log('🌤️ Dashboard loaded');

// API Keys
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
let totalPages = 1;
let currentCategory = 'technology';
let currentCity = '';

// ===========================================
// Weather Functions
// ===========================================

async function fetchWeather(city) {
  try {
    const url = `${WEATHER_BASE}/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found');
      } else if (response.status === 401) {
        throw new Error('Invalid API key');
      }
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    currentCity = city;

    return data;

  } catch (error) {
    throw error;
  }
}

async function fetchForecast(city) {
  try {
    const url = `${WEATHER_BASE}/forecast?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    // Get one forecast per day at 12:00 PM
    const daily = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    return daily.slice(0, 5);

  } catch (error) {
    console.error('Forecast error:', error);
    return [];
  }
}

function displayWeather(data) {
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
  const windSpeed = Math.round(data.wind.speed);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  weatherContent.innerHTML = `
    <div class="weather-main">
      <h3 class="city-name">${data.name}, ${data.sys.country}</h3>
      <div class="temperature">${temp}°C</div>
      <p class="weather-description">${description}</p>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" style="width: 80px;">
    </div>
    <div class="weather-details">
      <div class="detail">
        <div class="detail-label">Feels Like</div>
        <div class="detail-value">${feelsLike}°C</div>
      </div>
      <div class="detail">
        <div class="detail-label">Humidity</div>
        <div class="detail-value">${humidity}%</div>
      </div>
      <div class="detail">
        <div class="detail-label">Wind Speed</div>
        <div class="detail-value">${windSpeed} m/s</div>
      </div>
      <div class="detail">
        <div class="detail-label">Pressure</div>
        <div class="detail-value">${data.main.pressure} hPa</div>
      </div>
    </div>
  `;

  console.log('✓ Weather displayed');
}

function displayForecast(forecasts) {
  forecastContent.innerHTML = '';

  forecasts.forEach(forecast => {
    const date = new Date(forecast.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const temp = Math.round(forecast.main.temp);
    const icon = forecast.weather[0].icon;
    const desc = forecast.weather[0].description;

    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `
      <div class="forecast-day">${dayName}</div>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" class="forecast-icon">
      <div class="forecast-temp">${temp}°C</div>
    `;

    forecastContent.appendChild(card);
  });

  console.log(`✓ Forecast displayed (${forecasts.length} days)`);
}

async function loadWeather(city) {
  try {
    weatherContent.innerHTML = '<p class="loading">Loading...</p>';
    forecastContent.innerHTML = '';

    const [weather, forecast] = await Promise.allSettled([
      fetchWeather(city),
      fetchForecast(city)
    ]);

    if (weather.status === 'fulfilled') {
      displayWeather(weather.value);
    } else {
      weatherContent.innerHTML = `<p class="error">❌ ${weather.reason.message}</p>`;
    }

    if (forecast.status === 'fulfilled') {
      displayForecast(forecast.value);
    }

  } catch (error) {
    console.error('Weather error:', error);
    weatherContent.innerHTML = `<p class="error">❌ ${error.message}</p>`;
  }
}

// ===========================================
// News Functions
// ===========================================

async function fetchNews(category, page = 1) {
  try {
    const url = `${NEWS_BASE}/top-headlines?country=us&category=${category}&page=${page}&pageSize=10&apiKey=${NEWS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message || 'Failed to fetch news');
    }

    return data;

  } catch (error) {
    throw error;
  }
}

function displayNews(data) {
  newsContent.innerHTML = '';

  if (!data.articles || data.articles.length === 0) {
    newsContent.innerHTML = '<p class="error">No articles found</p>';
    return;
  }

  data.articles.forEach(article => {
    const card = createArticleCard(article);
    newsContent.appendChild(card);
  });

  // Update pagination
  totalPages = Math.ceil(data.totalResults / 10) || 1;
  updatePagination();

  console.log(`✓ Displayed ${data.articles.length} articles`);
}

function createArticleCard(article) {
  const card = document.createElement('div');
  card.className = 'article-card';

  const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  card.innerHTML = `
    <h3 class="article-title">${article.title}</h3>
    <p class="article-description">${article.description || 'No description available'}</p>
    <div class="article-meta">
      <span class="article-source">${article.source.name}</span>
      <span>${date}</span>
    </div>
    <a href="${article.url}" target="_blank" class="article-link">Read More →</a>
  `;

  return card;
}

async function loadNews(category = currentCategory, page = 1) {
  try {
    newsContent.innerHTML = '<p class="loading">Loading news...</p>';

    currentCategory = category;
    currentPage = page;

    const data = await fetchNews(category, page);
    displayNews(data);

  } catch (error) {
    console.error('News error:', error);
    newsContent.innerHTML = `<p class="error">❌ ${error.message}<br><small>Check your API key or try again later</small></p>`;
  }
}

function updatePagination() {
  prevPage.disabled = currentPage === 1;
  nextPage.disabled = currentPage >= totalPages;
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

// ===========================================
// Event Listeners
// ===========================================

weatherSearch.addEventListener('submit', (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();
  if (city) {
    loadWeather(city);
    cityInput.value = '';
  }
});

categorySelect.addEventListener('change', (e) => {
  loadNews(e.target.value, 1);
});

prevPage.addEventListener('click', () => {
  if (currentPage > 1) {
    loadNews(currentCategory, currentPage - 1);
  }
});

nextPage.addEventListener('click', () => {
  if (currentPage < totalPages) {
    loadNews(currentCategory, currentPage + 1);
  }
});

// ===========================================
// Initialize
// ===========================================

// Check API keys
if (WEATHER_API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
  weatherContent.innerHTML = '<p class="error">⚠️ Please add your OpenWeatherMap API key in app.js</p>';
}

if (NEWS_API_KEY === 'YOUR_NEWSAPI_KEY') {
  newsContent.innerHTML = '<p class="error">⚠️ Please add your NewsAPI key in app.js</p>';
} else {
  // Load initial news
  loadNews('technology', 1);
}

console.log('\n📝 Features:');
console.log('   ✓ Real-time weather for any city');
console.log('   ✓ 5-day weather forecast');
console.log('   ✓ Latest news by category');
console.log('   ✓ News pagination');
console.log('   ✓ Responsive design');
console.log('   ✓ Error handling');
console.log('\n⚠️ Remember to add your API keys!');
console.log('   - OpenWeatherMap: https://openweathermap.org/api');
console.log('   - NewsAPI: https://newsapi.org/');

