// ===========================================
// Random Quote Generator - STARTER
// TODO: Complete the quote functions
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

// ===========================================
// TODO 1: Fetch Random Quote
// ===========================================

async function fetchQuote() {
  // TODO: Implement this function
  // 1. Show loading state
  // 2. Fetch from API
  // 3. Parse JSON
  // 4. Display quote
  // 5. Hide loading
  // 6. Handle errors

  console.log('TODO: Implement fetchQuote()');
}

// ===========================================
// TODO 2: Display Quote
// ===========================================

function displayQuote(quote, author) {
  // TODO: Update DOM with quote and author
  // Add animation classes if desired

  console.log('TODO: Implement displayQuote()');
}

// ===========================================
// TODO 3: Copy to Clipboard
// ===========================================

function copyQuote() {
  // TODO: Copy current quote to clipboard
  // Use navigator.clipboard.writeText()
  // Show success message

  console.log('TODO: Implement copyQuote()');
}

// ===========================================
// TODO 4: Tweet Quote
// ===========================================

function tweetQuote() {
  // TODO: Open Twitter with pre-filled quote
  // URL: https://twitter.com/intent/tweet?text=...

  console.log('TODO: Implement tweetQuote()');
}

// ===========================================
// TODO 5: Helper Functions
// ===========================================

function showLoading() {
  // TODO: Show loading spinner
}

function hideLoading() {
  // TODO: Hide loading spinner
}

// ===========================================
// TODO 6: Event Listeners
// ===========================================

// TODO: Add click listeners for buttons

// ===========================================
// TODO 7: Initialize
// ===========================================

// TODO: Load a quote on page load
// fetchQuote();

console.log('💡 Check hints.md for help!');

