# Chapter 22 Quiz: Chrome DevTools - The Complete Guide

**Total Questions:** 15
**Passing Score:** 80% (12/15 correct)
**Time Limit:** 20 minutes (recommended)

---

## Questions

### 1. Opening DevTools (Easy)
Which of the following are valid ways to open Chrome DevTools?

- [ ] A) Right-click → Inspect
- [ ] B) Press F12
- [ ] C) Press Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (Mac)
- [ ] D) All of the above

<details>
<summary>Answer</summary>

**D) All of the above**

All three methods open Chrome DevTools. Additionally, you can use Ctrl+Shift+J (Cmd+Option+J on Mac) to open directly to the Console panel.
</details>

---

### 2. Elements Panel (Easy)
What does pressing the **H** key do when an element is selected in the Elements panel?

- [ ] A) Opens Help documentation
- [ ] B) Toggles `display: none` on the element
- [ ] C) Highlights the element on the page
- [ ] D) Shows the element's HTML source

<details>
<summary>Answer</summary>

**B) Toggles `visibility: hidden` on the element**

Actually, the H key toggles `visibility: hidden` (not `display: none`). This is useful for temporarily hiding elements to see what's behind them without deleting them from the DOM.
</details>

---

### 3. Console Utilities (Medium)
What is the difference between `$()` and `$$()` in the DevTools Console?

- [ ] A) `$()` is jQuery, `$$()` is for CSS selectors
- [ ] B) `$()` returns one element, `$$()` returns an array of elements
- [ ] C) They are identical
- [ ] D) `$()` is deprecated, use `$$()` instead

<details>
<summary>Answer</summary>

**B) `$()` returns one element, `$$()` returns an array of elements**

- `$('selector')` is shorthand for `document.querySelector()`
- `$$('selector')` is shorthand for `document.querySelectorAll()` but returns an array (not NodeList)

Note: If the page includes jQuery, `$` will reference jQuery instead of the DevTools utility.
</details>

---

### 4. Special Variables (Medium)
What does `$0` represent in the DevTools Console?

- [ ] A) The first element on the page
- [ ] B) The currently selected element in the Elements panel
- [ ] C) The most recently logged value
- [ ] D) An undefined variable

<details>
<summary>Answer</summary>

**B) The currently selected element in the Elements panel**

`$0` references the currently selected element. `$1`, `$2`, `$3`, and `$4` reference the previously selected elements (in order).

```javascript
// Select an element in Elements panel, then:
$0                        // The selected element
$0.style.color = 'red'   // Change its color
```
</details>

---

### 5. Breakpoints (Medium)
Which type of breakpoint would you use to pause execution when a specific DOM element is modified?

- [ ] A) Line-of-code breakpoint
- [ ] B) Conditional breakpoint
- [ ] C) DOM breakpoint
- [ ] D) Event listener breakpoint

<details>
<summary>Answer</summary>

**C) DOM breakpoint**

DOM breakpoints pause when:
- Subtree modifications (child elements change)
- Attribute modifications (attributes change)
- Node removal (element is removed)

Set them by right-clicking an element in the Elements panel → Break on.
</details>

---

### 6. Stepping Through Code (Medium)
When debugging, what's the difference between "Step Over" (F10) and "Step Into" (F11)?

- [ ] A) No difference, they're aliases
- [ ] B) "Step Over" executes the current line; "Step Into" enters function calls
- [ ] C) "Step Over" skips functions; "Step Into" runs them
- [ ] D) "Step Over" is faster

<details>
<summary>Answer</summary>

**B) "Step Over" executes the current line; "Step Into" enters function calls**

- **Step Over (F10):** Executes the current line without entering functions
- **Step Into (F11):** Steps into function calls to debug them
- **Step Out (Shift+F11):** Completes current function and returns to caller

```javascript
function calculate() {
  const a = getValue();  // Step Over: runs getValue(), moves to next line
                         // Step Into: enters getValue() function
  return a * 2;
}
```
</details>

---

### 7. Network Panel (Medium)
In the Network panel waterfall, what does the blue bar represent?

