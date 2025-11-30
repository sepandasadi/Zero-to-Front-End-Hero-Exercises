# Exercise 5 Hints: Random Quote Generator

## API Overview

**No API key required!**

**Endpoint:**
```
https://api.quotable.io/random
```

**Response:**
```javascript
{
  content: "The only way to do great work is to love what you do.",
  author: "Steve Jobs",
  tags: ["inspirational", "work"]
}
```

## Step 1: Fetch Quote

```javascript
async function fetchQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();

    displayQuote(data.content, data.author);

  } catch (error) {
    console.error('Error:', error);
  }
}
```

## Step 2: Display Quote

```javascript
function displayQuote(quote, author) {
  quoteText.textContent = `"${quote}"`;
  quoteAuthor.textContent = `- ${author}`;
}
```

## Step 3: Copy to Clipboard

**Modern way (recommended):**
```javascript
async function copyQuote() {
  const text = `${quote} - ${author}`;

  try {
    await navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  } catch (error) {
    console.error('Failed to copy:', error);
  }
}
```

**Fallback for older browsers:**
```javascript
function copyQuote() {
  const textarea = document.createElement('textarea');
  textarea.value = quote;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert('Copied!');
}
```

## Step 4: Tweet Quote

```javascript
function tweetQuote() {
  const text = `"${quote}" - ${author}`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;

  window.open(url, '_blank');
}
```

**Important:** Always use `encodeURIComponent()` to encode the text properly!

## Bonus: Add Loading State

```javascript
async function fetchQuote() {
  loading.style.display = 'block';
  quoteContent.style.display = 'none';

  const response = await fetch(API_URL);
  const data = await response.json();

  displayQuote(data.content, data.author);

  loading.style.display = 'none';
  quoteContent.style.display = 'block';
}
```

## Bonus: Add Animations

**CSS:**
```css
.quote-text {
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**JavaScript:**
```javascript
function displayQuote(quote, author) {
  // Remove animation class
  quoteText.classList.remove('animate');

  // Update text
  quoteText.textContent = quote;

  // Trigger reflow to restart animation
  void quoteText.offsetWidth;

  // Add animation class
  quoteText.classList.add('animate');
}
```

## Bonus: Keyboard Shortcuts

```javascript
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();  // Prevent page scroll
    fetchQuote();
  }
});
```

## Bonus: Save Favorites

```javascript
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

function saveFavorite() {
  const quote = {
    text: currentQuote,
    author: currentAuthor,
    saved: new Date().toISOString()
  };

  favorites.push(quote);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  alert('Added to favorites!');
}

// Show favorites
function showFavorites() {
  favorites.forEach(fav => {
    console.log(`"${fav.text}" - ${fav.author}`);
  });
}
```

## API Options

**Filter by tag:**
```javascript
// Get wisdom quote
https://api.quotable.io/random?tags=wisdom

// Get technology quote
https://api.quotable.io/random?tags=technology
```

**Set max length:**
```javascript
// Short quotes only
https://api.quotable.io/random?maxLength=100
```

**Multiple tags:**
```javascript
https://api.quotable.io/random?tags=wisdom|technology
```

## Common Issues

### "Clipboard write failed"

**Problem:** Browser security restrictions

**Solutions:**
1. Use HTTPS (required for clipboard API)
2. Use fallback method (`document.execCommand`)
3. User must interact first (button click)

### Twitter URL too long

**Problem:** Quote exceeds Twitter character limit

**Solution:**
```javascript
function tweetQuote() {
  let text = `"${quote}" - ${author}`;

  // Truncate if too long
  if (text.length > 280) {
    text = text.substring(0, 277) + '...';
  }

  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}
```

## Testing

1. ✓ Click "New Quote" → Shows different quote
2. ✓ Click "Copy" → Copies to clipboard
3. ✓ Click "Tweet" → Opens Twitter
4. ✓ Press Space → Gets new quote
5. ✓ Works on mobile

---

**Simple, elegant, and fun!** 💬

