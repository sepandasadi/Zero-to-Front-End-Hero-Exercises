# Chapter 12: Debugging Strategies - Exercises

Master debugging techniques through hands-on practice! 🔍

---

## 📚 Exercise Overview

| Exercise | Difficulty | Time | Focus Area |
|----------|-----------|------|------------|
| 1. DevTools Mastery | Beginner | 1-2 hours | Browser DevTools |
| 2. Breakpoint Debugging | Beginner | 1-2 hours | Debugger usage |
| 3. React Bug Hunt | Intermediate | 2-3 hours | React debugging |
| 4. Network Debugging | Intermediate | 2-3 hours | API debugging |
| 5. Performance Profiling | Advanced | 3-4 hours | Performance issues |
| 6. Production Debugging | Advanced | 3-4 hours | Error tracking |
| **Challenge** | Advanced | 8-10 hours | **Complete debugging system** |

**Total Time:** 20-25 hours  
**Completion:** Complete exercises 1-6, then attempt the challenge

---

## 🎯 Learning Objectives

After completing these exercises, you'll be able to:

- ✅ Use Browser DevTools effectively (Console, Debugger, Network, Performance)
- ✅ Set breakpoints and step through code
- ✅ Debug React applications (hooks, state, props)
- ✅ Debug API calls and network issues
- ✅ Profile and fix performance bottlenecks
- ✅ Set up error tracking for production
- ✅ Handle errors gracefully
- ✅ Create effective logging strategies

---

## 📝 Exercises

### Exercise 1: DevTools Mastery
**File:** `exercise-01-devtools-mastery/`  
**Difficulty:** Beginner  
**Time:** 1-2 hours

Practice using all Browser DevTools features:
- Console API (table, group, time, trace)
- Elements tab (inspect, edit styles)
- Network tab (inspect requests, copy as cURL)
- Application tab (localStorage, cookies)
- Performance tab (record profile)

**Deliverables:**
- Console logger with multiple methods
- Screenshot of styled console output
- Network request analysis document
- Performance profile report

---

### Exercise 2: Breakpoint Debugging
**File:** `exercise-02-breakpoint-debugging/`  
**Difficulty:** Beginner  
**Time:** 1-2 hours

Master breakpoint debugging:
- Set breakpoints in DevTools
- Use `debugger` statement
- Step over, step into, step out
- Conditional breakpoints
- Watch expressions
- Call stack navigation

**Deliverables:**
- Buggy app with intentional bugs
- Fix all bugs using only breakpoints (no console.log!)
- Document debugging process
- Screenshot showing breakpoints and watches

---

### Exercise 3: React Bug Hunt
**File:** `exercise-03-react-bug-hunt/`  
**Difficulty:** Intermediate  
**Time:** 2-3 hours

Debug common React bugs:
- Infinite re-render loops
- Missing useEffect dependencies
- Stale closures
- Memory leaks (event listeners, intervals)
- Object/array identity issues
- Missing cleanup functions

**Deliverables:**
- React app with 10 intentional bugs
- Fix all bugs and document each one
- Add React DevTools screenshots
- Explain root cause of each bug

---

### Exercise 4: Network Debugging
**File:** `exercise-04-network-debugging/`  
**Difficulty:** Intermediate  
**Time:** 2-3 hours

Debug API and network issues:
- 404 Not Found errors
- 401 Unauthorized (missing auth tokens)
- CORS errors
- Slow requests (> 3s)
- Failed requests (network errors)
- Incorrect request payloads

**Deliverables:**
- App with broken API calls
- Fix all network issues
- Document each fix in Network tab
- Create API error handling guide

---

### Exercise 5: Performance Profiling
**File:** `exercise-05-performance-profiling/`  
**Difficulty:** Advanced  
**Time:** 3-4 hours

Profile and fix performance issues:
- Long tasks (> 50ms) blocking main thread
- Unnecessary re-renders
- Memory leaks
- Large bundle sizes
- Slow animations
- Inefficient algorithms

