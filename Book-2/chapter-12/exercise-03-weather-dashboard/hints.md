# Exercise 3 Hints: Weather Dashboard

## Getting Your API Key

1. Go to https://openweathermap.org/api
2. Click "Sign Up" (free account)
3. Verify email
4. Go to "API keys" tab
5. Copy your key
6. Add to `app.js`: `const API_KEY = 'your_key_here';`

**Note:** API key might take 10-30 minutes to activate after creation.

## API Endpoints

**Current Weather:**
```javascript
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
```

**5-Day Forecast:**
```javascript
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
```

**Parameters:**
- `q` = city name
- `appid` = your API key
- `units=metric` = Celsius (use `imperial` for Fahrenheit)

## Step 1: Fetch Current Weather

```javascript
async function fetchCurrentWeather(city) {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${currentUnits}`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found');
    }
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  return data;
}
```

## Step 2: Display Current Weather

**Response structure:**
```javascript
{
  name: "London",
  sys: { country: "GB" },
  main: {
    temp: 15.5,
    feels_like: 14.2,
    humidity: 72
  },
  weather: [{
    main: "Clouds",
    description: "overcast clouds",
    icon: "04d"
  }],
  wind: {
    speed: 5.5
  }
}
```

**Display data:**
```javascript
function displayCurrentWeather(data) {
  // City
  cityName.textContent = `${data.name}, ${data.sys.country}`;

  // Temperature
  temp.textContent = Math.round(data.main.temp);

  // Icon
  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  // Description
  weatherDescription.textContent = data.weather[0].description;

  // Details
  feelsLike.textContent = `${Math.round(data.main.feels_like)}°`;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${Math.round(data.wind.speed)} km/h`;
}
```

## Step 3: Fetch Forecast

**Response structure:**
```javascript
{
  list: [
    {
      dt: 1609459200,
      dt_txt: "2021-01-01 12:00:00",
      main: { temp: 15.5 },
      weather: [{ icon: "04d", description: "clouds" }]
    },
    // ... 40 forecasts (every 3 hours for 5 days)
  ]
}
```

**Filter for daily forecasts:**
```javascript
function displayForecast(data) {
  // Get one forecast per day (12:00 PM)
  const dailyForecasts = data.list.filter(item => {
    return item.dt_txt.includes('12:00:00');
  });

  // Take first 5
  const forecasts = dailyForecasts.slice(0, 5);

  forecasts.forEach(forecast => {
    const card = createForecastCard(forecast);
    forecastContainer.appendChild(card);
  });
}
```

## Step 4: Create Forecast Cards

```javascript
function createForecastCard(forecast) {
  const card = document.createElement('div');
  card.className = 'forecast-card';

  // Format date
  const date = new Date(forecast.dt * 1000);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

  // Get weather data
  const temp = Math.round(forecast.main.temp);
  const icon = forecast.weather[0].icon;
  const desc = forecast.weather[0].description;

  card.innerHTML = `
    <div class="forecast-date">${dayName}</div>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
    <div class="forecast-temp">${temp}°C</div>
    <div>${desc}</div>
  `;

  return card;
}
```

## Step 5: Unit Toggle

```javascript
function toggleUnits() {
  // Switch units
  if (currentUnits === 'metric') {
    currentUnits = 'imperial';
    unitToggle.textContent = '°C';  // Show what clicking will switch TO
  } else {
    currentUnits = 'metric';
    unitToggle.textContent = '°F';
  }

  // Re-fetch with new units
  if (currentCity) {
    fetchWeather(currentCity);
  }
}
```

## Common Issues

### "401 Unauthorized"

**Problem:** Invalid API key

**Solutions:**
1. Check API key is correct
2. Wait 10-30 minutes for new key to activate
3. Check you're using free tier endpoints (not premium)

### "404 City Not Found"

**Problem:** City name incorrect

**Solutions:**
```javascript
// URL encode city name
const url = `...?q=${encodeURIComponent(city)}&...`;

// Handle error
if (response.status === 404) {
  throw new Error('City not found. Check spelling.');
}
```

### "CORS Error"

**Problem:** Browser blocking request

**This shouldn't happen with OpenWeatherMap, but if it does:**
- Check URL is `https://` not `http://`
- Verify API key is correct

### Icons Not Loading

**Icon URL format:**
```javascript
// ✓ Correct
https://openweathermap.org/img/wn/${icon}@2x.png

// @2x = 100x100px
// @4x = 200x200px (higher quality)

// Example icon codes:
// 01d = clear sky (day)
// 01n = clear sky (night)
// 10d = rain
// 50d = mist
```

### Forecast Shows Wrong Days

**Problem:** Not filtering correctly

**Solution:**
```javascript
// API returns forecast every 3 hours
// Filter for one time per day (e.g., 12:00 PM)
const dailyForecasts = data.list.filter(item => {
  return item.dt_txt.includes('12:00:00');
});

// Or get first forecast of each day
const dailyMap = new Map();
data.list.forEach(item => {
  const date = item.dt_txt.split(' ')[0];  // Get date part
  if (!dailyMap.has(date)) {
    dailyMap.set(date, item);
  }
});
const dailyForecasts = Array.from(dailyMap.values());
```

## Date Formatting

**Convert Unix timestamp:**
```javascript
const date = new Date(forecast.dt * 1000);  // dt is in seconds

// Format options
const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
// Output: "Mon"

const fullDate = date.toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric'
});
// Output: "Jan 15"

const longDate = date.toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
// Output: "Monday, January 15, 2024"
```

## Bonus: Geolocation

```javascript
function getUserLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Fetch by coordinates
        const url = `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();
        displayCurrentWeather(data);
      },
      (error) => {
        console.error('Geolocation error:', error);
      }
    );
  }
}

// Add button
<button onclick="getUserLocation()">Use My Location</button>
```

## Bonus: Save Favorite Cities

```javascript
let favorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]');

function addFavorite(city) {
  if (!favorites.includes(city)) {
    favorites.push(city);
    localStorage.setItem('favoriteCities', JSON.stringify(favorites));
    renderFavorites();
  }
}

function renderFavorites() {
  const container = document.getElementById('favorites');
  container.innerHTML = '';

  favorites.forEach(city => {
    const btn = document.createElement('button');
    btn.textContent = city;
    btn.onclick = () => fetchWeather(city);
    container.appendChild(btn);
  });
}
```

## Testing Tips

**Test these scenarios:**
1. ✓ Valid city → Shows weather
2. ✓ Invalid city → Shows error
3. ✓ Toggle units → Updates display
4. ✓ Search multiple cities → Updates correctly
5. ✓ No API key → Shows helpful error

**Check DevTools:**
- Network: See API requests and responses
- Console: Check for errors
- Elements: Verify data populated

## API Response Examples

**Test URLs (replace YOUR_KEY):**
```
Current weather:
https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY&units=metric

Forecast:
https://api.openweathermap.org/data/2.5/forecast?q=London&appid=YOUR_KEY&units=metric
```

---

**You've got this! Start simple, then add features!** 🌤️

