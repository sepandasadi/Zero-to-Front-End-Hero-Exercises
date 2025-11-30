# Getting Started with Weather & News Dashboard

## Step 1: Choose Your Framework

This challenge can be completed in React, Vue, or Angular. Choose the one you're most comfortable with.

### React Setup
```bash
npm create vite@latest weather-news-dashboard -- --template react
cd weather-news-dashboard
npm install
npm run dev
```

### Vue Setup
```bash
npm create vite@latest weather-news-dashboard -- --template vue
cd weather-news-dashboard
npm install
npm run dev
```

---

## Step 2: Get API Keys

### Weather API (OpenWeatherMap)
1. Go to https://openweathermap.org/api
2. Sign up for free account
3. Get your API key from the dashboard
4. Free tier: 1,000 calls/day

### News API
1. Go to https://newsapi.org/
2. Sign up for free account
3. Get your API key
4. Free tier: 100 requests/day

---

## Step 3: Project Structure

Follow the file structure outlined in the main README.md:

```
src/
├── components/
│   ├── Weather/
│   ├── News/
│   ├── UI/
│   └── Settings/
├── hooks/ (React) or composables/ (Vue)
├── services/
├── context/ (React) or stores/ (Vue)
└── utils/
```

---

## Step 4: Implementation Order

1. **Setup (30 min)**
   - Create project structure
   - Add API keys (use environment variables!)
   - Set up basic layout

2. **API Services (1 hour)**
   - Create weatherAPI.js
   - Create newsAPI.js
   - Test with console.log

3. **Weather Components (2-3 hours)**
   - CurrentWeather component
   - Display basic weather data
   - Add 5-day forecast
   - Add city search

4. **News Components (2-3 hours)**
   - NewsList component
   - NewsCard component
   - Category filter
   - Pagination

5. **Theme & Preferences (1-2 hours)**
   - Dark/Light mode toggle
   - Temperature unit toggle
   - LocalStorage persistence

6. **Polish (1-2 hours)**
   - Loading states
   - Error handling
   - Responsive design
   - Animations

---

## Step 5: Environment Variables

**IMPORTANT:** Never commit API keys to git!

Create `.env` file:
```env
VITE_WEATHER_API_KEY=your_weather_api_key_here
VITE_NEWS_API_KEY=your_news_api_key_here
```

Add to `.gitignore`:
```
.env
.env.local
```

Use in code:
```javascript
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
```

---

## Testing During Development

### Use Free APIs for Testing

**Weather:** https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY

**News:** https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_KEY

### Mock Data
If you hit API limits, create mock data files:

```javascript
// mock-data/weather.json
{
  "name": "San Francisco",
  "main": {
    "temp": 18,
    "feels_like": 17,
    "humidity": 65
  },
  "weather": [{"description": "partly cloudy", "icon": "02d"}],
  "wind": {"speed": 5}
}
```

---

## Common Issues

### CORS Errors
If you get CORS errors in development:
- Use Vite proxy (see vite.config.js example in README)
- Or use a CORS proxy (not recommended for production)

### API Rate Limits
- Cache responses in localStorage
- Add debouncing to search inputs
- Use mock data during heavy development

### 404 on Weather Icons
Weather icons come from:
`https://openweathermap.org/img/wn/${iconCode}@2x.png`

---

## Tips for Success

1. **Start small** - Get basic weather display working first
2. **Test frequently** - Don't write everything before testing
3. **Use DevTools** - React/Vue DevTools are invaluable
4. **Console.log liberally** - Debug API responses
5. **Take breaks** - This is a 6-10 hour project
6. **Don't aim for perfection** - Get it working, then improve

---

## Need Help?

1. Check the main README for detailed code examples
2. Review previous exercises (useFetch, useLocalStorage, etc.)
3. Check the official docs:
   - Weather API: https://openweathermap.org/current
   - News API: https://newsapi.org/docs
4. Browser DevTools → Network tab to inspect API calls

---

## You've Got This! 🚀

This is the most ambitious project in the book. It's meant to be challenging. Every bug you fix, every API call you make, every state management decision—it all makes you a better developer.

**Now go build something amazing!**

