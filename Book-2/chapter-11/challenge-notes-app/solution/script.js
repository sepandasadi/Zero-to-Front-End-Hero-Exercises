// Progressive Notes App - SOLUTION
// Comprehensive implementation combining multiple Browser APIs

// ========================================
// Storage Manager
// ========================================

class StorageManager {
  constructor(storageKey = 'notesApp') {
    this.storageKey = storageKey;
  }
  
  saveNotes(notes) {
    try {
      // Convert Map to array of entries
      const notesArray = notes instanceof Map 
        ? Array.from(notes.values())
        : notes;
      
      localStorage.setItem(this.storageKey, JSON.stringify(notesArray));
      console.log(`Saved ${notesArray.length} notes`);
    } catch (error) {
      console.error('Error saving notes:', error);
      if (error.name === 'QuotaExceededError') {
        alert('Storage quota exceeded! Please delete some notes.');
      }
    }
  }
  
  loadNotes() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading notes:', error);
      return [];
    }
  }
  
  exportJSON() {
    const notes = this.loadNotes();
    const dataStr = JSON.stringify(notes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes-backup-${Date.now()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    console.log('Notes exported');
  }
  
  async importJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const notes = JSON.parse(e.target.result);
          resolve(notes);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }
}

// ========================================
// Notes Manager
// ========================================

class NotesManager {
  constructor() {
    this.notes = new Map();
    this.storage = new StorageManager();
    this.currentNoteId = null;
  }
  
  loadNotes() {
    const notesArray = this.storage.loadNotes();
    notesArray.forEach(note => {
      this.notes.set(note.id, note);
    });
    console.log(`Loaded ${this.notes.size} notes`);
  }
  
  createNote(title = 'Untitled', content = '') {
    const note = {
      id: Date.now(),
      title: title || 'Untitled',
      content: content,
      created: Date.now(),
      updated: Date.now(),
      tags: []
    };
    
    this.notes.set(note.id, note);
    this.storage.saveNotes(this.notes);
    console.log('Created note:', note.id);
    
    return note;
  }
  
  updateNote(id, updates) {
    const note = this.notes.get(id);
    if (!note) return;
    
    Object.assign(note, updates, { updated: Date.now() });
    this.storage.saveNotes(this.notes);
  }
  
  deleteNote(id) {
    this.notes.delete(id);
    this.storage.saveNotes(this.notes);
    console.log('Deleted note:', id);
  }
  
  getNoteById(id) {
    return this.notes.get(id);
  }
  
  searchNotes(query) {
    if (!query) return this.getAllNotes();
    
    const lowerQuery = query.toLowerCase();
    return this.getAllNotes().filter(note => 
      note.title.toLowerCase().includes(lowerQuery) ||
      note.content.toLowerCase().includes(lowerQuery)
    );
  }
  
  getAllNotes() {
    return Array.from(this.notes.values())
      .sort((a, b) => b.updated - a.updated);
  }
}

// ========================================
// UI Manager
// ========================================

const notesManager = new NotesManager();

function renderNotesList(notes = null) {
  const container = document.getElementById('notes-list');
  const notesToRender = notes || notesManager.getAllNotes();
  
  if (notesToRender.length === 0) {
    container.innerHTML = '<p style="padding:20px;text-align:center;color:#999;">No notes yet</p>';
    return;
  }
  
  const html = notesToRender.map(note => {
    const preview = note.content.replace(/<[^>]*>/g, '').substring(0, 60);
    const date = new Date(note.updated).toLocaleDateString();
    const isActive = note.id === notesManager.currentNoteId;
    
    return `
      <div class="note-item ${isActive ? 'active' : ''}" data-id="${note.id}">
        <div class="note-item-title">${note.title || 'Untitled'}</div>
        <div class="note-item-preview">${preview}...</div>
        <div class="note-item-date">${date}</div>
      </div>
    `;
  }).join('');
  
  container.innerHTML = html;
}

function openNoteEditor(noteId) {
  const note = notesManager.getNoteById(noteId);
  if (!note) return;
  
  notesManager.currentNoteId = noteId;
  
  // Show editor, hide empty state
  document.getElementById('editor-empty').style.display = 'none';
  document.getElementById('editor-content').style.display = 'flex';
  
  // Populate editor
  document.getElementById('note-title').value = note.title;
  document.getElementById('note-editor').innerHTML = note.content;
  
  // Update meta
  const created = new Date(note.created).toLocaleString();
  const updated = new Date(note.updated).toLocaleString();
  document.getElementById('note-meta').textContent = 
    `Created: ${created} • Updated: ${updated}`;
  
  // Update History API
  history.pushState({ noteId }, note.title, `/note/${noteId}`);
  
  // Update active state in list
  renderNotesList();
}

function closeNoteEditor() {
  notesManager.currentNoteId = null;
  document.getElementById('editor-content').style.display = 'none';
  document.getElementById('editor-empty').style.display = 'flex';
  history.pushState({}, 'Notes', '/');
  renderNotesList();
}

