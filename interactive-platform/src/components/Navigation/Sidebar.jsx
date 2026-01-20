import { BookOpen, Award, TrendingUp } from 'lucide-react';
import { useProgress } from '../../contexts/ProgressContext';
import { useExercise } from '../../contexts/ExerciseContext';
import { BookCard } from './BookCard';
import { Progress } from '../UI/Progress';

export function Sidebar({ catalog, isOpen }) {
  const { state: progressState } = useProgress();
  const { currentExercise, selectExercise } = useExercise();

  const totalExercises = catalog.stats.totalExercises;
  const overallPercentage = totalExercises > 0
    ? (progressState.stats.completed / totalExercises) * 100
    : 0;

  return (
    <aside
      className={`
        w-80 h-screen bg-card border-r border-border overflow-y-auto flex flex-col
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Header */}
      <div className="p-4 border-b border-border bg-card sticky top-0 z-10">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Zero to Hero</h1>
        </div>

        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-semibold">{Math.round(overallPercentage)}%</span>
          </div>
          <Progress value={overallPercentage} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Award className="h-3 w-3" />
              <span>{progressState.stats.completed} completed</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>{progressState.stats.inProgress} in progress</span>
            </div>
          </div>
        </div>

        {/* Difficulty Legend */}
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground mb-2">Difficulty Levels:</p>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-semibold">
                E
              </span>
              <span className="text-muted-foreground">Easy</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 font-semibold">
                M
              </span>
              <span className="text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 font-semibold">
                H
              </span>
              <span className="text-muted-foreground">Hard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Books List */}
      <div className="flex-1 p-4">
        <div className="space-y-4">
          {catalog.books.map(book => (
            <BookCard
              key={book.id}
              book={book}
              currentExerciseId={currentExercise?.id}
              onExerciseSelect={selectExercise}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
