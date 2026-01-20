import { useEffect, useRef, useState } from 'react';
import { RefreshCw, ExternalLink, CheckCircle2, AlertTriangle, Info, XCircle, Eye } from 'lucide-react';
import { useExercise } from '../../contexts/ExerciseContext';
import { Button } from '../UI/Button';
import { Badge } from '../UI/Badge';
import { HTMLValidator } from '../../lib/html-validator';
import { CSSValidator } from '../../lib/css-validator';
import { AccessibilityChecker } from '../../lib/accessibility-checker';
import { cn } from '../../lib/utils';

export function PreviewPane() {
  const { code, currentExercise } = useExercise();
  const iframeRef = useRef(null);
  const [key, setKey] = useState(0);
  const [iframeReady, setIframeReady] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [validationResults, setValidationResults] = useState(null);
  const updateTimeoutRef = useRef(null);

  const isHtmlExercise = currentExercise?.type === 'html' ||
    Object.keys(code).some(f => f.endsWith('.html'));

  // Reset iframe ready state when key changes, then set ready after mount
  useEffect(() => {
    setIframeReady(false);
    // Set ready after a short delay to ensure iframe is mounted
    const timer = setTimeout(() => {
      if (iframeRef.current) {
        setIframeReady(true);
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [key]);

  // Update preview with debounce
  useEffect(() => {
    if (!isHtmlExercise || !iframeRef.current || !iframeReady) return;

    const iframe = iframeRef.current;

    const updateIframe = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

        if (!iframeDoc) {
          console.warn('Cannot access iframe document');
          return;
        }

        // Get HTML, CSS, and JS
        const htmlFile = Object.keys(code).find(f => f.endsWith('.html'));
        const cssFile = Object.keys(code).find(f => f.endsWith('.css'));
        const jsFile = Object.keys(code).find(f => f.endsWith('.js'));

        let html = code[htmlFile] || '';
        const css = code[cssFile] || '';
        const js = code[jsFile] || '';

        // If no HTML at all, show a helpful message
        if (!html.trim()) {
          html = '<div style="padding: 20px; text-align: center; color: #666;">Start typing HTML to see the preview...</div>';
        }

        // Check if HTML is a complete document or just a fragment
        const isCompleteDocument = html.trim().toLowerCase().startsWith('<!doctype') ||
                                    html.trim().toLowerCase().startsWith('<html');

        let fullHtml;

        if (isCompleteDocument) {
          // It's a complete HTML document - inject CSS and JS into it
          fullHtml = html;

          // Inject external CSS if exists
          if (css) {
            const headCloseTag = fullHtml.indexOf('</head>');
            if (headCloseTag !== -1) {
              fullHtml = fullHtml.slice(0, headCloseTag) +
                        `<style>${css}</style>\n` +
                        fullHtml.slice(headCloseTag);
            }
          }

          // Inject JS before closing body tag
          if (js) {
            const jsCode = `
              <script type="module">
                try {
                  ${js}
                } catch (error) {
                  console.error('Preview error:', error);
                  document.body.innerHTML += '<div style="color: red; padding: 16px; border: 2px solid red; margin: 16px; border-radius: 4px;"><strong>JavaScript Error:</strong><br>' + error.message + '</div>';
                }
              </script>
            `;
            const bodyCloseTag = fullHtml.indexOf('</body>');
            if (bodyCloseTag !== -1) {
              fullHtml = fullHtml.slice(0, bodyCloseTag) +
                        jsCode + '\n' +
                        fullHtml.slice(bodyCloseTag);
            }
          }
        } else {
          // It's an HTML fragment - wrap it
          fullHtml = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body {
                    margin: 0;
                    padding: 16px;
                    font-family: system-ui, -apple-system, sans-serif;
                  }
                  ${css}
                </style>
              </head>
              <body>
                ${html}
                <script type="module">
                  try {
                    ${js}
                  } catch (error) {
                    console.error('Preview error:', error);
                    document.body.innerHTML += '<div style="color: red; padding: 16px; border: 2px solid red; margin: 16px; border-radius: 4px;"><strong>JavaScript Error:</strong><br>' + error.message + '</div>';
                  }
                </script>
              </body>
            </html>
          `;
        }

        // Write to iframe
        iframeDoc.open();
        iframeDoc.write(fullHtml);
        iframeDoc.close();
      } catch (error) {
        console.error('Error updating preview:', error);
      }
    };

    // Debounce updates (wait 500ms after typing stops)
    setIsUpdating(true);

    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = setTimeout(() => {
      updateIframe();
      runValidation();
      setIsUpdating(false);
    }, 500);

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [code, isHtmlExercise, key, iframeReady]);

  const runValidation = () => {
    const htmlFile = Object.keys(code).find(f => f.endsWith('.html'));
    const cssFile = Object.keys(code).find(f => f.endsWith('.css'));

    const html = code[htmlFile] || '';
    const css = code[cssFile] || '';

    const htmlValidator = new HTMLValidator();
    const cssValidator = new CSSValidator();
    const a11yChecker = new AccessibilityChecker();

    const htmlReport = htmlValidator.validate(html);
    const cssReport = cssValidator.validate(css);
    const a11yReport = a11yChecker.check(html);

    setValidationResults({
      html: htmlReport,
      css: cssReport,
      accessibility: a11yReport,
      overall: Math.round((htmlReport.score + cssReport.score + a11yReport.score) / 3),
    });
  };

  const handleIframeLoad = () => {
    setIframeReady(true);
  };

  const handleRefresh = () => {
    setKey(prev => prev + 1);
  };

  const handleOpenInNewTab = () => {
    const htmlFile = Object.keys(code).find(f => f.endsWith('.html'));
    const cssFile = Object.keys(code).find(f => f.endsWith('.css'));
    const jsFile = Object.keys(code).find(f => f.endsWith('.js'));

    let html = code[htmlFile] || '<div id="root"></div>';
    const css = code[cssFile] || '';
    const js = code[jsFile] || '';

    // Check if HTML is a complete document or just a fragment
    const isCompleteDocument = html.trim().toLowerCase().startsWith('<!doctype') ||
                                html.trim().toLowerCase().startsWith('<html');

    let fullHtml;

    if (isCompleteDocument) {
      // It's a complete HTML document - inject CSS and JS into it
      fullHtml = html;

      if (css) {
        fullHtml = fullHtml.replace(
          '</head>',
          `<style>${css}</style>\n</head>`
        );
      }

      if (js) {
        fullHtml = fullHtml.replace(
          '</body>',
          `<script type="module">${js}</script>\n</body>`
        );
      }
    } else {
      // It's an HTML fragment - wrap it
      fullHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                margin: 0;
                padding: 16px;
                font-family: system-ui, -apple-system, sans-serif;
              }
              ${css}
            </style>
          </head>
          <body>
            ${html}
            <script type="module">
              ${js}
            </script>
          </body>
        </html>
      `;
    }

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  if (!isHtmlExercise) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 text-center">
        <p className="mb-2">Live preview is only available for HTML/CSS exercises</p>
        <p className="text-sm">Use the test runner to validate your JavaScript code</p>
      </div>
    );
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-blue-600 dark:text-blue-400';
    if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Tabs Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('preview')}
            className={cn(
              'text-sm font-medium px-3 py-1 rounded transition-colors',
              activeTab === 'preview'
                ? 'bg-background text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab('validation')}
            className={cn(
              'text-sm font-medium px-3 py-1 rounded transition-colors flex items-center gap-2',
              activeTab === 'validation'
                ? 'bg-background text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Validation
            {validationResults && (
              <span className={cn('text-xs font-bold', getScoreColor(validationResults.overall))}>
                {validationResults.overall}%
              </span>
            )}
          </button>
          {isUpdating && (
            <span className="text-xs text-muted-foreground animate-pulse">
              Updating...
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={handleRefresh} title="Refresh preview">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={handleOpenInNewTab} title="Open in new tab">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'preview' ? (
        <div className="flex-1 bg-white dark:bg-gray-100 relative">
          <iframe
            key={key}
            ref={iframeRef}
            title="preview"
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-modals allow-same-origin"
          />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          {validationResults ? (
            <div className="space-y-4">
              {/* Overall Score */}
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Overall Quality Score</h3>
                  <span className={cn('text-3xl font-bold', getScoreColor(validationResults.overall))}>
                    {validationResults.overall}%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Based on HTML structure, CSS quality, accessibility, and best practices
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-1">HTML</div>
                    <div className={cn('text-sm font-semibold', getScoreColor(validationResults.html.score))}>
                      {validationResults.html.score}%
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-1">CSS</div>
                    <div className={cn('text-sm font-semibold', getScoreColor(validationResults.css.score))}>
                      {validationResults.css.score}%
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-1">Accessibility</div>
                    <div className={cn('text-sm font-semibold', getScoreColor(validationResults.accessibility.score))}>
                      {validationResults.accessibility.score}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Accessibility Compliance */}
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold">WCAG Compliance</h3>
                  </div>
                  <Badge variant={
                    validationResults.accessibility.complianceLevel === 'AAA' ? 'success' :
                    validationResults.accessibility.complianceLevel === 'AA' ? 'default' :
                    validationResults.accessibility.complianceLevel === 'A' ? 'secondary' : 'destructive'
                  }>
                    {validationResults.accessibility.complianceLevel}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {validationResults.accessibility.complianceLevel === 'AAA' && 'Excellent! Meets all WCAG 2.1 AAA guidelines'}
                  {validationResults.accessibility.complianceLevel === 'AA' && 'Good! Meets WCAG 2.1 AA guidelines'}
                  {validationResults.accessibility.complianceLevel === 'A' && 'Basic compliance - only meets WCAG 2.1 Level A'}
                  {validationResults.accessibility.complianceLevel === 'Not Compliant' && 'Does not meet minimum WCAG 2.1 standards'}
                </p>
                <div className="grid grid-cols-3 gap-3 mt-3 text-xs">
                  <div className="text-center">
                    <div className="font-semibold text-red-600">{validationResults.accessibility.summary.byLevel.A}</div>
                    <div className="text-muted-foreground">Level A Issues</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-yellow-600">{validationResults.accessibility.summary.byLevel.AA}</div>
                    <div className="text-muted-foreground">Level AA Issues</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">{validationResults.accessibility.summary.byLevel.AAA}</div>
                    <div className="text-muted-foreground">Level AAA Issues</div>
                  </div>
                </div>
              </div>

              {/* HTML Validation */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-muted/50 border-b border-border flex items-center justify-between">
                  <h4 className="font-semibold">HTML Validation</h4>
                  <div className="flex items-center gap-3">
                    <span className={cn('text-sm font-semibold', getScoreColor(validationResults.html.score))}>
                      {validationResults.html.score}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {validationResults.html.summary.errors} errors, {validationResults.html.summary.warnings} warnings
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  {validationResults.html.results.length > 0 ? (
                    validationResults.html.results.map((result, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-2 rounded hover:bg-muted/30 transition-colors"
                      >
                        {getSeverityIcon(result.severity)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">{result.message}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{result.type}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No HTML to validate</p>
                  )}
                </div>
              </div>

              {/* CSS Validation */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-muted/50 border-b border-border flex items-center justify-between">
                  <h4 className="font-semibold">CSS Validation</h4>
                  <div className="flex items-center gap-3">
                    <span className={cn('text-sm font-semibold', getScoreColor(validationResults.css.score))}>
                      {validationResults.css.score}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {validationResults.css.summary.errors} errors, {validationResults.css.summary.warnings} warnings
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  {validationResults.css.results.length > 0 ? (
                    validationResults.css.results.map((result, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-2 rounded hover:bg-muted/30 transition-colors"
                      >
                        {getSeverityIcon(result.severity)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">{result.message}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{result.type}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No CSS to validate</p>
                  )}
                </div>
              </div>

              {/* Accessibility Issues */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-muted/50 border-b border-border flex items-center justify-between">
                  <h4 className="font-semibold">Accessibility Issues</h4>
                  <div className="flex items-center gap-3">
                    <span className={cn('text-sm font-semibold', getScoreColor(validationResults.accessibility.score))}>
                      {validationResults.accessibility.score}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {validationResults.accessibility.summary.errors} errors, {validationResults.accessibility.summary.warnings} warnings
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  {validationResults.accessibility.issues.length > 0 ? (
                    validationResults.accessibility.issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-2 rounded hover:bg-muted/30 transition-colors"
                      >
                        {getSeverityIcon(issue.severity)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-sm">{issue.message}</p>
                            <Badge variant="outline" className="text-xs">
                              WCAG {issue.wcagLevel}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">Rule {issue.rule}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-green-500" />
                      <p className="text-sm font-medium">No accessibility issues found!</p>
                      <p className="text-xs text-muted-foreground mt-1">Your code meets WCAG guidelines</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Start coding to see validation results...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
