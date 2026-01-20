import { useState } from 'react';
import { Play, CheckCircle2, XCircle, Clock, AlertCircle, ChevronDown, ChevronRight, Zap, AlertTriangle, Info, Lightbulb, ExternalLink } from 'lucide-react';
import { Button } from '../UI/Button';
import { Badge } from '../UI/Badge';
import { useExercise } from '../../contexts/ExerciseContext';
import { TestRunner } from '../../lib/test-runner';
import { CodeAnalyzer } from '../../lib/code-analyzer';
import { hintGenerator } from '../../lib/hint-generator';
import { cn } from '../../lib/utils';
import { CircularProgress } from '../UI/Progress';

function TestResultItem({ result, isExpanded, onToggle, showHints }) {
  const [hintLevel, setHintLevel] = useState(1);
  const hints = result.error ? hintGenerator.generateProgressiveHints(result, hintLevel) : [];
  const quickFix = result.error ? hintGenerator.getQuickFix(result) : null;

  return (
    <div
      className={cn(
        'rounded-lg border overflow-hidden transition-colors',
        result.passed
          ? 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900'
          : 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900'
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-3 p-3 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
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
        </div>

        {result.error && (
          <div className="flex-shrink-0">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        )}
      </button>

      {result.error && isExpanded && (
        <div className="px-3 pb-3 pt-0 space-y-3">
          {/* Error Details */}
          <div className="p-3 bg-background/50 rounded border border-border">
            <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-2">Error Details:</p>
            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
              {result.error}
            </pre>
          </div>

          {/* Quick Fix */}
          {quickFix && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-900">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">Quick Fix:</p>
              <p className="text-xs mb-2">{quickFix.issue}</p>
              <code className="text-xs bg-background/50 p-2 rounded block">
                {quickFix.fix}
              </code>
            </div>
          )}

          {/* Contextual Hints */}
          {showHints && hints.length > 0 && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded border border-yellow-200 dark:border-yellow-900">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-yellow-600" />
                <p className="text-xs font-semibold text-yellow-600 dark:text-yellow-400">
                  Hints (Level {hintLevel}/3):
                </p>
              </div>

              <div className="space-y-2">
                {hints.map((hint, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    {hint.type === 'documentation' ? (
                      <a
                        href={hint.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                      >
                        {hint.text}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <>
                        <span className="text-yellow-600 dark:text-yellow-400">•</span>
                        <p className="text-xs flex-1">{hint.text}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {hintLevel < 3 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setHintLevel(prev => Math.min(3, prev + 1));
                  }}
                  className="mt-2 text-xs text-yellow-600 dark:text-yellow-400 hover:underline"
                >
                  Show more detailed hints →
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CodeQualitySection({ codeReport }) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const grouped = codeReport.analyzer?.getGroupedIssues() || {};
  const categories = [
    { key: 'potential-bug', label: 'Potential Bugs', icon: XCircle, color: 'text-red-600' },
    { key: 'best-practice', label: 'Best Practices', icon: Zap, color: 'text-blue-600' },
    { key: 'complexity', label: 'Complexity', icon: AlertTriangle, color: 'text-yellow-600' },
    { key: 'style', label: 'Code Style', icon: Info, color: 'text-gray-600' },
  ];

  return (
    <div className="space-y-4">
      {/* Score Card */}
      <div className="p-4 border border-border rounded-lg bg-card">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Code Quality Score</h3>
            <p className="text-sm text-muted-foreground">
              {codeReport.summary.level} - {codeReport.summary.total} issues found
              {codeReport.summary.fixable > 0 && (
                <span className="ml-1 text-green-600 dark:text-green-400">
                  ({codeReport.summary.fixable} auto-fixable)
                </span>
              )}
            </p>
          </div>
          <CircularProgress value={codeReport.score} size={60} strokeWidth={4} />
        </div>
      </div>

      {/* Issue Categories */}
      {categories.map(category => {
        const issues = grouped[category.key] || [];
        if (issues.length === 0) return null;

        const isExpanded = expandedCategory === category.key;
        const Icon = category.icon;

        return (
          <div key={category.key} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedCategory(isExpanded ? null : category.key)}
              className="w-full flex items-center justify-between p-3 bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-2">
                <Icon className={cn('h-5 w-5', category.color)} />
                <span className="font-medium">{category.label}</span>
                <Badge variant="secondary">{issues.length}</Badge>
              </div>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {isExpanded && (
              <div className="p-3 space-y-2">
                {issues.map((issue, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-2 rounded hover:bg-muted/30 transition-colors"
                  >
                    {getSeverityIcon(issue.severity)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{issue.message}</p>
                      {issue.fixable && (
                        <span className="text-xs text-green-600 dark:text-green-400 mt-1 inline-block">
                          Auto-fixable
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {codeReport.summary.total === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-green-500" />
          <p className="font-medium">Excellent code quality!</p>
          <p className="text-sm">No issues detected</p>
        </div>
      )}
    </div>
  );
}

export function TestPanel() {
  const { code, currentExercise, incrementAttempts, completeExercise } = useExercise();
  const [testResults, setTestResults] = useState(null);
  const [codeQualityReport, setCodeQualityReport] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('tests');
  const [expandedTests, setExpandedTests] = useState({});
  const [showHints, setShowHints] = useState(true);

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

      // Run tests
      const runner = new TestRunner();
      const results = await runner.run(`
        describe('Code Execution', () => {
          it('should execute without errors', () => {
            ${codeToTest}
          });
        });
      `);

      setTestResults(results);

      // Run code quality analysis
      const analyzer = new CodeAnalyzer();
      const qualityReport = analyzer.analyze(codeToTest);
      qualityReport.analyzer = analyzer; // Keep reference for grouped issues
      setCodeQualityReport(qualityReport);

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

  const toggleTestExpansion = (index) => {
    setExpandedTests(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
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
      {/* Header with Tabs */}
      <div className="border-b border-border">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('tests')}
              className={cn(
                'text-sm font-medium px-3 py-1 rounded transition-colors',
                activeTab === 'tests'
                  ? 'bg-background text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Tests
            </button>
            <button
              onClick={() => setActiveTab('quality')}
              className={cn(
                'text-sm font-medium px-3 py-1 rounded transition-colors flex items-center gap-2',
                activeTab === 'quality'
                  ? 'bg-background text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Code Quality
              {codeQualityReport && (
                <span className={cn(
                  'text-xs font-bold',
                  codeQualityReport.score >= 85 ? 'text-green-600' :
                  codeQualityReport.score >= 70 ? 'text-blue-600' :
                  codeQualityReport.score >= 50 ? 'text-yellow-600' : 'text-red-600'
                )}>
                  {codeQualityReport.score}%
                </span>
              )}
            </button>
          </div>
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
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'tests' ? (
          <div>
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
                  <div className="flex items-center gap-3 mb-3">
                    {testResults.passed ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                    )}
                    <h4 className="text-lg font-semibold">
                      {testResults.passed ? 'All Tests Passed!' : 'Some Tests Failed'}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant={testResults.passed ? 'success' : 'destructive'}>
                      {testResults.passed ? 'PASSED' : 'FAILED'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {testResults.passed}/{testResults.total} tests passed
                    </span>
                  </div>

                  {testResults.passed && (
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Great job! You can now move on to the next exercise.
                    </p>
                  )}
                </div>

                {/* Test Results */}
                {testResults.results && testResults.results.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-medium">Test Results</h5>
                      {testResults.results.some(r => !r.passed) && (
                        <button
                          onClick={() => setShowHints(!showHints)}
                          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                        >
                          <Lightbulb className="h-3 w-3" />
                          {showHints ? 'Hide' : 'Show'} Hints
                        </button>
                      )}
                    </div>
                    {testResults.results.map((result, index) => (
                      <TestResultItem
                        key={index}
                        result={result}
                        isExpanded={expandedTests[index]}
                        onToggle={() => toggleTestExpansion(index)}
                        showHints={showHints}
                      />
                    ))}
                  </div>
                )}

                {/* Error */}
                {testResults.error && (
                  <div className="p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
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
        ) : (
          <div>
            {codeQualityReport ? (
              <CodeQualitySection codeReport={codeQualityReport} />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Run tests to see code quality analysis...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
