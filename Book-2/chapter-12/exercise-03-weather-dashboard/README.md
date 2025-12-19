# Exercise 3: Weather Dashboard ⭐⭐

## 🎯 Objective

Build a weather dashboard that fetches real weather data from OpenWeatherMap API and displays current conditions and forecasts.

## 📝 Instructions

Create a weather app that shows current weather and 5-day forecast for any city.

### Requirements

1. **Search for cities** by name
2. **Display current weather:**
   - Temperature (with unit toggle °C/°F)
   - Weather condition & icon
   - Humidity, wind speed
   - Feels like temperature
3. **Show 5-day forecast**
   - Daily temperature
   - Weather icons
   - Date
4. **Error handling:**
   - City not found
   - API errors
   - Network failures
5. **Bonus:** Geolocation for current location

### API Setup

**Sign up for free API key:**
1. Go to https://openweathermap.org/api
2. Create free account
3. Get API key from dashboard
4. Free tier: 1000 calls/day

**Endpoints:**
```javascript
// Current weather
https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric

// 5-day forecast
https://api.openweathermap.org/data/2.5/forecast?q=London&appid=YOUR_API_KEY&units=metric
```

**Response structure:**
```javascript
{
  name: "London",
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

## 🎯 Tasks

1. Set up HTML structure (search, current weather, forecast)
2. Create API service functions
3. Implement city search
4. Display current weather with icon
5. Display 5-day forecast
6. Add temperature unit toggle
7. Add error handling
8. Style with weather-themed design

## 🎁 Bonus Challenges

1. Get user's location with Geolocation API
2. Save favorite cities to localStorage
3. Show hourly forecast
4. Add weather alerts/warnings
5. Display sunrise/sunset times
6. Add background based on weather
7. Show historical data
8. Multi-city comparison

## ✅ Success Criteria

- Search works for any valid city
- Displays current weather accurately
- Shows 5-day forecast
- Temperature unit toggle works
- Weather icons display correctly
- Handles errors gracefully (invalid city, API failure)
- Responsive design
- Loading states shown

## ⏱️ Estimated Time

1.5-2 hours

## 💡 Tips

- **API Key Security:** In production, NEVER expose API keys in frontend code. Use backend proxy.
- **Icons:** Use `http://openweathermap.org/img/wn/${icon}@2x.png`
- **Units:** `units=metric` for Celsius, `units=imperial` for Fahrenheit
- **Rate Limiting:** Cache results to avoid exceeding free tier limits
- **Testing:** Start with hardcoded city, then add search

## 📚 API Documentation

- https://openweathermap.org/current
- https://openweathermap.org/forecast5
- https://openweathermap.org/weather-conditions (icon codes)

