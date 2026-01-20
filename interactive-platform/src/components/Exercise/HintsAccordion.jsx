import { useState } from 'react';
import { ChevronDown, ChevronRight, Lightbulb, Lock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../../lib/utils';
import { useExercise } from '../../contexts/ExerciseContext';
import { Button } from '../UI/Button';

function HintItem({ hint, index, isUnlocked, onUnlock }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isUnlocked) {
    return (
      <div className="border border-border rounded-lg p-4 bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span className="text-sm font-medium">Hint {index + 1}</span>
          </div>
          <Button size="sm" variant="outline" onClick={onUnlock}>
            Unlock Hint
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'w-full flex items-center gap-2 p-4 text-left hover:bg-accent/50 transition-colors',
          isExpanded && 'bg-accent/30'
        )}
      >
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 flex-shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
        )}
        <Lightbulb className="h-4 w-4 flex-shrink-0 text-yellow-500" />
        <span className="text-sm font-medium">Hint {index + 1}</span>
      </button>

      {isExpanded && (
        <div className="p-4 pt-0 prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>{hint}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export function HintsAccordion() {
  const { currentExercise, unlockedHints, unlockHint } = useExercise();

  if (!currentExercise || !currentExercise.hints || currentExercise.hints.length === 0) {
    return (
      <div className="text-sm text-muted-foreground text-center py-8">
        No hints available for this exercise
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-yellow-500" />
        <h3 className="text-lg font-semibold">Hints</h3>
        <span className="text-xs text-muted-foreground">
          ({unlockedHints}/{currentExercise.hints.length} unlocked)
        </span>
      </div>

      {currentExercise.hints.map((hint, index) => (
        <HintItem
          key={index}
          hint={hint}
          index={index}
          isUnlocked={index < unlockedHints}
          onUnlock={unlockHint}
        />
      ))}

      {unlockedHints === currentExercise.hints.length && (
        <div className="text-sm text-muted-foreground text-center py-4 italic">
          All hints unlocked! You've got this! 💪
        </div>
      )}
    </div>
  );
}
