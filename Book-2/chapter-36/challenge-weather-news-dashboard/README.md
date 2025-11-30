# Chapter 36: Challenge Project - Framework Showdown

## Multi-Framework Dashboard

**Difficulty:** Advanced
**Estimated Time:** 6-10 hours
**Concepts:** All framework fundamentals, API integration, state management, routing

---

## Project Overview

Build a **Weather & News Dashboard** that displays real-time weather and news articles. You'll implement this project in **your chosen framework** (React, Vue, or Angular).

This project combines everything you've learned:
- Component architecture
- State management
- API integration
- User interactions
- Local storage
- Responsive design
- Error handling
- Loading states

---

## Project Requirements

### Core Features (Must Have)

#### 1. Weather Section
- **Current weather** for user's location (or selected city)
- Display:
  - Temperature (°F and °C toggle)
  - Weather condition (sunny, rainy, etc.)
  - Weather icon
  - Humidity
  - Wind speed
  - "Feels like" temperature
- **5-day forecast** with daily highs/lows
- **City search** – look up weather for any city
- **Save favorite cities** (up to 5)
- **Auto-detect location** (with permission)

#### 2. News Section
- **Top headlines** from selected category
- Display:
  - Article title
  - Source
  - Published date (relative time: "2 hours ago")
  - Thumbnail image
  - Description
  - Link to full article
- **Categories:** General, Technology, Business, Sports, Entertainment
- **Pagination** (10 articles per page)
- **Search news** by keyword

#### 3. User Preferences
- **Theme toggle:** Light / Dark mode
- **Temperature units:** Celsius / Fahrenheit
- **News category preference:** Default category on load
- **Saved cities:** Persist favorite weather locations
- **All preferences saved to localStorage**

#### 4. UI/UX Requirements
- **Responsive design:** Works on mobile, tablet, desktop
- **Loading states:** Show spinners when fetching data
- **Error handling:** Graceful error messages (network, API limits, etc.)
- **Empty states:** Show helpful messages when no data
- **Smooth transitions:** Fade in content, smooth theme switching
- **Professional design:** Clean, modern interface

---

## Technical Specifications

### APIs to Use

#### 1. Weather API
**OpenWeatherMap API** (Free tier)
- Sign up: https://openweathermap.org/api
- Free tier: 1,000 calls/day
- Endpoints:
  - Current weather: `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}`
  - 5-day forecast: `https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}`
  - By coordinates: `?lat={lat}&lon={lon}&appid={API_KEY}`

#### 2. News API
**NewsAPI.org** (Free tier)
- Sign up: https://newsapi.org/
- Free tier: 100 requests/day
- Endpoints:
  - Top headlines: `https://newsapi.org/v2/top-headlines?country=us&category={category}&apiKey={API_KEY}`
  - Search: `https://newsapi.org/v2/everything?q={query}&apiKey={API_KEY}`

#### Alternative (No signup needed for testing):
- **JSONPlaceholder** for mock data during development
- **Local JSON files** with sample data

### State Management

**React:**
- Use Context API for theme and preferences
- Local state (useState) for weather and news data
- Optional: Use Zustand or Redux Toolkit for practice

**Vue:**
- Use Pinia or Composition API with provide/inject
- Reactive refs for component state

**Angular:**
- Services with dependency injection
- RxJS observables for async data

---

## File Structure

### React Structure

```
weather-news-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Weather/
│   │   │   ├── CurrentWeather.jsx
│   │   │   ├── Forecast.jsx
│   │   │   ├── CitySearch.jsx
│   │   │   └── FavoriteCities.jsx
│   │   ├── News/
│   │   │   ├── NewsList.jsx
│   │   │   ├── NewsCard.jsx
│   │   │   ├── CategoryFilter.jsx
│   │   │   └── Pagination.jsx
│   │   ├── UI/
│   │   │   ├── Header.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorMessage.jsx
│   │   └── Settings/
│   │       └── Preferences.jsx
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   └── PreferencesContext.jsx
│   ├── hooks/
│   │   ├── useFetch.js
│   │   ├── useLocalStorage.js
│   │   └── useGeolocation.js
│   ├── services/
│   │   ├── weatherAPI.js
│   │   └── newsAPI.js
│   ├── utils/
│   │   ├── dateHelpers.js
│   │   └── tempConverter.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles/
│       ├── App.css
│       ├── Weather.css
│       └── News.css
└── package.json
```

