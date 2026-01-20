import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..', '..');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'exercises-catalog.json');

const BOOK_INFO = {
  'Book-1': {
    id: 'book-1',
    title: 'Volume 1: The UI Architect',
    description: 'HTML, CSS & Web Fundamentals',
    icon: '📘',
    color: 'blue',
  },
  'Book-2': {
    id: 'book-2',
    title: 'Volume 2: The JavaScript Developer',
    description: 'Programming Logic & Interactivity',
    icon: '📗',
    color: 'orange',
  },
  'Book-3': {
    id: 'book-3',
    title: 'Volume 3: Modern Mastery',
    description: 'Frameworks, Testing & Performance',
    icon: '📕',
    color: 'purple',
  },
  'Book-4': {
    id: 'book-4',
    title: 'Volume 4: The Full-Stack Professional',
    description: 'Backend, DevOps, Cloud & Career',
    icon: '📙',
    color: 'green',
  },
};

function readFileIfExists(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    return null;
  }
}

function extractExerciseTitle(instructionsContent) {
  if (!instructionsContent) return 'Untitled Exercise';

  // Try to find the first # heading
  const match = instructionsContent.match(/^#\s+(.+)$/m);
  if (match) {
    return match[1].replace(/Exercise \d+:\s*/i, '').trim();
  }

  return 'Untitled Exercise';
}

function extractDifficulty(instructionsContent) {
  if (!instructionsContent) return 'medium';

  const lower = instructionsContent.toLowerCase();
  if (lower.includes('beginner') || lower.includes('easy')) return 'easy';
  if (lower.includes('advanced') || lower.includes('hard')) return 'hard';
  return 'medium';
}

function extractHints(instructionsContent, hintsFilePath) {
  const hints = [];

  // Check for separate hints file
  if (hintsFilePath && fs.existsSync(hintsFilePath)) {
    const hintsContent = fs.readFileSync(hintsFilePath, 'utf-8');
    const hintMatches = hintsContent.matchAll(/###?\s*Hint\s*\d*[:\s]*([\s\S]*?)(?=###?\s*Hint|$)/gi);
    for (const match of hintMatches) {
      const hint = match[1].trim();
      if (hint) hints.push(hint);
    }
  }

  // Extract from instructions if no separate file
  if (hints.length === 0 && instructionsContent) {
    const hintMatches = instructionsContent.matchAll(/###?\s*Hint\s*\d*[:\s]*([\s\S]*?)(?=###?\s*Hint|##\s|\n\n##|$)/gi);
    for (const match of hintMatches) {
      const hint = match[1].trim();
      if (hint && hint.length < 500) {
        hints.push(hint);
      }
    }
  }

  return hints.slice(0, 5); // Max 5 hints
}

function getFileType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const typeMap = {
    '.html': 'html',
    '.css': 'css',
    '.js': 'javascript',
    '.jsx': 'jsx',
    '.ts': 'typescript',
    '.tsx': 'tsx',
    '.vue': 'vue',
    '.json': 'json',
    '.md': 'markdown',
  };
  return typeMap[ext] || 'text';
}

function loadFilesFromDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return {};

  const files = {};
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isFile() && !item.startsWith('.')) {
      const content = readFileIfExists(itemPath);
      if (content !== null) {
        files[item] = {
          name: item,
          content: content,
          type: getFileType(item),
        };
      }
    }
  }

  return files;
}

function determineExerciseType(files) {
  const fileNames = Object.keys(files);

  if (fileNames.some(f => f.endsWith('.jsx') || f.endsWith('.tsx'))) return 'react';
  if (fileNames.some(f => f.endsWith('.vue'))) return 'vue';
  if (fileNames.some(f => f.endsWith('.html'))) return 'html';
  if (fileNames.some(f => f.endsWith('.css'))) return 'css';
  if (fileNames.some(f => f.endsWith('.js'))) return 'javascript';

  return 'javascript';
}

