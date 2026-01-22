# Weather Dashboard - Hints

## Fetch with Error Handling
```javascript
async function fetchWeather(city) {
  try {
    const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
      if (response.status === 404) throw new Error('City not found');
      if (response.status === 401) throw new Error('Invalid API key');
      throw new Error('Weather service unavailable');
    }
    return await response.json();
  } catch (error) {
    displayError(error.message);
    return null;
  }
}
```

## Group Forecast by Day
```javascript
function groupForecastByDay(data) {
  const days = {};
  data.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });
  
  return Object.entries(days).slice(0, 5).map(([date, items]) => ({
    date,
    tempMax: Math.max(...items.map(i => i.main.temp_max)),
    tempMin: Math.min(...items.map(i => i.main.temp_min)),
    condition: items[0].weather[0].main
  }));
}
```

## Caching Pattern
```javascript
const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 min

async function fetchWithCache(city) {
  const cached = cache.get(city);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  const data = await fetchWeather(city);
  if (data) cache.set(city, { data, timestamp: Date.now() });
  return data;
}
```

## Temperature Conversion
```javascript
function celsiusToFahrenheit(c) {
  return (c * 9/5) + 32;
}
```
