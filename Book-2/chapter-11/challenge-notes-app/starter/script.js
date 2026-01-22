// Progressive Notes App - STARTER CODE
// Combine ALL Browser APIs you've learned!

// ========================================
// Storage Manager
// ========================================

class StorageManager {
  constructor(storageKey = 'notesApp') {
    this.storageKey = storageKey;
  }
  
  saveNotes(notes) {
    // TODO: Save notes array to localStorage
    // Convert Map to array if needed
  }
  
  loadNotes() {
    // TODO: Load notes from localStorage
    // Return array, or empty array if none found
  }
  
  exportJSON() {
    // TODO: Create downloadable JSON file
    // Hint: Use Blob and createObjectURL
  }
  
  importJSON(file) {
    // TODO: Read file and parse JSON
    // Return Promise with notes array
  }
}

// ========================================
// Notes Manager
// ========================================

class NotesManager {
  constructor() {
    this.notes = new Map(); // id -> note object
    this.storage = new StorageManager();
    this.currentNoteId = null;
  }
  
  loadNotes() {
    // TODO: Load notes from storage
    // Convert array to Map
  }
  
  createNote(title = 'Untitled', content = '') {
    // TODO: Create note object with:
    // - id (use Date.now())
    // - title, content
    // - created, updated timestamps
    
    // TODO: Add to Map
    // TODO: Save to localStorage
    // TODO: Return note
  }
  
  updateNote(id, updates) {
    // TODO: Get note from Map
    // TODO: Update properties
    // TODO: Update 'updated' timestamp
    // TODO: Save to localStorage
  }
  
  deleteNote(id) {
    // TODO: Delete from Map
    // TODO: Save to localStorage
  }
  
  getNoteById(id) {
    // TODO: Return note from Map
  }
  
  searchNotes(query) {
    // TODO: Filter notes by search query
    // Search in title and content
    // Return array of matching notes
  }
  
  getAllNotes() {
    // TODO: Convert Map to sorted array
    // Sort by updated date (newest first)
  }
}

// ========================================
// UI Manager
// ========================================

const notesManager = new NotesManager();

function renderNotesList() {
  // TODO: Get all notes
  // TODO: Render each note in sidebar
  // TODO: Use Intersection Observer for lazy loading (bonus)
}

function renderNoteItem(note) {
  // TODO: Create HTML for single note item
  // Include: title, preview, date
  return `
    <div class="note-item" data-id="${note.id}">
      <!-- TODO: Complete this -->
    </div>
  `;
}

function openNoteEditor(noteId) {
  // TODO: Get note
  // TODO: Show editor content div
  // TODO: Populate title and content
  // TODO: Update History API
}

function closeNoteEditor() {
  // TODO: Hide editor content
  // TODO: Show empty state
}

function saveCurrentNote() {
  // TODO: Get values from title input and content editor
  // TODO: Update note in notesManager
  // TODO: Re-render notes list
}

function deleteCurrentNote() {
  // TODO: Confirm deletion
  // TODO: Delete from notesManager
  // TODO: Close editor
  // TODO: Re-render list
}

// ========================================
// Event Listeners
// ========================================

function setupEventListeners() {
  // New note button
  document.getElementById('new-note-btn').addEventListener('click', () => {
    // TODO: Create new note
    // TODO: Open in editor
  });
  
  // Notes list - event delegation
  document.getElementById('notes-list').addEventListener('click', (e) => {
    // TODO: Find clicked note item
    // TODO: Open in editor
  });
  
  // Search input
  document.getElementById('search-input').addEventListener('input', (e) => {
    // TODO: Search notes and re-render
  });
  
  // Title input - auto-save with debounce
  let titleTimeout;
  document.getElementById('note-title').addEventListener('input', () => {
    clearTimeout(titleTimeout);
    titleTimeout = setTimeout(saveCurrentNote, 500);
  });
  
  // Content editor - auto-save with debounce
  let contentTimeout;
  document.getElementById('note-editor').addEventListener('input', () => {
    clearTimeout(contentTimeout);
    contentTimeout = setTimeout(saveCurrentNote, 1000);
  });
  
  // Delete button
  document.getElementById('delete-note-btn').addEventListener('click', deleteCurrentNote);
  
  // Export/Import
  document.getElementById('export-btn').addEventListener('click', () => {
    // TODO: Export notes
  });
  
  document.getElementById('import-btn').addEventListener('click', () => {
    document.getElementById('import-file').click();
  });
  
  document.getElementById('import-file').addEventListener('change', (e) => {
    // TODO: Import notes from file
  });
}

// ========================================
// History API Integration
// ========================================

function setupRouter() {
  // TODO: Listen to popstate event
  window.addEventListener('popstate', (event) => {
    // TODO: Get noteId from state
    // TODO: Open that note
  });
}

// ========================================
// Intersection Observer (Bonus)
// ========================================

function setupIntersectionObserver() {
  // TODO: Create observer for lazy loading notes
  // Only render notes when they scroll into view
}

// ========================================
// Notification API (Bonus)
// ========================================

function setupNotifications() {
  // TODO: Request permission
  // TODO: Send notification when note is saved
}

// ========================================
// Initialize App
// ========================================

function init() {
  console.log('📝 Progressive Notes App initializing...');
  
  // Load notes from localStorage
  notesManager.loadNotes();
  
  // Render initial notes list
  renderNotesList();
  
  // Setup event listeners
  setupEventListeners();
  
  // Setup router
  setupRouter();
  
  // Optional: Setup Intersection Observer
  // setupIntersectionObserver();
  
  // Optional: Setup Notifications
  // setupNotifications();
  
  console.log('✅ App ready!');
}

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
