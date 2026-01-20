import { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import { cn, bookColorClasses } from '../../lib/utils';
import { useBookProgress } from '../../contexts/ProgressContext';
import { ChapterItem } from './ChapterItem';
import { CircularProgress } from '../UI/Progress';

export function BookCard({ book, currentExerciseId, onExerciseSelect }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const totalExercises = book.chapters.reduce(
    (sum, ch) => sum + ch.exercises.length,
    0
  );

  const progress = useBookProgress(book.id, totalExercises);
  const colorClasses = bookColorClasses[book.color] || bookColorClasses.blue;

  return (
    <div className={cn('mb-4 border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow', colorClasses.border)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 hover:bg-accent/30 transition-colors relative group"
        title={isExpanded ? "Click to collapse book" : "Click to expand book"}
      >
        {/* Header with icon and title */}
        <div className="flex items-center gap-3 mb-3">
          <div className={cn('p-2.5 rounded-lg shadow-sm', colorClasses.bg)}>
            <BookOpen className={cn('h-7 w-7', colorClasses.icon)} />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-bold text-base">{book.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{book.description}</p>
          </div>
          <div className="flex-shrink-0 p-1.5 rounded-full group-hover:bg-primary/20 transition-colors">
            {isExpanded ? (
              <ChevronDown className="h-6 w-6 text-primary" />
            ) : (
              <ChevronRight className="h-6 w-6 text-primary" />
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between gap-3 mt-1">
          <div className="flex items-center gap-3 text-xs flex-wrap">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="font-semibold text-foreground">{book.chapters.length}</span>
              <span className="text-muted-foreground">chapters</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-muted-foreground/40"></div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="font-semibold text-foreground">{totalExercises}</span>
              <span className="text-muted-foreground">exercises</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right min-w-[60px]">
              <div className={cn('text-base font-bold leading-tight', colorClasses.text)}>
                {Math.round(progress.percentage)}%
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">
                {progress.completed}/{totalExercises} done
              </div>
            </div>
            <CircularProgress value={progress.percentage} size={50} strokeWidth={4} color={book.color} />
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 pt-0 space-y-2 bg-background/50">
          {book.chapters.map(chapter => (
            <ChapterItem
              key={chapter.id}
              chapter={chapter}
              bookId={book.id}
              currentExerciseId={currentExerciseId}
              onExerciseSelect={onExerciseSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
