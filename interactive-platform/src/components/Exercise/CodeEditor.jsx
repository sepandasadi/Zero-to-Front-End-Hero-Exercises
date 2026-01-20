import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { X, File } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useExercise } from '../../contexts/ExerciseContext';

const languageMap = {
  html: 'html',
  css: 'css',
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  json: 'json',
  vue: 'html',
};

function getLanguage(filename) {
  if (!filename) return 'javascript';
  const ext = filename.split('.').pop();
  return languageMap[ext] || 'javascript';
}

function FileTab({ filename, isActive, onClick, onClose, showClose }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-4 py-2 border-r border-border text-sm transition-colors',
        isActive
          ? 'bg-background text-foreground'
          : 'bg-muted/50 text-muted-foreground hover:bg-muted'
      )}
    >
      <File className="h-3.5 w-3.5" />
      <span>{filename}</span>
      {showClose && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="ml-1 hover:bg-accent rounded p-0.5"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </button>
  );
}

export function CodeEditor({ theme = 'vs-dark' }) {
  const { code, activeFile, setActiveFile, updateCode, currentExercise } = useExercise();
  const editorRef = useRef(null);

  if (!currentExercise) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select an exercise to begin
      </div>
    );
  }

  const files = Object.keys(code);
  
  // Check if there are any files to display
  if (files.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <p className="mb-2">No code files found for this exercise</p>
          <p className="text-sm">Check the exercise setup or try another exercise</p>
        </div>
      </div>
    );
  }

  const currentFile = activeFile || files[0];
  const currentContent = code[currentFile] || '';
  const language = getLanguage(currentFile);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      minimap: { enabled: files.length > 1 || currentContent.split('\n').length > 50 },
      lineNumbers: 'on',
      roundedSelection: true,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      wordWrap: 'on',
    });
  }

  function handleEditorChange(value) {
    if (value !== undefined && currentFile) {
      updateCode(currentFile, value);
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* File Tabs */}
      {files.length > 1 && (
        <div className="flex items-center bg-muted/30 border-b border-border overflow-x-auto">
          {files.map(filename => (
            <FileTab
              key={filename}
              filename={filename}
              isActive={filename === currentFile}
              onClick={() => setActiveFile(filename)}
              showClose={false}
            />
          ))}
        </div>
      )}

      {/* Editor */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={language}
          value={currentContent}
          theme={theme}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          loading={<div className="flex items-center justify-center h-full text-muted-foreground">Loading editor...</div>}
          options={{
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line',
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
