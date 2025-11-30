# Challenge Hints: Weather & News Dashboard

## Architecture Overview

```
Dashboard
├── Weather Section
│   ├── City search
│   ├── Current weather
│   └── 5-day forecast
└── News Section
    ├── Category filter
    ├── Search
    ├── Article cards
    └── Pagination
```

## Step 1: Project Setup

**File structure:**
```
challenge-weather-news-dashboard/
├── index.html
├── styles.css
├── app.js
├── weather.js (optional - modular approach)
└── news.js (optional - modular approach)
```

## Step 2: Get API Keys

**OpenWeatherMap:**
1. Sign up at https://openweathermap.org/api
2. Get free API key
3. Wait 10-30 minutes for activation

**NewsAPI:**
1. Sign up at https://newsapi.org/
2. Get free API key (100 requests/day)
3. Available immediately

## Step 3: Weather Implementation

**Current weather:**
```javascript
const WEATHER_API_KEY = 'your_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function fetchWeather(city) {
  const url = `${BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;

  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found');
    }
    throw new Error('Weather API error');
  }

  return await response.json();
}
```

**5-day forecast:**
```javascript
async function fetchForecast(city) {
  const url = `${BASE_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  // Filter for one per day (12:00 PM)
  const daily = data.list.filter(item => item.dt_txt.includes('12:00:00'));

  return daily.slice(0, 5);
}
```

## Step 4: News Implementation

**Top headlines:**
```javascript
const NEWS_API_KEY = 'your_key';
const NEWS_URL = 'https://newsapi.org/v2';

async function fetchNews(category = 'general', page = 1) {
  const url = `${NEWS_URL}/top-headlines?country=us&category=${category}&page=${page}&pageSize=10&apiKey=${NEWS_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status === 'error') {
    throw new Error(data.message);
  }

  return data;
}
```

**Search news:**
```javascript
async function searchNews(query, page = 1) {
  const url = `${NEWS_URL}/everything?q=${encodeURIComponent(query)}&page=${page}&pageSize=10&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

  const response = await fetch(url);
  return await response.json();
}
```

## Step 5: Combine Both Sections

**Load dashboard:**
```javascript
async function loadDashboard() {
  const results = await Promise.allSettled([
    fetchWeather('London'),
    fetchNews('technology')
  ]);

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      if (index === 0) displayWeather(result.value);
      if (index === 1) displayNews(result.value);
    } else {
      console.error('Failed:', result.reason);
    }
  });
}
```

## Step 6: Debounced Search

**Problem:** Too many API calls while typing

**Solution:**
```javascript
let searchTimeout;

function debounce(func, delay = 500) {
  return function(...args) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => func(...args), delay);
  };
}

// Usage
const debouncedSearch = debounce((city) => {
  fetchWeather(city);
}, 500);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

## Step 7: localStorage

**Save preferences:**
```javascript
const preferences = {
  lastCity: 'London',
  units: 'metric',
  newsCategory: 'technology'
};

// Save
localStorage.setItem('preferences', JSON.stringify(preferences));

// Load
const saved = JSON.parse(localStorage.getItem('preferences') || '{}');
const lastCity = saved.lastCity || 'London';
```

## Step 8: Pagination

```javascript
let currentPage = 1;
let totalPages = 1;

async function loadNews(page = 1) {
  const data = await fetchNews('technology', page);

  currentPage = page;
  totalPages = Math.ceil(data.totalResults / 10);

  displayNews(data.articles);
  updatePaginationButtons();
}

function updatePaginationButtons() {
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) loadNews(currentPage - 1);
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) loadNews(currentPage + 1);
});
```

## UI/UX Tips

**Loading states:**
```javascript
function showLoading(sectionId) {
  const section = document.getElementById(sectionId);
  section.innerHTML = `
    <div class="spinner"></div>
    <p>Loading...</p>
  `;
}
```

**Error messages:**
```javascript
function showError(sectionId, message) {
  const section = document.getElementById(sectionId);
  section.innerHTML = `
    <div class="error">
      <p>❌ ${message}</p>
      <button onclick="retry()">Retry</button>
    </div>
  `;
}
```

**Smooth transitions:**
```css
.section {
  opacity: 1;
  transition: opacity 0.3s;
}

.section.loading {
  opacity: 0.5;
}
```

## Rate Limiting

**NewsAPI free tier:** 100 requests/day

**Strategy:**
- Cache results in localStorage
- Don't auto-refresh news too frequently
- Debounce search inputs
- Show cached data while loading fresh data

```javascript
const CACHE_KEY = 'news_cache';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

function getCachedNews() {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);

  // Check if expired
  if (Date.now() - timestamp > CACHE_DURATION) {
    return null;
  }

  return data;
}

function cacheNews(data) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
}
```

## Testing Checklist

**Weather:**
- ✓ Search valid city → Shows weather
- ✓ Search invalid city → Shows error
- ✓ Toggle units → Updates display
- ✓ Forecast shows 5 days

**News:**
- ✓ Loads top headlines
- ✓ Category filter works
- ✓ Search returns results
- ✓ Pagination works
- ✓ Click article → Opens link

**General:**
- ✓ Responsive on mobile
- ✓ Loading states show
- ✓ Errors handled gracefully
- ✓ Works offline (with cache)
- ✓ Preferences persist

---

**Build something you're proud of!** 🎨

