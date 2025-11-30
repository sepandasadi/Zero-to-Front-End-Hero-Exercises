# Exercise 6: Multi-API Dashboard ⭐⭐⭐

## 🎯 Objective

Build an advanced dashboard that combines data from multiple APIs to create a unified experience.

## 📝 Instructions

Create a personal dashboard that fetches and displays data from 3+ different APIs.

### Requirements

**Must include at least 3 APIs:**

1. **Weather API** - Current weather for user's location
2. **News API** - Latest headlines
3. **Quote API** - Inspirational quote

**Optional APIs to add:**
- GitHub: Your recent activity
- Random Dog/Cat: Pet photo
- Joke API: Random joke
- Cryptocurrency: Bitcoin/Ethereum price
- ISS Location: Where is the ISS right now?

### Dashboard Features

1. **Modular design** with cards for each API
2. **Loading states** for each section independently
3. **Error handling** per API (don't break entire dashboard if one fails)
4. **Refresh buttons** for each section
5. **Auto-refresh** every X minutes (optional)
6. **Responsive grid layout**

### Technical Requirements

1. Use `Promise.all()` for parallel API calls
2. Implement proper error boundaries
3. Cache results when appropriate
4. Show timestamps for data freshness
5. Allow manual refresh per section

## 🎯 Tasks

1. Plan dashboard layout (wireframe)
2. Create modular card components
3. Fetch from multiple APIs in parallel
4. Display data in organized cards
5. Add individual loading states
6. Implement individual error handling
7. Add refresh functionality
8. Style with consistent design

## 🎁 Bonus Challenges

1. Add user preferences (which APIs to show)
2. Drag-and-drop to rearrange cards
3. Dark/light mode toggle
4. Save layout to localStorage
5. Add more APIs (5+)
6. Export dashboard as PDF
7. Customize refresh intervals per API
8. Add search/filter within each section

## ✅ Success Criteria

- Fetches from at least 3 different APIs
- All APIs load in parallel
- Individual loading states per section
- One API failure doesn't break others
- Refresh works per section
- Clean, organized layout
- Responsive design
- Professional styling

## ⏱️ Estimated Time

2-3 hours

## 💡 Tips

**Parallel API Calls:**
```javascript
async function fetchAllData() {
  try {
    const [weather, news, quote] = await Promise.all([
      fetchWeather(),
      fetchNews(),
      fetchQuote()
    ]);

    // Display all data
  } catch (error) {
    // One failed - handle gracefully
  }
}
```

**Independent Error Handling:**
```javascript
async function fetchAllData() {
  const results = await Promise.allSettled([
    fetchWeather(),
    fetchNews(),
    fetchQuote()
  ]);

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      displayData(result.value, index);
    } else {
      showError(result.reason, index);
    }
  });
}
```

**Modular Card Component:**
```javascript
function createCard(title, data, refreshCallback) {
  return `
    <div class="card">
      <div class="card-header">
        <h3>${title}</h3>
        <button onclick="${refreshCallback}">🔄</button>
      </div>
      <div class="card-body">${data}</div>
      <div class="card-footer">Updated: ${new Date().toLocaleTimeString()}</div>
    </div>
  `;
}
```

## 📚 Recommended Free APIs

- Weather: OpenWeatherMap
- News: NewsAPI.org (free tier)
- Quotes: api.quotable.io
- Random User: randomuser.me
- Dogs: dog.ceo/dog-api
- Jokes: official-joke-api.appspot.com
- GitHub: api.github.com
- Advice: api.adviceslip.com

## 📚 API Documentation

- https://github.com/public-apis/public-apis
- https://rapidapi.com/collection/list-of-free-apis

