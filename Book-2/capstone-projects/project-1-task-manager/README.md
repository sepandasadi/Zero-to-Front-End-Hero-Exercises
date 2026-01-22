# Project 1: Task Manager Application

**Difficulty:** ⭐⭐ Foundational  
**Estimated Time:** 5-6 hours  
**Skills Practiced:** DOM Manipulation, Event Delegation, Array Methods, localStorage, State Management

## Project Overview

Build a fully functional task management application with create, read, update, and delete (CRUD) capabilities. This foundational project establishes essential JavaScript patterns you'll use throughout your development career.

## What You'll Build

A complete task manager featuring:
- Add, edit, and delete tasks
- Organize tasks by categories (Work, Personal, Shopping, etc.)
- Set priorities (Low, Medium, High)
- Mark tasks as complete/incomplete
- Filter by category and status
- Search tasks by keyword
- Sort tasks multiple ways
- Persistent data storage (localStorage)
- Responsive, professional UI

## Learning Objectives

By completing this project, you will master:
- DOM manipulation and dynamic rendering
- Event delegation for efficiency
- Array methods for filtering and sorting
- Object manipulation and cloning
- localStorage for data persistence
- State management patterns
- Form validation
- Error handling

## Core Features

### Task Structure
```javascript
const task = {
  id: 'uuid-string',
  title: 'Complete JavaScript book',
  description: 'Finish reading Volume 2',
  category: 'personal',
  priority: 'high', // 'low', 'medium', 'high'
  completed: false,
  createdAt: '2026-01-22T10:30:00Z',
  updatedAt: '2026-01-22T10:30:00Z'
};
```

### Required Features
- [ ] Add new tasks with title, description, category, priority
- [ ] Edit existing tasks
- [ ] Delete tasks with confirmation
- [ ] Toggle task completion status
- [ ] Filter by category (All, Work, Personal, Shopping, etc.)
- [ ] Filter by status (All, Active, Completed)
- [ ] Search tasks by keyword (title/description)
- [ ] Sort by priority, date, or alphabetically
- [ ] Data persists across page refreshes
- [ ] Empty states (when no tasks match filters)
- [ ] Form validation
- [ ] Responsive design

## Milestones

### Milestone 1: Basic CRUD (2 hours)
- [ ] Create HTML structure with form and task list
- [ ] Style basic layout
- [ ] Implement add task functionality
- [ ] Render task list from array
- [ ] Implement delete task functionality
- [ ] Basic task card styling

### Milestone 2: State Management (1 hour)
- [ ] Implement localStorage save function
- [ ] Implement localStorage load function
- [ ] Generate unique IDs for tasks (UUID)
- [ ] Handle page refresh persistence
- [ ] Implement timestamps (createdAt, updatedAt)

### Milestone 3: Filtering & Search (1.5 hours)
- [ ] Create category filter dropdown
- [ ] Implement status filter (All/Active/Completed)
- [ ] Add search input with real-time filtering
- [ ] Implement sort functionality
- [ ] Combine multiple filters correctly
- [ ] Update UI based on filters

### Milestone 4: Edit & Polish (1.5 hours)
- [ ] Implement edit task functionality
- [ ] Add confirmation dialog for delete
- [ ] Add task completion toggle
- [ ] Add loading states
- [ ] Implement error handling
- [ ] Add animations and transitions
- [ ] Make fully responsive
- [ ] Add empty states

## Technical Challenges

### Challenge 1: State Management
Managing task state and keeping localStorage in sync with UI.

**Key Pattern:**
```javascript
let tasks = [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(taskData) {
  tasks.push(taskData);
  saveTasks();
  renderTasks();
}
```

### Challenge 2: Multiple Filters
Applying category, status, and search filters simultaneously.

### Challenge 3: Event Delegation
Handling clicks on dynamically created task elements efficiently.

### Challenge 4: Edit Mode
Populating form with existing task data for editing.

## Getting Started

1. **Read** `requirements.md` for detailed specifications
2. **Review** `rubric.md` for evaluation criteria
3. **Check** `hints.md` for common solutions
4. **Start** with the starter files in `starter/`
5. **Test** frequently as you build
6. **Deploy** when complete

## Success Criteria

✅ All CRUD operations work correctly  
✅ Filters and search work together  
✅ Data persists across page refreshes  
✅ Form has validation  
✅ UI is responsive  
✅ No console errors  
✅ Clean, organized code

## Extension Ideas

After completing core requirements:
- Add due dates with calendar picker
- Implement drag-and-drop reordering
- Add tags system (multiple tags per task)
- Export tasks to CSV or JSON
- Add dark mode toggle
- Create task statistics dashboard
- Add keyboard shortcuts

## Deployment

Deploy your completed project:
- **GitHub Pages** - Simple static hosting
- **Netlify** - Automatic deployments
- **Vercel** - Fast and free

## Need Help?

- Review Volume 2 chapters on:
  - DOM Manipulation (Ch. 8)
  - Events (Ch. 9)
  - Arrays and Objects (Ch. 5, 6)
  - localStorage (Ch. 11)
- Check `hints.md` for solutions to common problems
- Look at the solution code if stuck (but try first!)

---

**This is your first JavaScript capstone!** Take your time, experiment, debug, and build something you're proud to add to your portfolio. 🚀
