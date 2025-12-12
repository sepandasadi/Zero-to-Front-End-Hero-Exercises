# Exercise 6 Hints: Multi-API Dashboard

## Key Concept: Independent API Calls

**Problem:** If one API fails, the whole dashboard shouldn't break.

**Solution:** Use `Promise.allSettled()` instead of `Promise.all()`

## Promise.all() vs Promise.allSettled()

**`Promise.all()` - Fails if ANY promise rejects:**
```javascript
const [weather, quote, joke] = await Promise.all([
  fetchWeather(),
  fetchQuote(),
  fetchJoke()
]);
// If ANY fails, entire operation fails ❌
```

**`Promise.allSettled()` - Handles each independently:**
```javascript
const results = await Promise.allSettled([
  fetchWeather(),
  fetchQuote(),
  fetchJoke()
]);

results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log('Success:', result.value);
  } else {
    console.error('Failed:', result.reason);
  }
});
// Each API handled independently ✓
```

## Step 1: Basic Setup

```javascript
async function fetchWeather() {
  try {
    const response = await fetch('API_URL');
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError('weather', error.message);
  }
}
```

## Step 2: Load All APIs

**Simple approach (all or nothing):**
```javascript
async function loadDashboard() {
  await fetchWeather();
  await fetchQuote();
  await fetchJoke();
}
```

**Better approach (parallel, independent):**
```javascript
async function loadDashboard() {
  const results = await Promise.allSettled([
    fetchWeather(),
    fetchQuote(),
    fetchJoke()
  ]);

  // Each card handles its own success/failure
}
```

## Step 3: Individual Refresh

```javascript
function refreshCard(cardName) {
  switch (cardName) {
    case 'weather':
      fetchWeather();
      break;
    case 'quote':
      fetchQuote();
      break;
    case 'joke':
      fetchJoke();
      break;
  }
}

// Event listener
document.querySelectorAll('.refresh-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.dataset.card;
    refreshCard(card);
  });
});
```

## Free APIs to Use

**No API key needed:**
```javascript
// Weather (New York)
https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true

// Random quote
https://api.quotable.io/random

// Cat fact
https://catfact.ninja/fact

// Random joke
https://official-joke-api.appspot.com/random_joke

// Advice
https://api.adviceslip.com/advice

// Dog image
https://dog.ceo/api/breeds/image/random
```

## Error Handling Per Card

```javascript
async function fetchWeather() {
  const content = document.getElementById('weather-content');

  try {
    content.innerHTML = 'Loading...';

    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch');

    const data = await response.json();

    content.innerHTML = `
      <div>Temperature: ${data.temperature}°C</div>
    `;

  } catch (error) {
    content.innerHTML = `
      <div class="error">
        Failed to load weather
        <button onclick="fetchWeather()">Retry</button>
      </div>
    `;
  }
}
```

## Bonus: Auto-Refresh

```javascript
// Refresh all data every 5 minutes
setInterval(() => {
  loadDashboard();
}, 5 * 60 * 1000);  // 5 minutes
```

**Per-card refresh intervals:**
```javascript
// Weather: 10 min, Quote: 30 min, etc.
setInterval(fetchWeather, 10 * 60 * 1000);
setInterval(fetchQuote, 30 * 60 * 1000);
```

## Bonus: Timestamps

```javascript
function displayWeather(data) {
  const timestamp = new Date().toLocaleTimeString();

  content.innerHTML = `
    <div>${data.temperature}°C</div>
    <small>Updated: ${timestamp}</small>
  `;
}
```

## Bonus: Loading States

```javascript
function setLoading(cardId, isLoading) {
  const card = document.getElementById(cardId);

  if (isLoading) {
    card.classList.add('loading');
  } else {
    card.classList.remove('loading');
  }
}

async function fetchWeather() {
  setLoading('weather-content', true);

  // ... fetch data ...

  setLoading('weather-content', false);
}
```

**CSS:**
```css
.card-content.loading {
  opacity: 0.5;
  pointer-events: none;
}

.card-content.loading::after {
  content: 'Loading...';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

## Testing Strategy

1. ✓ Load page → All cards load
2. ✓ Turn off internet → Shows errors
3. ✓ Turn on internet → Click refresh
4. ✓ Refresh individual cards → Only that card updates
5. ✓ Refresh all → All cards update

## Common Patterns

**Fetch wrapper:**
```javascript
async function fetchAPI(url, cardContent) {
  try {
    cardContent.innerHTML = 'Loading...';

    const response = await fetch(url);
    if (!response.ok) throw new Error('HTTP ' + response.status);

    return await response.json();

  } catch (error) {
    cardContent.innerHTML = `<p class="error">${error.message}</p>`;
    throw error;
  }
}

// Usage
async function fetchWeather() {
  const data = await fetchAPI(APIS.weather, weatherContent);
  displayWeather(data);
}
```

---

**Powerful dashboard pattern!** 📊

