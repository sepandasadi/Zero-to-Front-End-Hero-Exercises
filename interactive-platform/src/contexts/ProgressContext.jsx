import { createContext, useContext, useReducer, useEffect } from 'react';

const ProgressContext = createContext();

const STORAGE_KEY = 'zero-to-hero-progress';

// Initial state
const initialState = {
  progress: {},
  stats: {
    totalExercises: 0,
    completed: 0,
    inProgress: 0,
  },
};

// Load state from localStorage
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }
  return initialState;
}

// Save state to localStorage
function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
}

// Reducer
function progressReducer(state, action) {
  let newState = state;

  switch (action.type) {
    case 'UPDATE_EXERCISE': {
      const { bookId, chapterId, exerciseId, data } = action.payload;
      newState = {
        ...state,
        progress: {
          ...state.progress,
          [bookId]: {
            ...state.progress[bookId],
            [chapterId]: {
              ...state.progress[bookId]?.[chapterId],
              [exerciseId]: {
                ...state.progress[bookId]?.[chapterId]?.[exerciseId],
                ...data,
                lastModified: new Date().toISOString(),
              },
            },
          },
        },
      };
      break;
    }

    case 'COMPLETE_EXERCISE': {
      const { bookId, chapterId, exerciseId } = action.payload;
      newState = {
        ...state,
        progress: {
          ...state.progress,
          [bookId]: {
            ...state.progress[bookId],
            [chapterId]: {
              ...state.progress[bookId]?.[chapterId],
              [exerciseId]: {
                ...state.progress[bookId]?.[chapterId]?.[exerciseId],
                status: 'completed',
                completedAt: new Date().toISOString(),
              },
            },
          },
        },
      };
      break;
    }

    case 'START_EXERCISE': {
      const { bookId, chapterId, exerciseId } = action.payload;
      const existing = state.progress[bookId]?.[chapterId]?.[exerciseId];
      if (existing?.status === 'completed') {
        return state; // Don't change status if already completed
      }
      newState = {
        ...state,
        progress: {
          ...state.progress,
          [bookId]: {
            ...state.progress[bookId],
            [chapterId]: {
              ...state.progress[bookId]?.[chapterId],
              [exerciseId]: {
                ...existing,
                status: 'in_progress',
                startedAt: existing?.startedAt || new Date().toISOString(),
              },
            },
          },
        },
      };
      break;
    }

    case 'SAVE_CODE': {
      const { bookId, chapterId, exerciseId, code } = action.payload;
      newState = {
        ...state,
        progress: {
          ...state.progress,
          [bookId]: {
            ...state.progress[bookId],
            [chapterId]: {
              ...state.progress[bookId]?.[chapterId],
              [exerciseId]: {
                ...state.progress[bookId]?.[chapterId]?.[exerciseId],
                code: code,
                lastModified: new Date().toISOString(),
              },
            },
          },
        },
      };
      break;
    }

    case 'INCREMENT_ATTEMPTS': {
      const { bookId, chapterId, exerciseId } = action.payload;
      const current = state.progress[bookId]?.[chapterId]?.[exerciseId];
      newState = {
        ...state,
        progress: {
          ...state.progress,
          [bookId]: {
            ...state.progress[bookId],
            [chapterId]: {
              ...state.progress[bookId]?.[chapterId],
              [exerciseId]: {
                ...current,
                attempts: (current?.attempts || 0) + 1,
              },
            },
          },
        },
      };
      break;
    }

    case 'USE_HINT': {
      const { bookId, chapterId, exerciseId } = action.payload;
      const current = state.progress[bookId]?.[chapterId]?.[exerciseId];
      newState = {
        ...state,
        progress: {
          ...state.progress,
          [bookId]: {
            ...state.progress[bookId],
            [chapterId]: {
              ...state.progress[bookId]?.[chapterId],
              [exerciseId]: {
                ...current,
                hintsUsed: (current?.hintsUsed || 0) + 1,
              },
            },
          },
        },
      };
      break;
    }

    case 'RESET_PROGRESS': {
      newState = initialState;
      break;
    }

    case 'UPDATE_STATS': {
      newState = {
        ...state,
        stats: action.payload,
      };
      break;
    }

    default:
      return state;
  }

  // Calculate stats
  newState = calculateStats(newState);

  return newState;
}

// Calculate statistics
function calculateStats(state) {
  let completed = 0;
  let inProgress = 0;
  let total = 0;

  Object.values(state.progress).forEach(book => {
    Object.values(book).forEach(chapter => {
      Object.values(chapter).forEach(exercise => {
        total++;
        if (exercise.status === 'completed') completed++;
        else if (exercise.status === 'in_progress') inProgress++;
      });
    });
  });

  return {
    ...state,
    stats: {
      ...state.stats,
      completed,
      inProgress,
      notStarted: state.stats.totalExercises - completed - inProgress,
    },
  };
}

export function ProgressProvider({ children, totalExercises = 0 }) {
  const [state, dispatch] = useReducer(progressReducer, initialState, loadState);

  // Update total exercises when catalog loads
  useEffect(() => {
    if (totalExercises > 0 && state.stats.totalExercises !== totalExercises) {
      dispatch({
        type: 'UPDATE_STATS',
        payload: { ...state.stats, totalExercises },
      });
    }
  }, [totalExercises, state.stats]);

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <ProgressContext.Provider value={{ state, dispatch }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
}

// Helper hooks
export function useExerciseProgress(bookId, chapterId, exerciseId) {
  const { state } = useProgress();
  return state.progress[bookId]?.[chapterId]?.[exerciseId] || { status: 'not_started' };
}

export function useChapterProgress(bookId, chapterId, exerciseCount) {
  const { state } = useProgress();
  const chapter = state.progress[bookId]?.[chapterId] || {};
  const exercises = Object.values(chapter);

  const completed = exercises.filter(e => e.status === 'completed').length;
  const percentage = exerciseCount > 0 ? (completed / exerciseCount) * 100 : 0;

  return { completed, total: exerciseCount, percentage };
}

export function useBookProgress(bookId, totalExercises) {
  const { state } = useProgress();
  const book = state.progress[bookId] || {};

  let completed = 0;
  Object.values(book).forEach(chapter => {
    Object.values(chapter).forEach(exercise => {
      if (exercise.status === 'completed') completed++;
    });
  });

  const percentage = totalExercises > 0 ? (completed / totalExercises) * 100 : 0;

  return { completed, total: totalExercises, percentage };
}
