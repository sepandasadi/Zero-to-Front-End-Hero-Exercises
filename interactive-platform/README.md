# Zero to Front-End Hero - Interactive Learning Platform

An interactive coding platform for working through all 299+ exercises from the Zero to Front-End Hero book series. Features a live code editor, automated testing, progress tracking, and more!

## Features

- **📚 Complete Catalog**: All 4 books, 51 chapters, 299 exercises automatically loaded
- **✨ Live Code Editor**: Monaco Editor (VS Code) with syntax highlighting and multi-file support
- **🧪 Automated Testing**: Built-in test runner for JavaScript exercises
- **👁️ Live Preview**: Real-time HTML/CSS preview in an isolated iframe
- **💡 Progressive Hints**: Unlock hints one at a time as you work through exercises
- **📊 Progress Tracking**: Automatically saves your progress to localStorage
- **🎨 Beautiful UI**: Professional design with Tailwind CSS and shadcn/ui components
- **🌗 Dark/Light Theme**: Toggle between themes with keyboard shortcut
- **⌨️ Keyboard Shortcuts**: Navigate quickly with hotkeys
- **📱 Responsive**: Works on desktop and tablet screens

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate the exercise catalog:**
   ```bash
   npm run generate-catalog
   ```
   This scans all exercise directories and creates `src/data/exercises-catalog.json`

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173`

## Usage

### Navigation

- **Sidebar**: Browse through all books, chapters, and exercises
- **Progress Indicators**: See your completion status at a glance
- **Circular Progress**: Visual representation of book completion

### Working on Exercises

1. **Select an exercise** from the sidebar
2. **Read instructions** in the left panel
3. **Write code** in the Monaco editor (center panel)
4. **Run tests** or view live preview (right panel)
5. **Use hints** if you get stuck
6. **Move to next exercise** when complete

### Code Editor

- **Multi-file support**: Edit HTML, CSS, and JavaScript files with tabs
- **Auto-save**: Code is automatically saved to localStorage
- **Syntax highlighting**: Full language support
- **Themes**: Dark and light themes available

### Testing

- **JavaScript exercises**: Click "Run Tests" to validate your solution
- **HTML/CSS exercises**: Live preview updates as you type
- **Instant feedback**: See which tests pass or fail
- **Error messages**: Detailed error information to help debug

### Hints

- **Progressive unlocking**: Unlock hints one at a time
- **Tracked usage**: Hint usage is tracked in your progress
- **Markdown formatted**: Rich text hints with code examples

### Progress

- **Auto-saved**: Progress is saved automatically to localStorage
- **Statistics**: Track completed, in-progress, and not-started exercises
- **Per-exercise data**: Saves your code, attempts, hints used, and completion status
- **Export/Import**: (Coming soon) Download and share your progress

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/⌘ + B` | Toggle sidebar |
| `Ctrl/⌘ + Shift + T` | Toggle theme |
| `Ctrl/⌘ + Enter` | Run tests (coming soon) |
| `Ctrl/⌘ + S` | Save code (auto-saves already) |

## Project Structure

```
interactive-platform/
├── src/
│   ├── components/
│   │   ├── Navigation/     # Sidebar, BookCard, ChapterItem, ExerciseItem
│   │   ├── Exercise/       # CodeEditor, InstructionsPanel, TestPanel, etc.
│   │   ├── UI/            # Reusable UI components (Button, Badge, Progress)
│   │   └── Layout/        # AppLayout
│   ├── contexts/
│   │   ├── ProgressContext.jsx  # Progress tracking state
│   │   └── ExerciseContext.jsx  # Current exercise state
│   ├── lib/
│   │   ├── test-runner.js       # Test execution engine
│   │   └── utils.js             # Utility functions
│   ├── data/
│   │   └── exercises-catalog.json  # Auto-generated exercise catalog
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── scripts/
│   └── generate-catalog.js   # Scans repo and generates catalog
├── public/
└── package.json
```

## Technology Stack

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Monaco Editor**: VS Code's editor component
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **React Markdown**: Markdown rendering
- **Vitest**: Testing framework

## Development

### Generate Catalog

After adding new exercises to the parent directories:

```bash
npm run generate-catalog
```

This will scan all `Book-*/chapter-*/exercise-*` directories and update the catalog.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Features in Detail

### Exercise Catalog

The catalog is automatically generated from your exercise repository structure:

- **Scans** all Book-1, Book-2, Book-3, Book-4 directories
- **Extracts** metadata from instructions.md and README.md files
- **Loads** starter and solution files
- **Parses** hints from instructions or separate hints.md files
- **Detects** exercise type (html, css, javascript, react, vue)
- **Tracks** difficulty level and test availability

### Progress Tracking

Your progress is stored in localStorage with the following data:

```javascript
{
  "book-1": {
    "chapter-04": {
      "exercise-01": {
        "status": "completed",
        "code": { "script.js": "..." },
        "completedAt": "2024-01-15T10:30:00Z",
        "attempts": 3,
        "hintsUsed": 1,
        "lastModified": "2024-01-15T10:30:00Z"
      }
    }
  }
}
```

### Test Runner

The built-in test runner supports:

- **Basic assertions**: `toBe`, `toEqual`, `toBeTruthy`, `toBeFalsy`
- **Collections**: `toContain`
- **Comparisons**: `toBeGreaterThan`, `toBeLessThan`
- **Exceptions**: `toThrow`
- **Async tests**: Full async/await support
- **Error reporting**: Detailed error messages and stack traces

### Live Preview

For HTML/CSS exercises:

- **Isolated iframe**: Runs in a sandboxed environment
- **Auto-updates**: Preview refreshes as you type (debounced)
- **CSS injection**: Automatically combines HTML and CSS files
- **JavaScript execution**: Runs JS code with proper scoping
- **Open in new tab**: View full-screen preview

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Contributing

To add features or fix bugs:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - See LICENSE file for details

## Acknowledgments

- Built for the Zero to Front-End Hero book series
- Uses Monaco Editor from Microsoft
- UI components inspired by shadcn/ui
- Icons from Lucide

---

**Happy Learning! 🚀**

Start your journey from zero to hero with this interactive platform!
