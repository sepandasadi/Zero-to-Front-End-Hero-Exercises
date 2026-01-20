import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useChapterProgress } from '../../contexts/ProgressContext';
import { ExerciseItem } from './ExerciseItem';
import { Progress } from '../UI/Progress';

export function ChapterItem({
  chapter,
  bookId,
  currentExerciseId,
  onExerciseSelect,
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const progress = useChapterProgress(bookId, chapter.id, chapter.exercises.length);

  // Sort exercises by difficulty: Easy → Medium → Hard
  const difficultyOrder = {
    'easy': 1,
    'medium': 2,
    'hard': 3,
    'E': 1,
    'M': 2,
    'H': 3
  };
  const sortedExercises = [...chapter.exercises].sort((a, b) => {
    const diffA = difficultyOrder[a.difficulty?.toLowerCase()] || difficultyOrder[a.difficulty] || 999;
    const diffB = difficultyOrder[b.difficulty?.toLowerCase()] || difficultyOrder[b.difficulty] || 999;
    return diffA - diffB;
  });

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-accent/50 transition-colors rounded-md group"
        title={isExpanded ? "Click to collapse chapter" : "Click to expand chapter"}
      >
        <div className="flex-shrink-0 p-0.5 rounded group-hover:bg-primary/10 transition-colors">
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-primary" />
          ) : (
            <ChevronRight className="h-5 w-5 text-primary" />
          )}
        </div>
        <span className="flex-1 text-left truncate">{chapter.title}</span>
        <span className="text-xs text-muted-foreground font-semibold">
          {progress.completed}/{progress.total}
        </span>
      </button>

      {isExpanded && (
        <div className="mt-1 space-y-1">
          <div className="px-3 mb-2">
            <Progress value={progress.percentage} className="h-1" />
          </div>
          <div className="space-y-1 pl-2">
            {sortedExercises.map(exercise => (
              <ExerciseItem
                key={exercise.id}
                exercise={exercise}
                bookId={bookId}
                chapterId={chapter.id}
                isActive={exercise.id === currentExerciseId}
                onClick={() => onExerciseSelect(bookId, chapter.id, exercise.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
