# Chapter 36: Frameworks and Libraries - Exercises

Welcome to the Chapter 36 exercises! In this chapter, you're diving into the world of JavaScript frameworks. These exercises will help you understand React, Vue, Angular, and the core concepts that power modern web development.

---

## 🎯 Learning Objectives

By completing these exercises, you will:
- Build components in React and Vue
- Understand state management in frameworks
- Create reusable custom hooks and composables
- Compare different framework approaches
- Build production-quality components
- Master framework best practices

---

## 📚 Exercises Overview

| Exercise | Name | Difficulty | Time | Framework |
|----------|------|------------|------|-----------|
| 01 | React Counter App | Beginner | 20-30 min | React |
| 02 | Vue Todo List | Beginner-Int | 45-60 min | Vue |
| 03 | Framework Comparison | Intermediate | 90-120 min | All 3 |
| 04 | Custom useFetch Hook | Intermediate | 45-60 min | React |
| 05 | Accordion Component | Int-Advanced | 60-90 min | React |
| 06 | useLocalStorage Composable | Intermediate | 45-60 min | Vue |

### Challenge Project
**Weather & News Dashboard** - Advanced, 6-10 hours
Build a full production-quality dashboard with real APIs, themes, and local storage

---

## 🚀 Getting Started

### Prerequisites

Before starting these exercises, make sure you have:
- ✅ Completed Chapter 36 in the book
- ✅ Node.js and npm installed
- ✅ Basic understanding of JavaScript (ES6+)
- ✅ A code editor (VS Code recommended)
- ✅ Browser DevTools familiarity

### Setup

Most exercises use **Vite** for fast development. For each exercise:

```bash
# Navigate to the exercise folder
cd exercise-01-react-counter

# Install dependencies (if package.json exists)
npm install

# Start development server
npm run dev
```

---

## 📝 Exercise Descriptions

### Exercise 1: React Counter App
**Path:** `exercise-01-react-counter/`
**Focus:** useState, event handling, JSX basics

Build a counter with increment, decrement, reset, and status display. Perfect introduction to React state management.

[View Exercise →](./exercise-01-react-counter/README.md)

---

### Exercise 2: Vue Todo List
**Path:** `exercise-02-vue-todo/`
**Focus:** Vue reactivity, v-model, v-for, event handling

Create a full-featured todo list with add, complete, delete, filters, and stats. Learn Vue's reactive data system.

[View Exercise →](./exercise-02-vue-todo/README.md)

---

### Exercise 3: Framework Comparison
**Path:** `exercise-03-framework-comparison/`
**Focus:** React vs Vue vs Angular syntax and patterns

Build the same product card component in all three frameworks to understand their differences and similarities.

[View Exercise →](./exercise-03-framework-comparison/README.md)

---

### Exercise 4: Custom useFetch Hook
**Path:** `exercise-04-usefetch-hook/`
**Focus:** React custom hooks, useEffect, async operations

Extract reusable data fetching logic into a custom hook that handles loading, success, and error states.

[View Exercise →](./exercise-04-usefetch-hook/README.md)

---

### Exercise 5: Accordion Component
**Path:** `exercise-05-accordion-component/`
**Focus:** Component composition, Context API, compound components

Build a professional accordion component system with keyboard navigation and accessibility.

[View Exercise →](./exercise-05-accordion-component/README.md)

---

### Exercise 6: useLocalStorage Composable
**Path:** `exercise-06-uselocalstorage/`
**Focus:** Vue composables, watchers, localStorage

Create a reusable Vue composable that syncs reactive data with localStorage automatically.

[View Exercise →](./exercise-06-uselocalstorage/README.md)

---

## 🏆 Challenge Project: Weather & News Dashboard

**Path:** `challenge-weather-news-dashboard/`
**Estimated Time:** 6-10 hours
**Difficulty:** Advanced

Build a production-quality dashboard that displays real-time weather and news using actual APIs. This project combines everything you've learned:

- Component architecture
- State management
- API integration
- Theme switching (dark/light mode)
- Local storage persistence
- Responsive design
- Loading and error states

[View Challenge →](./challenge-weather-news-dashboard/README.md)

---

## 📊 Suggested Learning Path