### Vue Structure

```
weather-news-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── Weather/
│   │   ├── News/
│   │   ├── UI/
│   │   └── Settings/
│   ├── composables/
│   │   ├── useFetch.js
│   │   ├── useLocalStorage.js
│   │   └── useGeolocation.js
│   ├── stores/
│   │   ├── preferences.js
│   │   └── weather.js
│   ├── services/
│   │   ├── weatherAPI.js
│   │   └── newsAPI.js
│   ├── utils/
│   ├── App.vue
│   └── main.js
└── package.json
```

---

## Implementation Guide

### Phase 1: Project Setup (30 min)

#### React with Vite
```bash
npm create vite@latest weather-news-dashboard -- --template react
cd weather-news-dashboard
npm install
```

#### Vue with Vite
```bash
npm create vite@latest weather-news-dashboard -- --template vue
cd weather-news-dashboard
npm install
npm install pinia  # Optional for state management
```

#### Additional Dependencies
```bash
# For date formatting (optional)
npm install date-fns

# For icons (optional)
npm install react-icons  # React
npm install @iconify/vue  # Vue
```

### Phase 2: API Services (1 hour)

Create abstracted API services:

```javascript
// services/weatherAPI.js
const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getCurrentWeather(city) {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return response.json();
}

export async function getForecast(city) {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }

  return response.json();
}

export async function getWeatherByCoords(lat, lon) {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return response.json();
}
```

```javascript
// services/newsAPI.js
const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://newsapi.org/v2';

export async function getTopHeadlines(category = 'general', country = 'us') {
  const response = await fetch(
    `${BASE_URL}/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }

  return response.json();
}

export async function searchNews(query) {
  const response = await fetch(
    `${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to search news');
  }

  return response.json();
}
```

### Phase 3: Custom Hooks/Composables (1 hour)

```javascript
// hooks/useLocalStorage.js (React)
import { useState, useEffect } from 'react';

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

```javascript
// hooks/useGeolocation.js
import { useState, useEffect } from 'react';

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(new Error('Geolocation is not supported'));
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
  }, []);

  return { location, error, loading };
}
```

### Phase 4: Weather Components (2-3 hours)

#### CurrentWeather Component (React Example)

```jsx
// components/Weather/CurrentWeather.jsx
import { useState, useEffect } from 'react';
import { getCurrentWeather } from '../../services/weatherAPI';

function CurrentWeather({ city, unit = 'metric' }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCurrentWeather(city);
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city]);

  if (loading) return <div className="loading">Loading weather...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!weather) return null;

  const temp = unit === 'metric'
    ? Math.round(weather.main.temp)
    : Math.round(weather.main.temp * 9/5 + 32);
  const tempUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="current-weather">
      <div className="location">
        <h2>{weather.name}, {weather.sys.country}</h2>
      </div>

      <div className="weather-main">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <div className="temperature">{temp}{tempUnit}</div>
        <div className="description">{weather.weather[0].description}</div>
      </div>

      <div className="weather-details">
        <div className="detail">
          <span className="label">Feels like</span>
          <span className="value">
            {unit === 'metric'
              ? Math.round(weather.main.feels_like)
              : Math.round(weather.main.feels_like * 9/5 + 32)
            }{tempUnit}
          </span>
        </div>

        <div className="detail">
          <span className="label">Humidity</span>
          <span className="value">{weather.main.humidity}%</span>
        </div>

        <div className="detail">
          <span className="label">Wind</span>
          <span className="value">{weather.wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
```

### Phase 5: News Components (2-3 hours)

#### NewsList Component (React Example)

```jsx
// components/News/NewsList.jsx
import { useState, useEffect } from 'react';
import { getTopHeadlines } from '../../services/newsAPI';
import NewsCard from './NewsCard';
import CategoryFilter from './CategoryFilter';
import Pagination from './Pagination';

function NewsList() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('general');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);
        const data = await getTopHeadlines(category);
        setArticles(data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [category]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  if (loading) return <div className="loading">Loading news...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="news-list">
      <CategoryFilter
        currentCategory={category}
        onCategoryChange={setCategory}
      />

      <div className="articles">
        {currentArticles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default NewsList;
```

#### NewsCard Component

```jsx
// components/News/NewsCard.jsx
import { formatDistanceToNow } from 'date-fns';

function NewsCard({ article }) {
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true
  });

  return (
    <article className="news-card">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="news-image"
        />
      )}

      <div className="news-content">
        <h3 className="news-title">{article.title}</h3>

        <div className="news-meta">
          <span className="news-source">{article.source.name}</span>
          <span className="news-time">{timeAgo}</span>
        </div>

        <p className="news-description">{article.description}</p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="news-link"
        >
          Read more →
        </a>
      </div>
    </article>
  );
}

