# Exercise 5: Fix "Div Soup"

## 🎯 Objective

Refactor poorly-written HTML that uses only divs into proper semantic HTML. Learn to recognize and fix common structural problems.

## 🐛 The Problem

You've been given a news article page that was quickly thrown together using only `<div>` elements with classes. While it might look okay visually, it has serious structural and accessibility problems:

- No semantic meaning
- Poor screen reader experience
- Hard to maintain
- Bad for SEO
- Unclear document structure

## 📋 Your Task

Open the broken HTML file and refactor it to use proper semantic elements:

**Replace divs with:**
- `<header>` for the site header
- `<nav>` for navigation
- `<main>` for main content
- `<article>` for the news article
- `<section>` for article sections
- `<aside>` for sidebar content
- `<footer>` for page footer
- `<time>` for dates
- Proper heading hierarchy

## ✅ Requirements

- ✅ Replace ALL generic divs with semantic alternatives
- ✅ Keep the same content and styling
- ✅ Improve heading hierarchy
- ✅ Add `<time>` elements with `datetime` attributes
- ✅ Use proper list elements for navigation
- ✅ Valid HTML
- ✅ Better accessibility

## 💡 Tips

1. Look at each div and ask: "What does this represent?"
2. Choose the most specific semantic element available
3. Only use div when there's truly no semantic alternative
4. Test with a screen reader or browser outline tool
5. Validate your HTML

## 📁 Files

- **Broken:** `broken/div-soup.html`
- **Solution:** `solution/div-soup-fixed.html`

**Clean up that div soup!** 🧹