### For Absolute Beginners:
1. **Start with Exercise 1** (React Counter) - 20 min
2. **Then Exercise 2** (Vue Todo) - 45 min
3. **Try Exercise 3** (Framework Comparison) - 90 min
4. Take a break, review concepts
5. Pick either React (Ex 4, 5) or Vue (Ex 6) path
6. Build the Challenge Project in your chosen framework

### For Intermediate Learners:
1. **Skim Exercises 1-2** (should be review)
2. **Focus on Exercise 3** (Framework Comparison)
3. **Complete Exercises 4-6** (all three)
4. **Build the Challenge Project** with all bonus features

### For Advanced Learners:
1. Complete all exercises quickly
2. Add all bonus challenges
3. Build the Challenge Project
4. Add extra features (tests, animations, etc.)
5. Deploy to production (Netlify/Vercel)

---

## 🛠️ Tools You'll Need

### React Exercises (1, 3, 4, 5)
```bash
# Create React app with Vite
npm create vite@latest my-app -- --template react
```

### Vue Exercises (2, 3, 6)
```bash
# Create Vue app with Vite
npm create vite@latest my-app -- --template vue
```

### Browser Extensions (Recommended)
- **React DevTools** - Debug React components
- **Vue DevTools** - Debug Vue components
- **Axe DevTools** - Check accessibility

---

## ✅ Completion Checklist

Track your progress:

- [ ] Exercise 1: React Counter App
- [ ] Exercise 2: Vue Todo List
- [ ] Exercise 3: Framework Comparison
- [ ] Exercise 4: Custom useFetch Hook
- [ ] Exercise 5: Accordion Component
- [ ] Exercise 6: useLocalStorage Composable
- [ ] Challenge: Weather & News Dashboard
- [ ] Quiz (in book chapter)

---

## 💡 Tips for Success

1. **Don't skip the beginner exercises** - They build important foundations
2. **Type the code yourself** - Don't copy-paste; build muscle memory
3. **Experiment** - Break things, try variations, test edge cases
4. **Use DevTools** - React/Vue DevTools are invaluable for debugging
5. **Read error messages** - They tell you exactly what's wrong
6. **Start simple** - Get basic version working, then add features
7. **Console.log liberally** - Print state to understand what's happening
8. **Take breaks** - Come back with fresh eyes if stuck
9. **Ask for help** - Use docs, forums, communities
10. **Have fun!** - Building things is rewarding!

---

## 🐛 Common Issues & Solutions

### Issue: "npm: command not found"
**Solution:** Install Node.js from nodejs.org

### Issue: "Port 5173 already in use"
**Solution:** Kill the other process or change port in vite.config.js

### Issue: React component not updating
**Solution:** Check if you're mutating state directly (use setState!)

### Issue: Vue v-model not working
**Solution:** Make sure the data property is defined in data() or ref()

### Issue: "Cannot find module..."
**Solution:** Run `npm install` in the project directory

---

## 📖 Additional Resources

**Official Documentation:**
- React: https://react.dev/
- Vue: https://vuejs.org/
- Angular: https://angular.dev/

**Interactive Tutorials:**
- Scrimba (React): https://scrimba.com/learn-react-c0e
- Vue Tutorial: https://vuejs.org/tutorial/
- Angular Tutorial: https://angular.dev/tutorials/learn-angular

**Communities:**
- r/reactjs
- r/vuejs
- r/angular
- Dev.to
- Stack Overflow

---

## 🎓 What's Next?

After completing these exercises:
1. **Chapter 37: State Management** - Redux, Zustand, Pinia
2. **Chapter 38-39: React Deep Dives** - Advanced patterns
3. **Build your own projects!** - Portfolio, apps, experiments

---

## 🌟 Share Your Work!

Built something cool? Share it!
- Post on Twitter/LinkedIn with #ZeroToFrontEndHero
- Add to your GitHub portfolio
- Deploy it live (Netlify, Vercel, GitHub Pages)
- Share with the community

---

**Remember:** The goal isn't perfection—it's progress! Every bug you fix, every component you build, every concept you understand makes you a better developer.

**You've got this!** 🚀

---

## 📬 Feedback

Found an issue with an exercise? Have suggestions?
Please open an issue on the GitHub repository!

Happy coding! 💻✨

