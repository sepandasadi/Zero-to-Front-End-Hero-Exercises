import { useEffect, useRef, useState } from 'react';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { useExercise } from '../../contexts/ExerciseContext';
import { Button } from '../UI/Button';

export function PreviewPane() {
  const { code, currentExercise } = useExercise();
  const iframeRef = useRef(null);
  const [key, setKey] = useState(0);
  const [iframeReady, setIframeReady] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
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
      setIsUpdating(false);
    }, 500);

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [code, isHtmlExercise, key, iframeReady]);

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

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Preview Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">Live Preview</h3>
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

      {/* Preview Frame */}
      <div className="flex-1 bg-white dark:bg-gray-100 relative">
        <iframe
          key={key}
          ref={iframeRef}
          title="preview"
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-modals allow-same-origin"
        />
      </div>
    </div>
  );
}