function processExercise(bookDir, chapterDir, exerciseDir) {
  const exercisePath = path.join(ROOT_DIR, bookDir, chapterDir, exerciseDir);
  const instructionsPath = path.join(exercisePath, 'instructions.md');
  const readmePath = path.join(exercisePath, 'README.md');
  const hintsPath = path.join(exercisePath, 'hints.md');
  const starterPath = path.join(exercisePath, 'starter');
  const solutionPath = path.join(exercisePath, 'solution');

  // Read instructions
  const instructions = readFileIfExists(instructionsPath) || readFileIfExists(readmePath);
  if (!instructions) return null;

  // Load starter and solution files
  const starterFiles = loadFilesFromDirectory(starterPath);
  const solutionFiles = loadFilesFromDirectory(solutionPath);

  // If no starter/solution directories, look for files in the exercise root
  const hasStarter = Object.keys(starterFiles).length > 0;
  const hasSolution = Object.keys(solutionFiles).length > 0;

  if (!hasStarter && !hasSolution) {
    // Check for direct files
    const directFiles = loadFilesFromDirectory(exercisePath);
    if (Object.keys(directFiles).length === 0) return null;
  }

  const title = extractExerciseTitle(instructions);
  const difficulty = extractDifficulty(instructions);
  const hints = extractHints(instructions, hintsPath);
  const exerciseType = determineExerciseType(hasStarter ? starterFiles : solutionFiles);

  return {
    id: exerciseDir,
    title: title,
    type: exerciseType,
    difficulty: difficulty,
    instructions: instructions,
    starterFiles: starterFiles,
    solutionFiles: solutionFiles,
    hints: hints,
    hasTests: fs.existsSync(path.join(solutionPath, '__tests__')) ||
              fs.existsSync(path.join(exercisePath, '__tests__')),
  };
}

function processChapter(bookDir, chapterDir) {
  const chapterPath = path.join(ROOT_DIR, bookDir, chapterDir);
  const readmePath = path.join(chapterPath, 'README.md');

  if (!fs.existsSync(chapterPath)) return null;

  const items = fs.readdirSync(chapterPath);
  const exercises = [];

  for (const item of items) {
    const itemPath = path.join(chapterPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory() && (item.startsWith('exercise-') || item.startsWith('challenge-'))) {
      const exercise = processExercise(bookDir, chapterDir, item);
      if (exercise) {
        exercises.push(exercise);
      }
    }
  }

  if (exercises.length === 0) return null;

  // Try to extract chapter title from README
  let chapterTitle = chapterDir;
  const readme = readFileIfExists(readmePath);
  if (readme) {
    const match = readme.match(/^#\s+(.+)$/m);
    if (match) {
      chapterTitle = match[1].replace(/Chapter \d+:\s*/i, '').trim();
    }
  }

  return {
    id: chapterDir,
    title: chapterTitle,
    exercises: exercises.sort((a, b) => a.id.localeCompare(b.id)),
  };
}

function processBook(bookDir) {
  const bookPath = path.join(ROOT_DIR, bookDir);

  if (!fs.existsSync(bookPath)) return null;

  const bookInfo = BOOK_INFO[bookDir];
  if (!bookInfo) return null;

  const items = fs.readdirSync(bookPath);
  const chapters = [];

  for (const item of items) {
    const itemPath = path.join(bookPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory() && item.startsWith('chapter-')) {
      const chapter = processChapter(bookDir, item);
      if (chapter) {
        chapters.push(chapter);
      }
    }
  }

  if (chapters.length === 0) return null;

  return {
    ...bookInfo,
    chapters: chapters.sort((a, b) => a.id.localeCompare(b.id)),
  };
}

function generateCatalog() {
  console.log('🔍 Scanning repository for exercises...\n');

  const books = [];
  const bookDirs = ['Book-1', 'Book-2', 'Book-3', 'Book-4'];

  for (const bookDir of bookDirs) {
    console.log(`📚 Processing ${bookDir}...`);
    const book = processBook(bookDir);
    if (book) {
      const totalExercises = book.chapters.reduce((sum, ch) => sum + ch.exercises.length, 0);
      console.log(`   ✓ Found ${book.chapters.length} chapters, ${totalExercises} exercises`);
      books.push(book);
    }
  }

  const catalog = {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    books: books,
    stats: {
      totalBooks: books.length,
      totalChapters: books.reduce((sum, b) => sum + b.chapters.length, 0),
      totalExercises: books.reduce((sum, b) =>
        sum + b.chapters.reduce((s, ch) => s + ch.exercises.length, 0), 0
      ),
    },
  };

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write catalog
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(catalog, null, 2));

  console.log('\n✅ Catalog generated successfully!');
  console.log(`📊 Statistics:`);
  console.log(`   - Books: ${catalog.stats.totalBooks}`);
  console.log(`   - Chapters: ${catalog.stats.totalChapters}`);
  console.log(`   - Exercises: ${catalog.stats.totalExercises}`);
  console.log(`\n📝 Output: ${OUTPUT_FILE}`);
}

// Run the script
try {
  generateCatalog();
} catch (error) {
  console.error('❌ Error generating catalog:', error);
  process.exit(1);
}
