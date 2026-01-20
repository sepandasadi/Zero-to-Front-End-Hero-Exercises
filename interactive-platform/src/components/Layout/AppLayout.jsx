import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '../UI/Button';
import { Sidebar } from '../Navigation/Sidebar';
import { ExerciseView } from '../Exercise/ExerciseView';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

export function AppLayout({ catalog }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + B - Toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setSidebarOpen(prev => !prev);
      }
      // Ctrl/Cmd + Shift + T - Toggle theme
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sidebarWidth = sidebarOpen ? 320 : 0;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div style={{ width: `${sidebarWidth}px`, transition: 'width 300ms', overflow: 'hidden' }}>
        <Sidebar catalog={catalog} isOpen={sidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
          <Button size="sm" variant="ghost" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Button size="sm" variant="ghost" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Exercise Header */}
        <div className="px-6 py-3 border-b border-border bg-card">
          <h2 className="text-lg font-semibold">Exercise Title</h2>
        </div>

        {/* Resizable Exercise Panels */}
        <div className="flex-1 overflow-hidden">
          <ExerciseView />
        </div>
      </div>
    </div>
  );
}
