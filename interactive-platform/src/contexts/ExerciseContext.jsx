import { createContext, useContext, useState, useEffect } from 'react';
import { useProgress } from './ProgressContext';

const ExerciseContext = createContext();

export function ExerciseProvider({ children, catalog }) {
  const { state: progressState, dispatch: progressDispatch } = useProgress();
  const [currentExercise, setCurrentExercise] = useState(null);
  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [code, setCode] = useState({});
  const [activeFile, setActiveFile] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [unlockedHints, setUnlockedHints] = useState(0);

  // Load first exercise on mount
  useEffect(() => {
    if (catalog && !currentExercise) {
      const firstBook = catalog.books[0];
      const firstChapter = firstBook?.chapters[0];
      const firstExercise = firstChapter?.exercises[0];

      if (firstExercise) {
        selectExercise(firstBook.id, firstChapter.id, firstExercise.id);
      }
    }
  }, [catalog]);

  // Select an exercise
  const selectExercise = (bookId, chapterId, exerciseId) => {
    const book = catalog.books.find(b => b.id === bookId);
    const chapter = book?.chapters.find(c => c.id === chapterId);
    const exercise = chapter?.exercises.find(e => e.id === exerciseId);

    if (!exercise) return;

    setCurrentBook(book);
    setCurrentChapter(chapter);
    setCurrentExercise(exercise);
    setShowSolution(false);
    setUnlockedHints(0);

    // Load saved code or starter files
    const savedProgress = progressState.progress[bookId]?.[chapterId]?.[exerciseId];
    if (savedProgress?.code) {
      setCode(savedProgress.code);
    } else {
      // Load starter files
      const starterCode = {};
      Object.entries(exercise.starterFiles || {}).forEach(([filename, fileData]) => {
        starterCode[filename] = fileData.content;
      });
      setCode(starterCode);
    }

    // Set first file as active
    const files = Object.keys(exercise.starterFiles || {});
    setActiveFile(files[0] || null);

    // Mark as started
    progressDispatch({
      type: 'START_EXERCISE',
      payload: { bookId, chapterId, exerciseId },
    });
  };

  // Update code for a file
  const updateCode = (filename, newCode) => {
    const updatedCode = { ...code, [filename]: newCode };
    setCode(updatedCode);

    // Auto-save to progress
    if (currentBook && currentChapter && currentExercise) {
      progressDispatch({
        type: 'SAVE_CODE',
        payload: {
          bookId: currentBook.id,
          chapterId: currentChapter.id,
          exerciseId: currentExercise.id,
          code: updatedCode,
        },
      });
    }
  };

  // Reset to starter code
  const resetCode = () => {
    if (!currentExercise) return;

    const starterCode = {};
    Object.entries(currentExercise.starterFiles || {}).forEach(([filename, fileData]) => {
      starterCode[filename] = fileData.content;
    });
    setCode(starterCode);
    setShowSolution(false);
    setUnlockedHints(0);
  };

  // Show solution
  const revealSolution = () => {
    if (!currentExercise) return;

    const solutionCode = {};
    Object.entries(currentExercise.solutionFiles || {}).forEach(([filename, fileData]) => {
      solutionCode[filename] = fileData.content;
    });
    setCode(solutionCode);
    setShowSolution(true);
  };

  // Unlock next hint
  const unlockHint = () => {
    if (!currentExercise) return;
    if (unlockedHints >= currentExercise.hints.length) return;

    setUnlockedHints(prev => prev + 1);

    // Track hint usage
    if (currentBook && currentChapter && currentExercise) {
      progressDispatch({
        type: 'USE_HINT',
        payload: {
          bookId: currentBook.id,
          chapterId: currentChapter.id,
          exerciseId: currentExercise.id,
        },
      });
    }
  };

  // Mark exercise as completed
  const completeExercise = () => {
    if (!currentBook || !currentChapter || !currentExercise) return;

    progressDispatch({
      type: 'COMPLETE_EXERCISE',
      payload: {
        bookId: currentBook.id,
        chapterId: currentChapter.id,
        exerciseId: currentExercise.id,
      },
    });
  };

  // Increment test attempts
  const incrementAttempts = () => {
    if (!currentBook || !currentChapter || !currentExercise) return;

    progressDispatch({
      type: 'INCREMENT_ATTEMPTS',
      payload: {
        bookId: currentBook.id,
        chapterId: currentChapter.id,
        exerciseId: currentExercise.id,
      },
    });
  };

  // Navigate to next exercise
  const goToNextExercise = () => {
    if (!currentBook || !currentChapter || !currentExercise) return;

    const currentExerciseIndex = currentChapter.exercises.findIndex(
      e => e.id === currentExercise.id
    );

    // Try next exercise in same chapter
    if (currentExerciseIndex < currentChapter.exercises.length - 1) {
      const nextExercise = currentChapter.exercises[currentExerciseIndex + 1];
      selectExercise(currentBook.id, currentChapter.id, nextExercise.id);
      return;
    }

    // Try first exercise of next chapter
    const currentChapterIndex = currentBook.chapters.findIndex(
      c => c.id === currentChapter.id
    );

    if (currentChapterIndex < currentBook.chapters.length - 1) {
      const nextChapter = currentBook.chapters[currentChapterIndex + 1];
      const firstExercise = nextChapter.exercises[0];
      if (firstExercise) {
        selectExercise(currentBook.id, nextChapter.id, firstExercise.id);
        return;
      }
    }

    // Try first exercise of next book
    const currentBookIndex = catalog.books.findIndex(b => b.id === currentBook.id);
    if (currentBookIndex < catalog.books.length - 1) {
      const nextBook = catalog.books[currentBookIndex + 1];
      const firstChapter = nextBook.chapters[0];
      const firstExercise = firstChapter?.exercises[0];
      if (firstExercise) {
        selectExercise(nextBook.id, firstChapter.id, firstExercise.id);
      }
    }
  };

  const value = {
    currentBook,
    currentChapter,
    currentExercise,
    code,
    activeFile,
    showSolution,
    unlockedHints,
    setActiveFile,
    selectExercise,
    updateCode,
    resetCode,
    revealSolution,
    unlockHint,
    completeExercise,
    incrementAttempts,
    goToNextExercise,
  };

  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  );
}

export function useExercise() {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error('useExercise must be used within ExerciseProvider');
  }
  return context;
}