- [ ] A) DNS lookup
- [ ] B) Downloading (content download)
- [ ] C) Waiting (TTFB - Time To First Byte)
- [ ] D) Initial connection

<details>
<summary>Answer</summary>

**B) Downloading (content download)**

Network waterfall colors:
- **Light gray:** Queueing
- **Dark gray/brown:** Stalled
- **Orange:** DNS Lookup
- **Orange:** Initial connection
- **Green:** SSL/TLS negotiation
- **Green:** Waiting (TTFB)
- **Blue:** Content Download
</details>

---

### 8. Performance Panel (Hard)
What does the FPS (Frames Per Second) chart in the Performance panel indicate?

- [ ] A) Network request speed
- [ ] B) How smoothly the page is rendering
- [ ] C) JavaScript execution speed
- [ ] D) Memory usage

<details>
<summary>Answer</summary>

**B) How smoothly the page is rendering**

- **Green bars:** High FPS (good, 60fps)
- **Red bars:** Dropped frames (bad, janky)
- **Goal:** Consistent 60 FPS for smooth animations

FPS drops indicate rendering performance issues like:
- Long-running JavaScript
- Complex CSS animations
- Forced synchronous layouts
</details>

---

### 9. Memory Leaks (Hard)
Which technique is best for finding memory leaks in Chrome DevTools?

- [ ] A) Performance panel recording
- [ ] B) The 3-snapshot technique with heap snapshots
- [ ] C) Network panel monitoring
- [ ] D) Console memory profiling

<details>
<summary>Answer</summary>

**B) The 3-snapshot technique with heap snapshots**

**3-Snapshot Technique:**
1. Take heap snapshot (Snapshot 1)
2. Perform action that might leak memory
3. Take snapshot 2
4. Repeat the action
5. Take snapshot 3
6. Compare snapshots 1 and 3
7. Objects that grew between 1 and 3 are likely leaks

Look for:
- Detached DOM nodes
- Event listeners accumulating
- Closures retaining unnecessary references
</details>

---

### 10. Lighthouse (Medium)
What are the Core Web Vitals metrics measured by Lighthouse?

- [ ] A) FPS, TTI, FCP
- [ ] B) LCP, FID, CLS
- [ ] C) TTFB, DOMContentLoaded, Load
- [ ] D) FCP, SI, TTI

<details>
<summary>Answer</summary>

**B) LCP, FID, CLS**

**Core Web Vitals:**
- **LCP (Largest Contentful Paint):** Largest element render time
  - Good: <2.5s
- **FID (First Input Delay):** Time until page responds to first interaction
  - Good: <100ms
  - Lighthouse uses TBT (Total Blocking Time) as a proxy
- **CLS (Cumulative Layout Shift):** Visual stability
  - Good: <0.1

These are Google's official user experience metrics.
</details>

---

### 11. Coverage Tool (Medium)
What does the Coverage tool in DevTools show?

- [ ] A) Code test coverage
- [ ] B) Unused CSS and JavaScript
- [ ] C) Browser compatibility
- [ ] D) Security vulnerabilities

<details>
<summary>Answer</summary>

**B) Unused CSS and JavaScript**

Access: Ctrl+Shift+P → "Coverage"

The Coverage tool shows:
- Total bytes loaded
- Unused bytes (red in the bar)
- Used bytes (blue/green in the bar)
- % of code used

**Use case:** Identify and remove unused code to reduce bundle size.

```
Example output:
vendor.js: 1.2 MB (85% unused) ⚠️
main.css: 250 KB (60% unused) ⚠️
```
</details>

---

### 12. Conditional Breakpoints (Hard)
When should you use a conditional breakpoint instead of a regular breakpoint?

- [ ] A) When you only want to pause if a specific condition is true
- [ ] B) When the code is asynchronous
- [ ] C) When you need to step through code faster
- [ ] D) When debugging production code

<details>
<summary>Answer</summary>

**A) When you only want to pause if a specific condition is true**

**Example:**
```javascript
// You have a loop running 1000 times
for (let i = 0; i < 1000; i++) {
  processItem(items[i]);  // Set conditional breakpoint here
}

// Condition: i === 999
// Now it only pauses on the last iteration!
```

