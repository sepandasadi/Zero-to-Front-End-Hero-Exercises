// ===========================================
// Random Quote Generator - SOLUTION
// ===========================================

console.log('💬 Quote Generator loaded');

const API_URL = 'https://api.quotable.io/random';

// DOM Elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const copyBtn = document.getElementById('copy-btn');
const tweetBtn = document.getElementById('tweet-btn');
const loading = document.getElementById('loading');
const quoteContent = document.getElementById('quote-content');
const successMessage = document.getElementById('success-message');

// Current quote data
let currentQuote = '';
let currentAuthor = '';

// ===========================================
// Fetch Random Quote
// ===========================================

async function fetchQuote() {
  try {
    showLoading();

    console.log('Fetching quote...');

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    console.log('✓ Quote fetched:', data);

    currentQuote = data.content;
    currentAuthor = data.author;

    displayQuote(currentQuote, currentAuthor);

  } catch (error) {
    console.error('✗ Failed to fetch quote:', error);
    displayQuote(
      'Failed to load quote. Please try again.',
      'Error'
    );
  } finally {
    hideLoading();
  }
}

// ===========================================
// Display Quote
// ===========================================

function displayQuote(quote, author) {
  // Remove animation classes
  quoteText.classList.remove('animate');
  quoteAuthor.classList.remove('animate');

  // Update text
  quoteText.textContent = `"${quote}"`;
  quoteAuthor.textContent = `- ${author}`;

  // Trigger animation
  setTimeout(() => {
    quoteText.classList.add('animate');
    quoteAuthor.classList.add('animate');
  }, 10);

  console.log('✓ Quote displayed');
}

// ===========================================
// Copy to Clipboard
// ===========================================

async function copyQuote() {
  const text = `${currentQuote} - ${currentAuthor}`;

  try {
    await navigator.clipboard.writeText(text);

    console.log('✓ Copied to clipboard');
    showSuccess('Copied to clipboard!');

  } catch (error) {
    console.error('✗ Failed to copy:', error);

    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    showSuccess('Copied to clipboard!');
  }
}

// ===========================================
// Tweet Quote
// ===========================================

function tweetQuote() {
  const text = `"${currentQuote}" - ${currentAuthor}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;

  window.open(twitterUrl, '_blank');

  console.log('✓ Opening Twitter');
}

// ===========================================
// Helper Functions
// ===========================================

function showLoading() {
  loading.style.display = 'block';
  quoteContent.style.display = 'none';
}

function hideLoading() {
  loading.style.display = 'none';
  quoteContent.style.display = 'block';
}

function showSuccess(message) {
  successMessage.textContent = `✓ ${message}`;
  successMessage.classList.add('show');

  setTimeout(() => {
    successMessage.classList.remove('show');
  }, 2000);
}

// ===========================================
// Event Listeners
// ===========================================

newQuoteBtn.addEventListener('click', fetchQuote);

copyBtn.addEventListener('click', copyQuote);

tweetBtn.addEventListener('click', tweetQuote);

// Keyboard shortcut: Space for new quote
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && e.target === document.body) {
    e.preventDefault();
    fetchQuote();
  }
});

// ===========================================
// Initialize
// ===========================================

// Load quote on page load
fetchQuote();

console.log('\n📝 Features:');
console.log('   ✓ Random inspirational quotes');
console.log('   ✓ Copy to clipboard');
console.log('   ✓ Share on Twitter');
console.log('   ✓ Press Space for new quote');
console.log('\n💡 Quotes powered by Quotable API');

