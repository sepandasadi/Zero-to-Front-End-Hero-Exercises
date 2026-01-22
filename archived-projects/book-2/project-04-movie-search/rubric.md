# Movie Search Application - Evaluation Rubric

Total: **100 points**

---

## 1. API Integration & Data Handling (30 points)

### API Implementation (15 pts)
- [ ] **Excellent (13-15 pts):** Clean API calls, error handling, data transformation
- [ ] **Good (10-12 pts):** API works correctly, basic error handling
- [ ] **Satisfactory (7-9 pts):** API works but limited error handling
- [ ] **Needs Work (0-6 pts):** API unreliable or broken

### Search Functionality (10 pts)
- [ ] **Search works** (4 pts) - Returns results
- [ ] **Validation** (2 pts) - Checks input
- [ ] **Loading states** (2 pts) - Shows while fetching
- [ ] **Error handling** (2 pts) - Handles failures

### Movie Details (5 pts)
- [ ] **Fetches details** (3 pts) - Gets full movie info
- [ ] **Displays correctly** (2 pts) - All data shown

---

## 2. Core Functionality (30 points)

### Search & Display (12 pts)
- [ ] **Search bar works** (3 pts) - Can search movies
- [ ] **Results displayed** (4 pts) - Grid of movie cards
- [ ] **Movie cards complete** (3 pts) - Poster, title, year, rating
- [ ] **No results handled** (2 pts) - Clear message

### Modal Implementation (10 pts)
- [ ] **Modal opens** (3 pts) - Click to view details
- [ ] **Full details shown** (4 pts) - All movie information
- [ ] **Modal closes** (3 pts) - Close button, outside click, Escape

### Watchlist (8 pts)
- [ ] **Add to watchlist** (3 pts) - Can save movies
- [ ] **Remove from watchlist** (2 pts) - Can delete
- [ ] **localStorage persistence** (3 pts) - Data persists

---

## 3. Advanced Features (20 points)

### Pagination (10 pts)
- [ ] **Pagination works** (5 pts) - Next/previous pages
- [ ] **Page numbers** (3 pts) - Shows current page
- [ ] **Navigation** (2 pts) - Jump to specific page

### Watchlist Management (10 pts)
- [ ] **View watchlist** (4 pts) - Display saved movies
- [ ] **Watchlist count** (2 pts) - Shows number saved
- [ ] **Visual indicators** (2 pts) - Shows if in watchlist
- [ ] **Clear watchlist** (2 pts) - Remove all option

---

## 4. User Interface & Experience (15 points)

### Design & Layout (7 pts)
- [ ] **Professional appearance** (3 pts) - Modern, clean
- [ ] **Visual hierarchy** (2 pts) - Clear organization
- [ ] **Color scheme** (2 pts) - Appealing colors

### Responsiveness (5 pts)
- [ ] **Mobile (320px+)** (2 pts) - Works on mobile
- [ ] **Tablet (768px+)** (2 pts) - Adapts for tablet
- [ ] **Desktop (1024px+)** (1 pt) - Optimized for desktop

### User Feedback (3 pts)
- [ ] **Loading indicators** (1 pt) - Shows progress
- [ ] **Error messages** (1 pt) - Clear errors
- [ ] **Success feedback** (1 pt) - Confirms actions

---

## 5. Code Quality & Best Practices (5 points)

### Code Organization (2 pts)
- [ ] **Modular structure** (1 pt) - Organized code
- [ ] **Clean functions** (1 pt) - Focused, reusable

### Error Handling (2 pts)
- [ ] **API errors handled** (1 pt) - Catches errors
- [ ] **User-friendly messages** (1 pt) - Clear feedback

### Best Practices (1 pt)
- [ ] **No console errors** (0.5 pt) - Clean execution
- [ ] **Comments present** (0.5 pt) - Explains code

---

## 📊 Grading Scale

**90-100 points: Excellent (A)**
- All features work perfectly
- Comprehensive error handling
- Professional UI/UX
- Fully responsive
- Clean, modular code
- Portfolio-worthy

**80-89 points: Good (B)**
- Core features work well
- Good error handling
- Nice UI
- Mostly responsive
- Well-organized code

**70-79 points: Satisfactory (C)**
- Basic features work
- Some error handling
- Functional UI
- Some responsive issues
- Acceptable code

**60-69 points: Pass (D)**
- Minimal functionality
- Limited error handling
- Basic UI
- Not responsive
- Disorganized code

**Below 60: Needs Revision (F)**
- Doesn't work properly
- No error handling
- Poor UI
- Major issues

---

## ✅ Self-Evaluation Checklist

Before submitting, verify:

### Functionality:
- [ ] Can search for movies
- [ ] Results display correctly
- [ ] Can view movie details
- [ ] Modal opens and closes
- [ ] Can add/remove from watchlist
- [ ] Watchlist persists after refresh
- [ ] Pagination works
- [ ] No console errors

### Error Handling:
- [ ] Empty search handled
- [ ] No results message
- [ ] Network errors caught
- [ ] API errors displayed
- [ ] Invalid input validated

### UI/UX:
- [ ] Professional appearance
- [ ] Works on mobile
- [ ] Clear visual feedback
- [ ] Intuitive to use
- [ ] Smooth interactions

### Code:
- [ ] Clean and organized
- [ ] Functions are focused
- [ ] Variables well-named
- [ ] Comments where needed
- [ ] No duplicate code

---

## 🎯 Instructor Notes

### What I'm Looking For:

**API Integration:**
- Proper async/await usage
- Error handling for all cases
- Data transformation
- Efficient API calls

**Functionality:**
- All features work reliably
- Edge cases handled
- User experience is smooth
- Data persists correctly

**UI/UX:**
- Professional design
- Responsive layout
- Clear visual feedback
- Intuitive navigation

**Code Quality:**
- Modular structure
- Reusable functions
- Clean, readable code
- Proper error handling

### Common Issues to Avoid:
- ❌ No API key or exposed in code
- ❌ No error handling
- ❌ Not responsive
- ❌ Missing placeholder for no poster
- ❌ No loading states
- ❌ Modal can't close
- ❌ Watchlist doesn't persist
- ❌ Pagination broken

### Bonus Points (+5 max):
- Search history (localStorage)
- Trending movies on load
- Advanced filtering
- Skeleton screens
- Search suggestions
- Infinite scroll
- Movie trailers
- Dark mode
- Keyboard shortcuts

---

**Target:** Build a movie app you'd actually want to use! 🎬✨

