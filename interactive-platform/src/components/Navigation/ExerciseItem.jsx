import { CheckCircle2, Circle, PlayCircle, FileText, Code2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useExerciseProgress, useProgress } from '../../contexts/ProgressContext';

const statusIcons = {
  completed: CheckCircle2,
  in_progress: PlayCircle,
  not_started: Circle,
};

const statusColors = {
  completed: 'text-green-500 hover:text-green-600',
  in_progress: 'text-blue-500 hover:text-blue-600',
  not_started: 'text-muted-foreground hover:text-foreground',
};

export function ExerciseItem({
  exercise,
  bookId,
  chapterId,
  isActive,
  onClick,
}) {
  const progress = useExerciseProgress(bookId, chapterId, exercise.id);
  const { dispatch } = useProgress();
  const status = progress.status || 'not_started';
  const Icon = statusIcons[status];

  // Check if this is an instruction-only exercise
  const hasCodeFiles = Object.keys(exercise.starterFiles || {}).length > 0;
  const ExerciseTypeIcon = hasCodeFiles ? Code2 : FileText;

  // Handle status icon click to toggle completion
  const handleStatusClick = (e) => {
    e.stopPropagation(); // Prevent opening the exercise

    if (status === 'completed') {
      // If completed, mark as in_progress
      dispatch({
        type: 'START_EXERCISE',
        payload: { bookId, chapterId, exerciseId: exercise.id }
      });
    } else {
      // If not completed, mark as completed
      dispatch({
        type: 'COMPLETE_EXERCISE',
        payload: { bookId, chapterId, exerciseId: exercise.id }
      });
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={cn(
          'w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent/50 transition-colors text-left rounded-md',
          isActive && 'bg-accent text-accent-foreground'
        )}
      >
        <button
          onClick={handleStatusClick}
          className={cn(
            'flex-shrink-0 p-0.5 rounded-full hover:bg-accent transition-colors',
            statusColors[status]
          )}
          title={status === 'completed' ? 'Click to mark as incomplete' : 'Click to mark as complete'}
        >
          <Icon className="h-4 w-4" />
        </button>
        <ExerciseTypeIcon className={cn('h-3.5 w-3.5 flex-shrink-0 opacity-50', !hasCodeFiles && 'text-blue-500')} />
        <span className="flex-1 truncate">{exercise.title}</span>
        {exercise.difficulty && (
          <span
            className={cn(
              'text-xs px-1.5 py-0.5 rounded',
              exercise.difficulty === 'easy' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
              exercise.difficulty === 'medium' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
              exercise.difficulty === 'hard' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            )}
          >
            {exercise.difficulty[0].toUpperCase()}
          </span>
        )}
      </button>
    </div>
  );
}