**Use cases:**
- Loops with many iterations
- Functions called frequently
- Pause only when specific values occur
- Debug intermittent bugs
</details>

---

### 13. Local Overrides (Hard)
What is the purpose of Local Overrides in the Sources panel?

- [ ] A) Override local variables during debugging
- [ ] B) Save changes to files and persist them across page reloads
- [ ] C) Override CSS with !important
- [ ] D) Block network requests

<details>
<summary>Answer</summary>

**B) Save changes to files and persist them across page reloads**

**Local Overrides** let you:
- Edit files in DevTools
- Save changes locally
- Persist edits across page reloads
- Test fixes without deploying

**Setup:**
1. Sources → Overrides
2. Select folder for overrides
3. Allow DevTools access
4. Edit files and save (Ctrl+S)
5. Changes persist even after refresh!

**Use case:** Test fixes on production sites without modifying server files.
</details>

---

### 14. React Developer Tools (Medium)
What can you do with the React Developer Tools Profiler?

- [ ] A) Inspect React component props and state
- [ ] B) Measure component render performance
- [ ] C) Edit component source code
- [ ] D) Deploy React apps

<details>
<summary>Answer</summary>

**B) Measure component render performance**

**React DevTools has two tabs:**
1. **Components:** Inspect props, state, hooks, component tree
2. **Profiler:** Measure render performance

**Profiler shows:**
- Which components rendered
- How long each render took
- Why components re-rendered
- Flame chart of render times
- Ranked chart (slowest to fastest)

**Use case:** Find unnecessary re-renders and optimize React performance.
</details>

---

### 15. Command Menu (Easy)
How do you open the Command Menu in DevTools?

- [ ] A) Ctrl+K or Cmd+K
- [ ] B) Ctrl+Shift+P or Cmd+Shift+P
- [ ] C) Ctrl+M or Cmd+M
- [ ] D) Press F1

<details>
<summary>Answer</summary>

**B) Ctrl+Shift+P or Cmd+Shift+P**

The **Command Menu** is DevTools' quick launcher. Use it to:
- Run commands (e.g., "Screenshot")
- Open panels (e.g., "Coverage")
- Enable settings (e.g., "3D view")
- Access hidden features

**Examples:**
```
Ctrl+Shift+P → Type:
- "screenshot" → Capture screenshots
- "coverage" → Open Coverage tool
- "theme" → Switch DevTools theme
- "disable javascript" → Disable JS
- "sensors" → Open Sensors panel
```

**Pro tip:** It's the fastest way to access DevTools features!
</details>

---

## Scoring

**Count your correct answers:**

- **13-15 correct (87-100%):** 🏆 **DevTools Expert!** You've mastered Chrome DevTools!
- **10-12 correct (67-86%):** ✅ **Proficient!** You have strong DevTools knowledge.
- **7-9 correct (47-66%):** 📚 **Intermediate.** Review the chapter and practice more.
- **Below 7 (<46%):** 🔄 **Needs Review.** Re-read the chapter and complete exercises.

---

## Key Concepts to Review

If you missed questions, review these topics:

- **Elements Panel:** Inspecting, editing, box model, :hov states
- **Console Utilities:** `$()`, `$$()`, `$0`, `copy()`, `monitor()`
- **Sources Panel:** Breakpoints, stepping, watch expressions, local overrides
- **Network Panel:** Waterfall chart, timing, throttling
- **Performance Panel:** FPS, flame chart, bottlenecks
- **Memory Panel:** Heap snapshots, 3-snapshot technique, detached nodes
- **Lighthouse:** Core Web Vitals, audits, optimization opportunities
- **Coverage Tool:** Finding unused code
- **Command Menu:** Quick access to DevTools features

---

## Next Steps

✅ **If you passed:** You're ready for the DevTools Mastery Challenge!
📚 **If you need review:** Complete exercises 1-5 again, focusing on weak areas.
🎯 **Either way:** Practice DevTools daily - it's a skill that improves with use!

---

**Great work on completing the quiz!** 🎉