function saveCurrentNote() {
  if (!notesManager.currentNoteId) return;
  
  const title = document.getElementById('note-title').value;
  const content = document.getElementById('note-editor').innerHTML;
  
  notesManager.updateNote(notesManager.currentNoteId, { title, content });
  renderNotesList();
  
  // Update meta
  const note = notesManager.getNoteById(notesManager.currentNoteId);
  const updated = new Date(note.updated).toLocaleString();
  document.getElementById('note-meta').textContent = 
    `Created: ${new Date(note.created).toLocaleString()} • Updated: ${updated}`;
  
  console.log('Note auto-saved');
}

function deleteCurrentNote() {
  if (!notesManager.currentNoteId) return;
  
  if (confirm('Delete this note?')) {
    notesManager.deleteNote(notesManager.currentNoteId);
    closeNoteEditor();
    sendNotification('Note deleted', { body: 'Note moved to trash' });
  }
}

// ========================================
// Event Listeners
// ========================================

function setupEventListeners() {
  // New note
  document.getElementById('new-note-btn').addEventListener('click', () => {
    const note = notesManager.createNote();
    openNoteEditor(note.id);
    sendNotification('New note created', { body: 'Start writing!' });
  });
  
  // Notes list click
  document.getElementById('notes-list').addEventListener('click', (e) => {
    const noteItem = e.target.closest('.note-item');
    if (noteItem) {
      const noteId = parseInt(noteItem.dataset.id);
      openNoteEditor(noteId);
    }
  });
  
  // Search
  document.getElementById('search-input').addEventListener('input', (e) => {
    const results = notesManager.searchNotes(e.target.value);
    renderNotesList(results);
  });
  
  // Auto-save title
  let titleTimeout;
  document.getElementById('note-title').addEventListener('input', () => {
    clearTimeout(titleTimeout);
    titleTimeout = setTimeout(saveCurrentNote, 500);
  });
  
  // Auto-save content
  let contentTimeout;
  document.getElementById('note-editor').addEventListener('input', () => {
    clearTimeout(contentTimeout);
    contentTimeout = setTimeout(saveCurrentNote, 1000);
  });
  
  // Delete
  document.getElementById('delete-note-btn').addEventListener('click', deleteCurrentNote);
  
  // Export
  document.getElementById('export-btn').addEventListener('click', () => {
    notesManager.storage.exportJSON();
  });
  
  // Import
  document.getElementById('import-btn').addEventListener('click', () => {
    document.getElementById('import-file').click();
  });
  
  document.getElementById('import-file').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const notes = await notesManager.storage.importJSON(file);
      notes.forEach(note => {
        notesManager.notes.set(note.id, note);
      });
      notesManager.storage.saveNotes(notesManager.notes);
      renderNotesList();
      alert(`Imported ${notes.length} notes!`);
    } catch (error) {
      alert('Error importing notes: ' + error.message);
    }
  });
}

// ========================================
// History API
// ========================================

function setupRouter() {
  window.addEventListener('popstate', (event) => {
    if (event.state && event.state.noteId) {
      openNoteEditor(event.state.noteId);
    } else {
      closeNoteEditor();
    }
  });
}

// ========================================
// Notification API (Bonus)
// ========================================

function sendNotification(title, options = {}) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      icon: 'https://via.placeholder.com/128?text=📝',
      ...options
    });
  }
}

async function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    await Notification.requestPermission();
  }
}

// ========================================
// Intersection Observer (Bonus)
// ========================================

function setupIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  });
  
  // Observe note items as they're added
  const notes = document.querySelectorAll('.note-item');
  notes.forEach(note => observer.observe(note));
}

// ========================================
// Initialize
// ========================================

function init() {
  console.log('📝 Progressive Notes App initializing...');
  
  notesManager.loadNotes();
  renderNotesList();
  setupEventListeners();
  setupRouter();
  
  // Optional features
  requestNotificationPermission();
  
  // Handle direct URL navigation
  const path = window.location.pathname;
  const match = path.match(/^\/note\/(\d+)$/);
  if (match) {
    const noteId = parseInt(match[1]);
    openNoteEditor(noteId);
  }
  
  console.log('✅ Notes App ready!');
  console.log(`Loaded ${notesManager.notes.size} notes`);
}

document.addEventListener('DOMContentLoaded', init);

// ========================================
// Keyboard Shortcuts (Bonus)
// ========================================

document.addEventListener('keydown', (e) => {
  // Cmd/Ctrl + N = New note
  if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
    e.preventDefault();
    const note = notesManager.createNote();
    openNoteEditor(note.id);
  }
  
  // Cmd/Ctrl + S = Save (already auto-saving, but provide feedback)
  if ((e.metaKey || e.ctrlKey) && e.key === 's') {
    e.preventDefault();
    saveCurrentNote();
    console.log('✅ Saved!');
  }
  
  // Escape = Close editor
  if (e.key === 'Escape' && notesManager.currentNoteId) {
    closeNoteEditor();
  }
});

console.log('\n⌨️ Keyboard Shortcuts:');
console.log('- Cmd/Ctrl + N: New note');
console.log('- Cmd/Ctrl + S: Save note');
console.log('- Escape: Close editor');
