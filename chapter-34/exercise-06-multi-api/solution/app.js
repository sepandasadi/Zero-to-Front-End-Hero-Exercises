// ===========================================
// Multi-API Dashboard - SOLUTION
// ===========================================

console.log('📊 Dashboard loaded');

// API URLs
const APIS = {
  weather: 'https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true',
  quote: 'https://api.quotable.io/random',
  cat: 'https://catfact.ninja/fact',
  joke: 'https://official-joke-api.appspot.com/random_joke'
};

// DOM Elements
const weatherContent = document.getElementById('weather-content');
const quoteContent = document.getElementById('quote-content');
const catContent = document.getElementById('cat-content');
const jokeContent = document.getElementById('joke-content');
const refreshAll = document.getElementById('refresh-all');

// ===========================================
// Fetch Weather
// ===========================================

async function fetchWeather() {
  try {
    weatherContent.innerHTML = '<p class="loading">Loading...</p>';

    const response = await fetch(APIS.weather);
    const data = await response.json();

    const temp = data.current_weather.temperature;
    const windspeed = data.current_weather.windspeed;

    weatherContent.innerHTML = `
      <div class="weather-info">
        <div class="temperature">${temp}°C</div>
        <p>Wind: ${windspeed} km/h</p>
        <p><small>New York City</small></p>
      </div>
    `;

    console.log('✓ Weather loaded');
  } catch (error) {
    console.error('✗ Weather error:', error);
    weatherContent.innerHTML = '<p class="error">Failed to load weather</p>';
  }
}

// ===========================================
// Fetch Quote
// ===========================================

async function fetchQuote() {
  try {
    quoteContent.innerHTML = '<p class="loading">Loading...</p>';

    const response = await fetch(APIS.quote);
    const data = await response.json();

    quoteContent.innerHTML = `
      <p class="quote-text">"${data.content}"</p>
      <p class="quote-author">- ${data.author}</p>
    `;

    console.log('✓ Quote loaded');
  } catch (error) {
    console.error('✗ Quote error:', error);
    quoteContent.innerHTML = '<p class="error">Failed to load quote</p>';
  }
}

// ===========================================
// Fetch Cat Fact
// ===========================================

async function fetchCatFact() {
  try {
    catContent.innerHTML = '<p class="loading">Loading...</p>';

    const response = await fetch(APIS.cat);
    const data = await response.json();

    catContent.innerHTML = `<p>${data.fact}</p>`;

    console.log('✓ Cat fact loaded');
  } catch (error) {
    console.error('✗ Cat fact error:', error);
    catContent.innerHTML = '<p class="error">Failed to load cat fact</p>';
  }
}

// ===========================================
// Fetch Joke
// ===========================================

async function fetchJoke() {
  try {
    jokeContent.innerHTML = '<p class="loading">Loading...</p>';

    const response = await fetch(APIS.joke);
    const data = await response.json();

    jokeContent.innerHTML = `
      <p class="joke-setup">${data.setup}</p>
      <p class="joke-punchline">${data.punchline} 😄</p>
    `;

    console.log('✓ Joke loaded');
  } catch (error) {
    console.error('✗ Joke error:', error);
    jokeContent.innerHTML = '<p class="error">Failed to load joke</p>';
  }
}

// ===========================================
// Load All Data
// ===========================================

async function loadDashboard() {
  console.log('Loading dashboard...');

  // Use Promise.allSettled to handle each API independently
  const results = await Promise.allSettled([
    fetchWeather(),
    fetchQuote(),
    fetchCatFact(),
    fetchJoke()
  ]);

  // Log results
  results.forEach((result, index) => {
    const apis = ['weather', 'quote', 'cat', 'joke'];
    if (result.status === 'fulfilled') {
      console.log(`✓ ${apis[index]} loaded`);
    } else {
      console.error(`✗ ${apis[index]} failed:`, result.reason);
    }
  });

  console.log('✓ Dashboard loaded');
}

// ===========================================
// Refresh Individual Card
// ===========================================

function refreshCard(cardName) {
  const button = document.querySelector(`[data-card="${cardName}"]`);
  button.classList.add('loading');

  switch (cardName) {
    case 'weather':
      fetchWeather().finally(() => button.classList.remove('loading'));
      break;
    case 'quote':
      fetchQuote().finally(() => button.classList.remove('loading'));
      break;
    case 'cat':
      fetchCatFact().finally(() => button.classList.remove('loading'));
      break;
    case 'joke':
      fetchJoke().finally(() => button.classList.remove('loading'));
      break;
  }
}

// ===========================================
// Event Listeners
// ===========================================

// Refresh all button
refreshAll.addEventListener('click', loadDashboard);

// Individual refresh buttons
document.querySelectorAll('.refresh-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const cardName = e.target.dataset.card;
    refreshCard(cardName);
  });
});

// ===========================================
// Initialize
// ===========================================

loadDashboard();

console.log('\n📝 Features:');
console.log('   ✓ Weather from Open-Meteo');
console.log('   ✓ Quotes from Quotable');
console.log('   ✓ Cat facts from Cat Facts API');
console.log('   ✓ Jokes from Official Joke API');
console.log('   ✓ All APIs load independently');
console.log('   ✓ Individual refresh buttons');
console.log('\n💡 All APIs are free - no keys needed!');

