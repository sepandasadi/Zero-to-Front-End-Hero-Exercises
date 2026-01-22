# Task Manager Application - Requirements

## Data Structure

### Task Object
```javascript
{
  id: 'uuid-v4-string',              // Unique identifier
  title: 'Task title',               // Required, max 100 chars
  description: 'Task description',   // Optional, max 500 chars
  category: 'work',                  // Required: work, personal, shopping, other
  priority: 'medium',                // Required: low, medium, high
  completed: false,                  // Boolean
  createdAt: '2026-01-22T10:30:00Z', // ISO timestamp
  updatedAt: '2026-01-22T10:30:00Z'  // ISO timestamp
}
```

### State Management
```javascript
let tasks = []; // Single source of truth
let currentFilters = {
  category: 'all',
  status: 'all',
  searchTerm: '',
  sortBy: 'date' // date, priority, title
};
```

---

## Functional Requirements

### 1. Add Task
**User Action:** Fill form and click "Add Task"

**Validation:**
- Title is required (1-100 characters)
- Description is optional (max 500 characters)
- Category must be selected
- Priority must be selected

**Behavior:**
- Generate unique ID
- Set createdAt and updatedAt timestamps
- Add to tasks array
- Save to localStorage
- Clear form
- Re-render task list
- Show success feedback

**Error Handling:**
- Display validation errors inline
- Prevent submission if invalid
- Show helpful error messages

---

### 2. Display Tasks
**UI Components:**
- Task cards showing:
  - Title (bold)
  - Description (if present)
  - Category badge
  - Priority indicator (color-coded)
  - Completion checkbox
  - Edit button
  - Delete button
  - Timestamp (relative: "2 hours ago")

**Rendering:**
- Empty state when no tasks
- Empty state when filters return no results
- Smooth animations when adding/removing
- Responsive grid/list layout

---

### 3. Edit Task
**User Action:** Click "Edit" button on task card

**Behavior:**
- Populate form with task data
- Change "Add Task" button to "Update Task"
- Update task in array on submission
- Update updatedAt timestamp
- Save to localStorage
- Re-render
- Reset form to "Add" mode

**Validation:**
- Same as Add Task validation

---

### 4. Delete Task
**User Action:** Click "Delete" button

**Behavior:**
- Show confirmation dialog: "Delete '[task title]'?"
- On confirm:
  - Remove from tasks array
  - Save to localStorage
  - Re-render
  - Show success message
- On cancel:
  - Close dialog, no action

---

### 5. Toggle Completion
**User Action:** Click checkbox on task card

**Behavior:**
- Toggle completed boolean
- Update updatedAt timestamp
- Save to localStorage
- Update UI immediately (strikethrough, opacity, etc.)
- Don't remove from view (stays visible with current filters)

---

### 6. Filter by Category
**UI:** Dropdown select

**Options:**
- All
- Work
- Personal
- Shopping
- Other

**Behavior:**
- Filter tasks array by category
- Re-render filtered results
- Preserve other active filters (status, search)
- Update URL or state

---

### 7. Filter by Status
**UI:** Buttons or dropdown

**Options:**
- All (show everything)
- Active (completed = false)
- Completed (completed = true)

**Behavior:**
- Filter tasks by completion status
- Re-render filtered results
- Preserve other filters

---

### 8. Search Tasks
**UI:** Search input field

**Behavior:**
- Search in title AND description
- Case-insensitive
- Real-time filtering (debounced)
- Clear search button (X)
- Show "No results for '[query]'" if no matches

**Implementation:**
- Debounce search input (300ms)
- Apply search filter with other filters
- Highlight search term in results (bonus)

---

### 9. Sort Tasks
**UI:** Dropdown or buttons

**Options:**
- Date Created (newest first)
- Date Created (oldest first)
- Priority (High → Low)
- Priority (Low → High)
- Title (A → Z)
- Title (Z → A)

**Behavior:**
- Sort filtered tasks
- Re-render in sorted order
- Preserve current filters

