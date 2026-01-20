import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useExercise } from '../../contexts/ExerciseContext';

export function InstructionsPanel() {
  const { currentExercise, currentBook, currentChapter } = useExercise();

  if (!currentExercise) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select an exercise to view instructions
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-6 bg-background">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-4">
        <span>{currentBook?.title}</span>
        <span className="mx-2">›</span>
        <span>{currentChapter?.title}</span>
      </div>

      {/* Instructions */}
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {currentExercise.instructions}
        </ReactMarkdown>
      </div>
    </div>
  );
}
