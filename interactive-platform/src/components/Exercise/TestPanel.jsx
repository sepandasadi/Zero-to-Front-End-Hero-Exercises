import { useState } from 'react';
import { Play, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../UI/Button';
import { Badge } from '../UI/Badge';
import { useExercise } from '../../contexts/ExerciseContext';
import { TestRunner } from '../../lib/test-runner';
import { cn } from '../../lib/utils';

function TestResultItem({ result }) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 p-3 rounded-lg border',
        result.passed
          ? 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900'
          : 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900'
      )}
    >
      {result.passed ? (
        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
      ) : (
        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">{result.name}</span>
          {result.duration > 0 && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {result.duration.toFixed(0)}ms
            </span>
          )}
        </div>
        {result.error && (
          <pre className="text-xs mt-2 p-2 bg-background/50 rounded overflow-x-auto whitespace-pre-wrap">
            {result.error}
          </pre>
        )}
      </div>
    </div>
  );
}

export function TestPanel() {
  const { code, currentExercise, incrementAttempts, completeExercise } = useExercise();
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    if (!currentExercise) return;

    setIsRunning(true);
    incrementAttempts();

    try {
      // Get the main JavaScript file
      const jsFiles = Object.keys(code).filter(f => f.endsWith('.js'));
      const mainFile = jsFiles.find(f => f.includes('script')) || jsFiles[0];

      if (!mainFile) {
        setTestResults({
          passed: false,
          results: [],
          error: 'No JavaScript file found to test',
        });
        setIsRunning(false);
        return;
      }

      const codeToTest = code[mainFile];

      // For now, we'll create simple validation
      // In a real implementation, you'd parse and run actual test files
      const runner = new TestRunner();

      // Simple test: check if code executes without errors
      const results = await runner.run(`
        describe('Code Execution', () => {
          it('should execute without errors', () => {
            ${codeToTest}
          });
        });
      `);

      setTestResults(results);

      // Mark as completed if all tests pass
      if (results.passed) {
        completeExercise();
      }
    } catch (error) {
      setTestResults({
        passed: false,
        results: [],
        error: error.message,
      });
    } finally {
      setIsRunning(false);
    }
  };

  if (!currentExercise) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select an exercise to run tests
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="text-sm font-medium">Test Runner</h3>
        <Button
          onClick={runTests}
          disabled={isRunning}
          size="sm"
          className="gap-2"
        >
          <Play className="h-4 w-4" />
          {isRunning ? 'Running...' : 'Run Tests'}
        </Button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4">
        {!testResults && (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <AlertCircle className="h-12 w-12 mb-3 opacity-50" />
            <p>Click "Run Tests" to validate your solution</p>
            <p className="text-sm mt-1">Make sure your code is complete before testing</p>
          </div>
        )}

        {testResults && (
          <div className="space-y-4">
            {/* Summary */}
            <div className={cn(
              'p-4 rounded-lg border',
              testResults.passed
                ? 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900'
                : 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900'
            )}>
              <div className="flex items-center gap-3 mb-2">
                {testResults.passed ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                )}
                <h4 className="text-lg font-semibold">
                  {testResults.passed ? 'All Tests Passed! 🎉' : 'Some Tests Failed'}
                </h4>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={testResults.passed ? 'success' : 'destructive'}>
                  {testResults.passed ? 'PASSED' : 'FAILED'}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {testResults.passed}/{testResults.total} tests passed
                </span>
              </div>

              {testResults.passed && (
                <p className="text-sm mt-3 text-green-700 dark:text-green-300">
                  Great job! You can now move on to the next exercise.
                </p>
              )}
            </div>

            {/* Test Results */}
            {testResults.results && testResults.results.length > 0 && (
              <div className="space-y-2">
                <h5 className="text-sm font-medium mb-2">Test Results</h5>
                {testResults.results.map((result, index) => (
                  <TestResultItem key={index} result={result} />
                ))}
              </div>
            )}

            {/* Error */}
            {testResults.error && (
              <div className="p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-medium text-red-900 dark:text-red-100 mb-2">
                      Execution Error
                    </h5>
                    <pre className="text-xs text-red-800 dark:text-red-200 whitespace-pre-wrap">
                      {testResults.error}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
