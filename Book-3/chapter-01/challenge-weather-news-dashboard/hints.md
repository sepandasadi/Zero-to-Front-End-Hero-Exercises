# Challenge Project: Weather & News Dashboard - Hints

## Phase-by-Phase Hints

---

## Phase 1: Setup & API Services

### Hint 1: Environment Variables

```javascript
// .env
VITE_WEATHER_API_KEY=your_key_here
VITE_NEWS_API_KEY=your_key_here

// services/weatherAPI.js
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
```

### Hint 2: Testing API Services

```javascript
// Test in browser console or temporary component
import { getCurrentWeather } from './services/weatherAPI';

getCurrentWeather('London').then(data => console.log(data));
```

---

## Phase 2: Weather Components

### Hint 3: Basic Weather Display

```jsx
// React
function CurrentWeather({ city }) {
  const { data: weather, loading, error } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{weather.name}</h2>
      <p>{Math.round(weather.main.temp)}°C</p>
      <p>{weather.weather[0].description}</p>
    </div>
  );
}
```

### Hint 4: Temperature Conversion

```javascript
// utils/tempConverter.js
export function celsiusToFahrenheit(celsius) {
  return Math.round(celsius * 9/5 + 32);
}

export function formatTemp(temp, unit) {
  if (unit === 'imperial') {
    return `${celsiusToFahrenheit(temp)}°F`;
  }
  return `${Math.round(temp)}°C`;
}
```

### Hint 5: Weather Icons

```jsx
<img
  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
  alt={weather.weather[0].description}
/>
```

---

## Phase 3: News Components

### Hint 6: Fetching News

```javascript
// services/newsAPI.js
export async function getTopHeadlines(category = 'general') {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );

  if (!response.ok) throw new Error('Failed to fetch news');
  return response.json();
}
```

### Hint 7: Pagination Logic

```javascript
const articlesPerPage = 10;
const indexOfLastArticle = currentPage * articlesPerPage;
const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
const totalPages = Math.ceil(articles.length / articlesPerPage);
```

### Hint 8: Relative Time Display

```javascript
// If using date-fns:
import { formatDistanceToNow } from 'date-fns';

const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
  addSuffix: true
});

// Without library:
function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}
```

---

## Phase 4: Theme & State Management

### Hint 9: Theme Context (React)

```jsx
// context/ThemeContext.jsx
import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [tempUnit, setTempUnit] = useLocalStorage('tempUnit', 'metric');

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, tempUnit, setTempUnit }}>
      <div className={`app ${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

### Hint 10: Theme CSS Variables

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #333333;
  --text-secondary: #666666;
}

.app.dark {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2a2a2a;
  --text-primary: #ffffff;
  --text-secondary: #cccccc;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background 0.3s, color 0.3s;
}
```

---

## Phase 5: Polish & UX

### Hint 11: Loading Skeleton

```jsx
function LoadingSkeleton() {
  return (
    <div className="skeleton">
      <div className="skeleton-line" style={{ width: '60%' }}></div>
      <div className="skeleton-line" style={{ width: '80%' }}></div>
      <div className="skeleton-line" style={{ width: '40%' }}></div>
    </div>
  );
}
```

```css
.skeleton-line {
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 10px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Hint 12: Error Boundary (React)

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Hint 13: Debounced Search

```javascript
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage:
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 500);

useEffect(() => {
  if (debouncedSearch) {
    searchNews(debouncedSearch);
  }
}, [debouncedSearch]);
```

---

## Common Challenges & Solutions

### Challenge 1: CORS Errors
**Solution:** Add proxy to vite.config.js
```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api/weather': {
        target: 'https://api.openweathermap.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/weather/, '')
      }
    }
  }
});
```

### Challenge 2: API Rate Limits
**Solution:** Cache responses
```javascript
const cache = {};
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

async function getCachedWeather(city) {
  const now = Date.now();

  if (cache[city] && now - cache[city].timestamp < CACHE_DURATION) {
    return cache[city].data;
  }

  const data = await fetchWeather(city);
  cache[city] = { data, timestamp: now };
  return data;
}
```

### Challenge 3: Favorite Cities Management
**Solution:** Use array in localStorage
```javascript
const [favoriteCities, setFavoriteCities] = useLocalStorage('favoriteCities', []);

function addFavorite(city) {
  if (favoriteCities.length < 5 && !favoriteCities.includes(city)) {
    setFavoriteCities([...favoriteCities, city]);
  }
}

function removeFavorite(city) {
  setFavoriteCities(favoriteCities.filter(c => c !== city));
}
```

---

## Debugging Tips

### Tip 1: Check API Responses
```javascript
fetch(url)
  .then(response => {
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    return response.json();
  })
  .then(data => {
    console.log('Data:', data);
  });
```

### Tip 2: Validate API Keys
```javascript
if (!import.meta.env.VITE_WEATHER_API_KEY) {
  console.error('Missing VITE_WEATHER_API_KEY environment variable');
}
```

### Tip 3: Network Tab
Open DevTools → Network tab to see:
- Which requests are being made
- Response codes and errors
- Response data

---

## Bonus Features Hints

### Bonus: Geolocation
```javascript
function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(new Error('Geolocation not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (err) => setError(err)
    );
  }, []);

  return { location, error };
}
```

### Bonus: Service Worker (Offline Mode)
```javascript
// public/sw.js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// main.jsx
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

---

## Testing Checklist

- [ ] Weather displays for default city
- [ ] Can search for different cities
- [ ] 5-day forecast displays
- [ ] News articles load
- [ ] Category filter works
- [ ] Pagination works
- [ ] Theme toggle works
- [ ] Temperature unit toggle works
- [ ] Favorite cities save/load
- [ ] Preferences persist after refresh
- [ ] Responsive on mobile
- [ ] Loading states show
- [ ] Errors handled gracefully
- [ ] Works with slow network (DevTools throttling)

---

## Remember

- **Start simple** - Get basic features working first
- **Test frequently** - Don't write too much before testing
- **Use console.log** - Debug API responses
- **Check the network tab** - See what's actually being requested
- **Take breaks** - This is a marathon, not a sprint

**You're building a real, production-quality application. Be proud of your work!** 🚀

