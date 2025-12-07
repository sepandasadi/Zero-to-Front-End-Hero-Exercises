import { useEffect } from 'react';
import { useTodoStore } from '../store/todoStore';
import TodoForm from '../components/TodoForm';
import FilterButtons from '../components/FilterButtons';
import SearchBar from '../components/SearchBar';
import TodoList from '../components/TodoList';
import TodoStats from '../components/TodoStats';
import './TodosPage.css';

/**
 * TodosPage Component
 * Main page for managing todos
 */
function TodosPage() {
  const { fetchTodos, loading, error } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="todos-page" data-testid="todos-page">
      <div className="container">
        <div className="todos-header">
          <h2 className="todos-title">My Todos</h2>
        </div>

        <TodoForm />

        <SearchBar />

        <FilterButtons />

        {loading && !useTodoStore.getState().todos.length ? (
          <div className="loading-state" data-testid="loading-state">
            <p>Loading todos...</p>
          </div>
        ) : error ? (
          <div className="error-state" data-testid="error-state" role="alert">
            <p>Error: {error}</p>
          </div>
        ) : (
          <TodoList />
        )}

        <TodoStats />
      </div>
    </div>
  );
}

export default TodosPage;

