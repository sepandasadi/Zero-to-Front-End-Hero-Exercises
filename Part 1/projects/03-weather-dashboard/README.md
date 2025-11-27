# Project 3: Weather Dashboard

**Difficulty**: Intermediate
**Estimated Time**: 6-8 hours

## Project Description

Build a weather dashboard that fetches and displays weather data from an API. Learn to work with external APIs, async JavaScript, and dynamic data display.

## Learning Objectives

- Work with REST APIs
- Handle async operations (fetch, async/await)
- Process and display JSON data
- Handle errors gracefully
- Work with localStorage for recent searches
- Create responsive data visualizations

## Requirements

### Functionality

- Search weather by city name
- Display current weather conditions
- Show 5-day forecast
- Save recent searches
- Handle API errors
- Loading states
- Auto-suggest cities (optional)

### API

Use the [OpenWeatherMap API](https://openweathermap.org/api) (free tier):
- Sign up for free API key
- Use Current Weather Data API
- Use 5 Day Forecast API

### Display Information

**Current Weather:**
- City name and country
- Current temperature
- "Feels like" temperature
- Weather description
- Weather icon
- Humidity
- Wind speed
- Pressure (optional)

**5-Day Forecast:**
- Date
- High/Low temperature
- Weather icon
- Conditions

## Getting Started

1. Sign up at OpenWeatherMap.org
2. Get your free API key
3. Read API documentation
4. Create HTML structure
5. Style with CSS
6. Implement JavaScript functionality
7. Test with different cities
8. Handle edge cases (invalid city, API errors)

## Bonus Challenges

- [ ] Geolocation to detect user's location
- [ ] Toggle between Celsius and Fahrenheit
- [ ] Display weather icons from API
- [ ] Show UV index and air quality
- [ ] Sunrise/sunset times
- [ ] Hourly forecast graph
- [ ] Weather alerts
- [ ] Multiple city comparison
- [ ] Save favorite locations

## API Example

```javascript
const API_KEY = 'your_api_key_here';
const city = 'London';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## Resources

- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)

## Success Criteria

- [ ] Search works correctly
- [ ] Data displays accurately
- [ ] 5-day forecast shown
- [ ] Recent searches saved
- [ ] Loading spinner shows during fetch
- [ ] Errors handled gracefully
- [ ] Responsive on all devices
- [ ] No exposed API keys in frontend code (use environment variables for production)

## Note on Starter Files

This project is more advanced - create your own HTML/CSS/JS structure based on the requirements. Use the projects 1 and 2 as reference for file organization.