export default NewsCard;
```

### Phase 6: Theme & Preferences (1-2 hours)

```jsx
// context/ThemeContext.jsx
import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [tempUnit, setTempUnit] = useLocalStorage('tempUnit', 'metric');
  const [newsCategory, setNewsCategory] = useLocalStorage('newsCategory', 'general');
  const [favoriteCities, setFavoriteCities] = useLocalStorage('favoriteCities', []);

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  function toggleTempUnit() {
    setTempUnit(tempUnit === 'metric' ? 'imperial' : 'metric');
  }

  function addFavoriteCity(city) {
    if (favoriteCities.length < 5 && !favoriteCities.includes(city)) {
      setFavoriteCities([...favoriteCities, city]);
    }
  }

  function removeFavoriteCity(city) {
    setFavoriteCities(favoriteCities.filter(c => c !== city));
  }

  const value = {
    theme,
    toggleTheme,
    tempUnit,
    toggleTempUnit,
    newsCategory,
    setNewsCategory,
    favoriteCities,
    addFavoriteCity,
    removeFavoriteCity
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={`app ${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### Phase 7: Styling (2-3 hours)

```css
/* App.css */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #333333;
  --text-secondary: #666666;
  --border-color: #dddddd;
  --accent: #3b82f6;
  --accent-hover: #2563eb;
  --success: #10b981;
  --error: #ef4444;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.app.dark {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2a2a2a;
  --text-primary: #ffffff;
  --text-secondary: #cccccc;
  --border-color: #444444;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background 0.3s, color 0.3s;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Weather Styles */
.current-weather {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: var(--shadow);
}

.weather-main {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
}

.temperature {
  font-size: 3rem;
  font-weight: bold;
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.detail {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail .label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.detail .value {
  font-size: 1.25rem;
  font-weight: 600;
}

/* News Styles */
.news-card {
  background: var(--bg-secondary);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.2s, box-shadow 0.2s;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.news-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.news-content {
  padding: 1.5rem;
}

.news-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.news-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.news-description {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.news-link {
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
}

.news-link:hover {
  color: var(--accent-hover);
}

/* Loading & Error States */
.loading {
  text-align: center;
  padding: 3rem;
  font-size: 1.125rem;
  color: var(--text-secondary);
}

.error {
  background: var(--error);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .temperature {
    font-size: 2rem;
  }

  .weather-details {
    grid-template-columns: 1fr;
  }
}
```

---

## Bonus Features (Extra Credit)

### 1. Advanced Features
- **Weather alerts:** Show severe weather warnings
- **Hourly forecast:** Detailed hour-by-hour breakdown
- **Weather maps:** Integrate radar/satellite imagery
- **News bookmarks:** Save favorite articles
- **Share articles:** Share on social media
- **Offline mode:** Cache data with Service Worker

### 2. Performance Optimizations
- **Code splitting:** Lazy load weather and news sections
- **Image optimization:** Compress and lazy load images
- **Debounced search:** Prevent excessive API calls
- **Caching:** Cache API responses for 10 minutes
- **Skeleton loaders:** Show content placeholders

### 3. Advanced Styling
- **Animations:** Smooth page transitions
- **Glassmorphism:** Modern frosted glass effects
- **Custom weather icons:** Create SVG weather icons
- **Charts:** Temperature graph for forecast
- **Parallax effects:** Subtle background animations

### 4. Testing
- **Unit tests:** Test components in isolation
- **Integration tests:** Test API services
- **E2E tests:** Test full user flows
- **Accessibility tests:** WCAG compliance

---

## Success Criteria

Your project should:

✅ Display real-time weather data
✅ Show current news headlines
✅ Allow theme switching (light/dark)
✅ Save user preferences to localStorage
✅ Handle loading and error states gracefully
✅ Be fully responsive (mobile, tablet, desktop)
✅ Have clean, professional UI
✅ Use proper component architecture
✅ Follow framework best practices
✅ Include code comments and documentation

---

## Submission Checklist

Before considering your project complete:

- [ ] All core features implemented
- [ ] No console errors
- [ ] Tested on mobile and desktop
- [ ] Tested with slow network (DevTools throttling)
- [ ] Tested error states (invalid city, API limits)
- [ ] Code is organized and readable
- [ ] Components are small and focused
- [ ] State management is clean
- [ ] localStorage persists correctly
- [ ] Theme toggle works smoothly
- [ ] README.md with setup instructions
- [ ] Screenshots of your app

---

## Extension Ideas

Once you complete the core project:

1. **Add more APIs:**
   - Cryptocurrency prices
   - Stock market data
   - Sports scores
   - Reddit feed

2. **Build similar apps:**
   - Social media dashboard
   - E-commerce admin panel
   - Fitness tracker
   - Recipe finder

3. **Deploy it:**
   - Netlify / Vercel (free hosting)
   - Share with friends and family
   - Add to your portfolio

---

## Resources

**Weather API:**
- OpenWeatherMap Docs: https://openweathermap.org/api
- Weather icons: https://openweathermap.org/weather-conditions

**News API:**
- NewsAPI Docs: https://newsapi.org/docs
- Sources: https://newsapi.org/sources

**Date Formatting:**
- date-fns: https://date-fns.org/
- Day.js: https://day.js.org/

**Icons:**
- React Icons: https://react-icons.github.io/react-icons/
- Heroicons: https://heroicons.com/
- Font Awesome: https://fontawesome.com/

**Deployment:**
- Netlify: https://www.netlify.com/
- Vercel: https://vercel.com/
- GitHub Pages: https://pages.github.com/

---

## Final Words

This project is your opportunity to build something **real and impressive**. Take your time, experiment, make mistakes, and learn from them.

**This is what goes in your portfolio.** This is what you show in interviews. This is proof that you can build professional, production-quality applications.

**Don't aim for perfection.** Aim for completion. You can always improve it later.

**You've got all the skills you need.** Now go build something amazing! 🚀

---

## Example Screenshots

Your finished app should look something like this:

**Light Mode:**
```
┌─────────────────────────────────────────────┐
│  ☀️ Weather Dashboard            🌙 [Toggle]│
├─────────────────────────────────────────────┤
│  📍 San Francisco, US                        │
│  ☀️ 72°F                                     │
│  Partly Cloudy                               │
│  Feels like: 70°F | Humidity: 65%           │
│  Wind: 5 m/s                                 │
│                                              │
│  📰 Top Headlines - Technology               │
│  ┌──────────────────────────────────────┐  │
│  │ [Image]                               │  │
│  │ New AI Model Breaks Records            │  │
│  │ TechCrunch • 2 hours ago               │  │
│  │ Researchers have developed...          │  │
│  │ Read more →                            │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**Build this. You can do it!** 💪

