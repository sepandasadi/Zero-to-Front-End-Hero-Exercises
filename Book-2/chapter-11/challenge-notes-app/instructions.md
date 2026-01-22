# Challenge: Progressive Notes App

## 🎯 Objective

Build a production-quality notes application that combines ALL the Browser APIs you've learned. This is your chance to create a real, useful tool!

## 📚 Features to Implement

### Core Functionality (Required)

1. **Note Management**
   - Create, read, update, delete notes
   - Rich text editing with ContentEditable
   - Timestamp tracking
   - Character/word count

2. **localStorage Persistence**
   - Save all notes to localStorage
   - Auto-save on edit
   - Load notes on page load
   - Export/import notes as JSON

3. **Search & Filter**
   - Real-time search
   - Filter by tags
   - Sort by date/title

4. **UI Features**
   - Smooth animations
   - Drag and drop (reorder)
   - Keyboard shortcuts
   - Responsive design

### Browser API Integration (Required)

Must use at least 4 of these:

- ✅ **localStorage** - Note persistence
- ✅ **Intersection Observer** - Lazy load notes when scrolling
- ✅ **Notification API** - Reminders or save confirmations
- ✅ **History API** - Navigate between notes with URLs
- ⭐ **Geolocation** - Tag notes with location (bonus)

### Optional Enhancements

- Dark/light mode (like Preferences Manager exercise)
- Markdown support
- Note categories/folders
- Trash/archive system
- Undo/redo
- Offline detection

## 🏗️ Architecture

```
NotesApp
├── Note Model { id, title, content, created, updated, tags[] }
├── Storage Manager (localStorage wrapper)
├── Notes Manager (CRUD operations)
├── UI Manager (rendering, events)
└── Router (History API for note navigation)
```

## 📝 Required Files

Starter provides:
- `index.html` - App structure
- `styles.css` - Complete styling
- `script.js` - Skeleton with TODOs
- `Note.js` - Note class structure
- `StorageManager.js` - localStorage wrapper

## ✨ Required Functions

### StorageManager
```js
class StorageManager {
  saveNotes(notes)
  loadNotes()
  exportJSON()
  importJSON(json)
}
```

### NotesManager
```js
class NotesManager {
  createNote(title, content)
  updateNote(id, updates)
  deleteNote(id)
  getNoteById(id)
  searchNotes(query)
  getAllNotes()
}
```

### UI Functions
```js
renderNotesList(notes)
renderNoteEditor(note)
setupIntersectionObserver()  // Lazy load notes
setupNotifications()          // Reminders
setupRouter()                 // History API navigation
```

## ✅ Success Criteria

### Functionality (50 points)
- [ ] Create/edit/delete notes (15 pts)
- [ ] Notes persist in localStorage (10 pts)
- [ ] Search works correctly (10 pts)
- [ ] Export/import functionality (10 pts)
- [ ] Responsive and polished UI (5 pts)

### Browser APIs (30 points)
- [ ] localStorage used correctly (10 pts)
- [ ] Intersection Observer for lazy loading (10 pts)
- [ ] At least 2 more APIs integrated (10 pts)

### Code Quality (20 points)
- [ ] Clean, organized code (10 pts)
- [ ] Error handling (5 pts)
- [ ] Comments and documentation (5 pts)

## 💡 Hints

### Hint 1: Note Structure
```js
{
  id: Date.now(),
  title: 'My Note',
  content: 'Note content...',
  created: Date.now(),
  updated: Date.now(),
  tags: ['work', 'important']
}
```

### Hint 2: ContentEditable
```html
<div contenteditable="true" id="note-content"></div>
```

### Hint 3: Auto-save with Debounce
```js
let saveTimeout;
noteContent.addEventListener('input', () => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveNote();
  }, 1000);
});
```

### Hint 4: History API for Notes
```js
function openNote(noteId) {
  history.pushState({ noteId }, '', `/note/${noteId}`);
  renderNoteEditor(noteId);
}
```

## 🧪 Testing Checklist

- [ ] Create 10+ notes
- [ ] Edit and verify auto-save
- [ ] Search notes
- [ ] Delete notes
- [ ] Export notes to JSON
- [ ] Import JSON file
- [ ] Refresh browser (data persists)
- [ ] Test in multiple tabs
- [ ] Test on mobile device
- [ ] Try with 100+ notes (performance)

## ⏱️ Estimated Time

**3-4 hours**
- Core CRUD: 1 hour
- localStorage integration: 30 min
- Search/filter: 30 min
- Intersection Observer: 30 min
- Additional APIs: 30 min
- UI polish: 30 min

## 🎯 Bonus Features

1. **Markdown Support**: Parse markdown in notes
2. **Tags System**: Add/remove tags, filter by tag
3. **Trash**: Soft delete with restore
4. **Templates**: Pre-defined note templates
5. **Statistics**: Show note count, word count, etc.
6. **Sync**: Cloud sync with Firebase/Supabase
7. **PWA**: Make it installable
8. **Dark Mode**: Theme switcher
9. **Export Options**: PDF, Markdown, Text
10. **Collaboration**: Share notes via URL

## 📖 Resources

- All previous exercise solutions
- [ContentEditable](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable)
- [LocalStorage Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)

---

**Ready to build something real?** This is portfolio-worthy! 📝✨
