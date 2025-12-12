import { useState } from 'react';
import Button from './components/Button';
import Counter from './components/Counter';
import LoginForm from './components/LoginForm';
import TodoList from './components/TodoList';
import UserCard from './components/UserCard';

function App() {
  const [message, setMessage] = useState('');

  const handleLogin = (data) => {
    setMessage(`Logged in as: ${data.email}`);
  };

  const sampleUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    verified: true,
  };

  return (
    <div className="container">
      <h1>Component Testing Examples</h1>

      <section>
        <h2>Button Component</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button onClick={() => alert('Primary clicked!')}>Primary</Button>
          <Button variant="secondary" onClick={() => alert('Secondary clicked!')}>
            Secondary
          </Button>
          <Button variant="danger" onClick={() => alert('Danger clicked!')}>
            Danger
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section>
        <h2>Counter Component</h2>
        <Counter initialCount={0} min={0} max={10} />
      </section>

      <section>
        <h2>Login Form Component</h2>
        <LoginForm onSubmit={handleLogin} />
        {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
      </section>

      <section>
        <h2>Todo List Component</h2>
        <TodoList />
      </section>

      <section>
        <h2>User Card Component</h2>
        <UserCard
          user={sampleUser}
          onEdit={() => alert('Edit clicked')}
          onDelete={() => alert('Delete clicked')}
        />
      </section>
    </div>
  );
}

export default App;

