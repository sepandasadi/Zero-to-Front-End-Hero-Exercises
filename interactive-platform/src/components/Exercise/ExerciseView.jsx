import { useState } from 'react';
import {
  RotateCcw,
  Eye,
  Lightbulb,
  ChevronRight,
  FileText,
  Code2,
  Play,
  Settings,
} from 'lucide-react';
import { Allotment } from 'allotment';
import { useExercise } from '../../contexts/ExerciseContext';
import { Button } from '../UI/Button';
import { Badge } from '../UI/Badge';
import { CodeEditor } from './CodeEditor';
import { InstructionsPanel } from './InstructionsPanel';
import { PreviewPane } from './PreviewPane';
import { TestPanel } from './TestPanel';
import { HintsAccordion } from './HintsAccordion';

export function ExerciseView() {
  const {
    currentExercise,
    currentBook,
    currentChapter,
    showSolution,
    resetCode,
    revealSolution,
    goToNextExercise,
    code,
  } = useExercise();

  const [activeTab, setActiveTab] = useState('instructions');
  const [editorTheme, setEditorTheme] = useState('vs-dark');

  if (!currentExercise) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <Code2 className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No Exercise Selected</h3>
          <p className="text-sm">Select an exercise from the sidebar to begin</p>
        </div>
      </div>
    );
  }

  // Check if this is an instruction-only exercise (no code files)
  const hasCodeFiles = Object.keys(code).length > 0;
  const isInstructionOnly = !hasCodeFiles && Object.keys(currentExercise.starterFiles || {}).length === 0;

  const handleConfirmReset = () => {
    if (confirm('Are you sure you want to reset to the starter code? Your changes will be lost.')) {
      resetCode();
    }
  };

  const handleRevealSolution = () => {
    if (
      confirm(
        'Are you sure you want to see the solution? Try solving it yourself first!'
      )
    ) {
      revealSolution();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }} className="bg-background">
      {/* Header */}
      <div style={{ flexShrink: 0 }} className="flex items-center justify-between px-6 py-3 border-b border-border bg-card">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>{currentBook?.icon}</span>
            <span>{currentBook?.title}</span>
            <ChevronRight className="h-3 w-3" />
            <span>{currentChapter?.title}</span>
          </div>
          <h2 className="text-xl font-bold truncate">{currentExercise.title}</h2>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={currentExercise.difficulty === 'easy' ? 'success' : currentExercise.difficulty === 'hard' ? 'destructive' : 'secondary'}>
            {currentExercise.difficulty}
          </Badge>
          <Badge variant="outline">{currentExercise.type}</Badge>
        </div>
      </div>

      {/* Actions Bar */}
      <div style={{ flexShrink: 0 }} className="flex items-center justify-between px-6 py-2 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          {!isInstructionOnly && (
            <>
              <Button size="sm" variant="outline" onClick={handleConfirmReset}>
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRevealSolution}
                disabled={showSolution}
              >
                <Eye className="h-4 w-4" />
                {showSolution ? 'Showing Solution' : 'Show Solution'}
              </Button>
            </>
          )}
          <Button size="sm" variant="outline" onClick={goToNextExercise}>
            Next Exercise
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {!isInstructionOnly && (
            <select
              value={editorTheme}
              onChange={(e) => setEditorTheme(e.target.value)}
              className="text-sm border border-input rounded-md px-2 py-1 bg-background"
            >
              <option value="vs-dark">Dark Theme</option>
              <option value="light">Light Theme</option>
            </select>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {isInstructionOnly ? (
          /* Full-width instructions for non-coding exercises */
          <div className="h-full flex flex-col overflow-hidden">
            <div className="flex items-center px-6 py-3 border-b border-border bg-muted/30">
              <FileText className="h-5 w-5 mr-2 text-blue-500" />
              <span className="text-sm font-medium">Research/Writing Exercise</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                {/* Prominent notice for non-coding exercises */}
                <div className="mx-6 mt-6 mb-4 p-6 border-2 border-amber-500/50 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                        Research & Writing Exercise
                      </h3>
                      <p className="text-sm text-amber-800 dark:text-amber-200 mb-2">
                        This exercise requires research, analysis, or written responses that cannot be completed within the code editor.
                      </p>
                      <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                        📝 Complete this exercise using external tools (document editor, research materials, etc.)
                      </p>
                    </div>
                  </div>
                </div>
                <InstructionsPanel />
              </div>
            </div>
            {currentExercise.hints && currentExercise.hints.length > 0 && (
              <div className="border-t border-border">
                <div className="max-w-4xl mx-auto p-6">
                  <HintsAccordion />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Resizable 3-panel layout for coding exercises */
          <Allotment>
            <Allotment.Pane minSize={200} preferredSize="25%">
              <div className="h-full flex flex-col bg-card">
                {/* Tabs */}
                <div className="flex border-b border-border bg-muted/30">
                  <button
                    onClick={() => setActiveTab('instructions')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                      activeTab === 'instructions'
                        ? 'bg-background text-foreground border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    Instructions
                  </button>
                  <button
                    onClick={() => setActiveTab('hints')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                      activeTab === 'hints'
                        ? 'bg-background text-foreground border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Lightbulb className="h-4 w-4" />
                    Hints
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden">
                  {activeTab === 'instructions' && <InstructionsPanel />}
                  {activeTab === 'hints' && (
                    <div className="p-4 h-full overflow-y-auto">
                      <HintsAccordion />
                    </div>
                  )}
                </div>
              </div>
            </Allotment.Pane>

            <Allotment.Pane minSize={300} preferredSize="45%">
              <div className="h-full flex flex-col">
                <div className="flex items-center px-4 py-2 border-b border-border bg-muted/30">
                  <Code2 className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Code Editor</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <CodeEditor theme={editorTheme} />
                </div>
              </div>
            </Allotment.Pane>

            <Allotment.Pane minSize={200} preferredSize="30%">
              <div className="h-full flex flex-col bg-card">
                {currentExercise.type === 'html' || currentExercise.type === 'css' ? (
                  <PreviewPane />
                ) : (
                  <TestPanel />
                )}
              </div>
            </Allotment.Pane>
          </Allotment>
        )}
      </div>
    </div>
  );
}