**Deliverables:**
- Slow app (intentionally poor performance)
- Performance profile (before)
- Fix all bottlenecks
- Performance profile (after)
- Report showing improvements (FPS, load time)

---

### Exercise 6: Production Debugging
**File:** `exercise-06-production-debugging/`  
**Difficulty:** Advanced  
**Time:** 3-4 hours

Set up production debugging:
- Configure source maps
- Set up Sentry error tracking
- Create global error handlers
- Add breadcrumb tracking
- Create environment-based logger
- Test error tracking with intentional errors

**Deliverables:**
- Production-ready app with error tracking
- Sentry dashboard with captured errors
- Custom logger with log levels
- Error boundary components
- Documentation for error tracking setup

---

## 🏆 Challenge: Build a Debugging Dashboard

**Difficulty:** Advanced  
**Time:** 8-10 hours

Build a comprehensive debugging and monitoring dashboard for a real application.

**Requirements:**
- Real-time error tracking
- Performance monitoring
- User session replay
- Network request logging
- Console log capture
- Custom error boundaries
- Automatic bug reports
- Analytics integration

**See:** `challenge-debugging-dashboard/README.md`

---

## 📊 Quiz

Test your debugging knowledge!

**File:** `quiz.md`  
**Questions:** 15 comprehensive questions  
**Passing Score:** 13/15 (87%)

Topics covered:
- Browser DevTools usage
- Breakpoint debugging
- React debugging
- Error handling
- Performance profiling
- Production debugging

---

## ✅ Completion Checklist

Track your progress:

- [ ] Exercise 1: DevTools Mastery
- [ ] Exercise 2: Breakpoint Debugging
- [ ] Exercise 3: React Bug Hunt
- [ ] Exercise 4: Network Debugging
- [ ] Exercise 5: Performance Profiling
- [ ] Exercise 6: Production Debugging
- [ ] Challenge: Debugging Dashboard
- [ ] Quiz (13/15 minimum)

---

## 🎯 Success Criteria

You've mastered debugging when you can:

1. **Find bugs 10x faster** using DevTools instead of console.log
2. **Debug React apps** using React DevTools and understanding common pitfalls
3. **Debug API issues** using Network tab and proper error handling
4. **Profile performance** and identify bottlenecks
5. **Set up production debugging** with error tracking and logging
6. **Stay calm** when debugging complex issues
7. **Document bugs** effectively for future reference

---

## 💡 Tips for Success

1. **Practice in real projects** — apply these techniques to your own apps
2. **Keep DevTools open** — make it a habit to check Console, Network, etc.
3. **Learn keyboard shortcuts** — F8 (continue), F10 (step over), F11 (step into)
4. **Read error messages carefully** — they usually tell you exactly what's wrong
5. **Use source maps** — debug minified production code
6. **Set up error tracking early** — don't wait for production bugs
7. **Create good error messages** — your future self will thank you
8. **Test edge cases** — most bugs happen with unexpected inputs
9. **Pair debug complex issues** — two heads are better than one
10. **Document solutions** — build your personal debugging knowledge base

---

## 📚 Additional Resources

- **Chrome DevTools Docs:** https://developer.chrome.com/docs/devtools/
- **React DevTools:** https://react.dev/learn/react-developer-tools
- **Sentry Docs:** https://docs.sentry.io/
- **Performance API:** https://developer.mozilla.org/en-US/docs/Web/API/Performance
- **Source Maps:** https://web.dev/source-maps/

---

## 🎓 What's Next?

After completing these exercises, you'll be ready for:

**Chapter 13: Testing Fundamentals**
- Unit testing with Jest/Vitest
- Integration testing
- End-to-end testing with Playwright
- Test-driven development (TDD)
- Achieving high test coverage

**Testing prevents bugs. Debugging fixes them. Master both!** 🧪🔍✨

