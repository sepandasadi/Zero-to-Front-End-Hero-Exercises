# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies

```bash
cd interactive-platform
npm install
```

### 2. Generate Exercise Catalog

```bash
npm run generate-catalog
```

This will scan all your exercise directories and create a comprehensive catalog.

### 3. Start the Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:5173`

---

## 🎯 How to Use

### First Time Setup

When you first open the app:

1. **Browse the sidebar** - All 4 books with 299 exercises are loaded
2. **Click any exercise** - It will open in the main view
3. **Read the instructions** - Left panel shows full exercise details
4. **Write your code** - Center panel has the Monaco code editor
5. **Test your solution** - Right panel shows live preview or test results

### Working on an Exercise

1. **Select exercise** from sidebar
2. **Read instructions** carefully
3. **Write code** in the editor
4. **Click "Run Tests"** for JavaScript exercises
5. **View live preview** for HTML/CSS exercises
6. **Use hints** if you get stuck (unlock one at a time)
7. **Reset code** if you want to start over
8. **Move to next** when you complete it

### Keyboard Shortcuts

- **Toggle Sidebar**: `Ctrl+B` (Windows/Linux) or `⌘+B` (Mac)
- **Toggle Theme**: `Ctrl+Shift+T` or `⌘+Shift+T`

### Progress Tracking

Your progress is automatically saved in your browser's localStorage:

- ✅ Completed exercises marked with green checkmark
- 🔵 In-progress exercises marked with blue play icon
- ⚪ Not started exercises marked with gray circle

### Tips

1. **Start with Book 1** if you're a beginner
2. **Try solving yourself first** before using hints
3. **Read error messages carefully** - they help you learn
4. **Experiment freely** - you can always reset
5. **Take breaks** - learning is a marathon, not a sprint!

---

## 📊 What's Included

- **4 Books**: Complete series from beginner to professional
- **51 Chapters**: Organized by topic
- **299 Exercises**: Hands-on coding challenges
- **Live Editor**: VS Code-style Monaco Editor
- **Instant Testing**: Run tests and see results immediately
- **Progress Tracking**: Never lose your place
- **Hints System**: Get help when you need it
- **Beautiful UI**: Professional design with dark/light themes

---

## 🛠 Troubleshooting

### Port Already in Use

If port 5173 is busy:

```bash
npm run dev -- --port 3000
```

### Clear Progress

Open browser console and run:

```javascript
localStorage.removeItem('zero-to-hero-progress')
```

Then refresh the page.

### Regenerate Catalog

If you add new exercises or update existing ones:

```bash
npm run generate-catalog
```

---

## 📦 Build for Production

```bash
npm run build
```

The output will be in the `dist/` directory. You can deploy this to:

- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Or run it locally:

```bash
npm run preview
```

---

## 🎓 Learning Path

### Complete Beginner
Start with Book 1, Chapter 04 and work your way through sequentially.

### Some HTML/CSS Knowledge
Jump to Book 2 (JavaScript Developer)

### JavaScript Developer
Start with Book 3 (Modern Frameworks)

### React/Vue Developer
Focus on Book 4 (Full-Stack Professional)

---

## 💡 Best Practices

1. **Read instructions fully** before coding
2. **Test frequently** as you write
3. **Use hints sparingly** - struggle leads to learning
4. **Review solutions** after completing to learn alternative approaches
5. **Take notes** - write down key concepts you learn
6. **Build projects** - apply what you learn in real projects

---

## 🤝 Need Help?

- Check the main README.md for detailed documentation
- Look at exercise instructions for specific guidance
- Use the hints system built into each exercise
- Review solutions after attempting yourself

---

**Happy Coding! 🎉**

You're on your way from zero to hero!
