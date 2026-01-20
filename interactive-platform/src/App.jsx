import { useEffect, useState } from 'react';
import { ProgressProvider } from './contexts/ProgressContext';
import { ExerciseProvider } from './contexts/ExerciseContext';
import { AppLayout } from './components/Layout/AppLayout';
import catalog from './data/exercises-catalog.json';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Loading Zero to Hero</h2>
          <p className="text-sm text-muted-foreground">
            Preparing your learning environment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <ProgressProvider totalExercises={catalog.stats.totalExercises}>
      <ExerciseProvider catalog={catalog}>
        <AppLayout catalog={catalog} />
      </ExerciseProvider>
    </ProgressProvider>
  );
}

export default App;