---

### 10. localStorage Persistence
**Save:**
- After any CRUD operation
- Store tasks array as JSON string
- Key: 'taskManagerTasks'

**Load:**
- On page load/refresh
- Parse JSON from localStorage
- Populate tasks array
- Render tasks

**Error Handling:**
- Handle localStorage quota exceeded
- Handle JSON parse errors
- Provide fallback empty array

---

## UI/UX Requirements

### Layout
- Header with app title
- Form section (collapsible on mobile)
- Filters section (category, status, search, sort)
- Task list/grid
- Footer (optional stats)

### Responsive Design
**Mobile (< 768px):**
- Single column task cards
- Stacked form inputs
- Hamburger menu for filters
- Bottom-fixed "Add Task" button

**Tablet (768-1024px):**
- 2-column task grid
- Side-by-side form inputs

**Desktop (> 1024px):**
- 3-column task grid
- Sidebar with filters
- Inline form

### Visual Feedback
- Loading states (if slow operations)
- Success messages (toast notifications)
- Error messages (inline and toast)
- Hover effects on buttons
- Active states
- Smooth transitions

### Accessibility
- Semantic HTML
- ARIA labels on buttons
- Keyboard navigation
- Focus indicators
- Screen reader friendly
- Form labels associated with inputs

---

## Technical Requirements

### HTML
- Semantic elements (`<form>`, `<section>`, `<article>`)
- Proper form structure with labels
- Data attributes for task IDs
- ARIA attributes where needed

### CSS
- CSS Grid or Flexbox for layout
- CSS transitions for smoothness
- Responsive breakpoints
- Custom properties for theming
- Consistent spacing
- No CSS frameworks (vanilla CSS)

### JavaScript
- ES6+ features (arrow functions, const/let, template literals)
- Array methods (filter, map, sort, find)
- Object destructuring
- Date handling
- Event delegation
- No libraries/frameworks (vanilla JS)

### Code Organization
```
js/
├── app.js        # Main application logic
├── storage.js    # localStorage functions
├── dom.js        # DOM manipulation
└── utils.js      # Helper functions (UUID, date formatting)
```

Or single file if preferred, but well-organized with comments.

---

## Performance Requirements

- [ ] Renders 100+ tasks smoothly
- [ ] Search/filter updates < 100ms
- [ ] No memory leaks
- [ ] Efficient DOM updates (batch where possible)
- [ ] Debounced search input

---

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

---

## Validation Rules

### Title
- **Required**
- Min: 1 character
- Max: 100 characters
- Trim whitespace

### Description
- **Optional**
- Max: 500 characters
- Trim whitespace

### Category
- **Required**
- Must be one of: work, personal, shopping, other

### Priority
- **Required**
- Must be one of: low, medium, high

---

## Testing Checklist

Before submission:
- [ ] Add task works
- [ ] Edit task works
- [ ] Delete task works
- [ ] Toggle completion works
- [ ] Category filter works
- [ ] Status filter works
- [ ] Search works
- [ ] Sort works
- [ ] Multiple filters work together
- [ ] Data persists after refresh
- [ ] Form validation works
- [ ] Empty states display
- [ ] Responsive on all screen sizes
- [ ] No console errors
- [ ] Accessible via keyboard
- [ ] Works in all major browsers

---

## Stretch Goals

After completing all requirements:
1. **Due Dates** - Add date picker and overdue indicators
2. **Drag & Drop** - Reorder tasks via drag and drop
3. **Tags** - Multiple tags per task
4. **Export** - Download tasks as JSON or CSV
5. **Import** - Upload tasks from file
6. **Dark Mode** - Toggle theme with persistence
7. **Statistics** - Dashboard with charts
8. **Keyboard Shortcuts** - Ctrl+N for new task, etc.
9. **Undo/Redo** - Action history
10. **Subtasks** - Nested task lists

---

This specification provides everything needed to build a production-quality task manager. Focus on core features first, then add polish and stretch goals!
