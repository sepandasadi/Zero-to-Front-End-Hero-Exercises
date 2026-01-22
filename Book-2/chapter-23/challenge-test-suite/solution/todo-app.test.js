import { TodoApp, renderTodoApp } from './todo-app.js'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

describe('TodoApp - Unit Tests', () => {
  let app

  beforeEach(() => {
    app = new TodoApp()
  })

  describe('addTodo()', () => {
    test('should add a new todo', () => {
      const todo = app.addTodo('Buy milk')
      expect(todo.text).toBe('Buy milk')
      expect(todo.completed).toBe(false)
      expect(todo.id).toBe(1)
    })

    test('should trim whitespace', () => {
      const todo = app.addTodo('  Buy milk  ')
      expect(todo.text).toBe('Buy milk')
    })

    test('should throw error for empty text', () => {
      expect(() => app.addTodo('')).toThrow('Todo text cannot be empty')
      expect(() => app.addTodo('   ')).toThrow('Todo text cannot be empty')
    })

    test('should increment ID', () => {
      const todo1 = app.addTodo('First')
      const todo2 = app.addTodo('Second')
      expect(todo1.id).toBe(1)
      expect(todo2.id).toBe(2)
    })
  })

  describe('getTodos()', () => {
    test('should return empty array initially', () => {
      expect(app.getTodos()).toEqual([])
    })

    test('should return all todos', () => {
      app.addTodo('First')
      app.addTodo('Second')
      expect(app.getTodos()).toHaveLength(2)
    })

    test('should return a copy (not reference)', () => {
      app.addTodo('Test')
      const todos = app.getTodos()
      todos.push({ id: 999, text: 'Fake' })
      expect(app.getTodos()).toHaveLength(1)
    })
  })

  describe('getTodoById()', () => {
    test('should find todo by ID', () => {
      const todo = app.addTodo('Test')
      expect(app.getTodoById(todo.id)).toEqual(todo)
    })

    test('should return undefined for non-existent ID', () => {
      expect(app.getTodoById(999)).toBeUndefined()
    })
  })

  describe('toggleTodo()', () => {
    test('should toggle completed status', () => {
      const todo = app.addTodo('Test')
      expect(todo.completed).toBe(false)

      app.toggleTodo(todo.id)
      expect(todo.completed).toBe(true)

      app.toggleTodo(todo.id)
      expect(todo.completed).toBe(false)
    })

    test('should throw error for non-existent ID', () => {
      expect(() => app.toggleTodo(999)).toThrow('not found')
    })
  })

  describe('deleteTodo()', () => {
    test('should delete todo', () => {
      const todo = app.addTodo('Test')
      app.deleteTodo(todo.id)
      expect(app.getTodos()).toHaveLength(0)
    })

    test('should return deleted todo', () => {
      const todo = app.addTodo('Test')
      const deleted = app.deleteTodo(todo.id)
      expect(deleted).toEqual(todo)
    })

    test('should throw error for non-existent ID', () => {
      expect(() => app.deleteTodo(999)).toThrow('not found')
    })
  })

  describe('updateTodo()', () => {
    test('should update todo text', () => {
      const todo = app.addTodo('Old text')
      app.updateTodo(todo.id, 'New text')
      expect(todo.text).toBe('New text')
    })

    test('should throw error for empty text', () => {
      const todo = app.addTodo('Test')
      expect(() => app.updateTodo(todo.id, '')).toThrow('cannot be empty')
    })

    test('should throw error for non-existent ID', () => {
      expect(() => app.updateTodo(999, 'Text')).toThrow('not found')
    })
  })

  describe('getCompletedTodos()', () => {
    test('should return only completed todos', () => {
      const todo1 = app.addTodo('First')
      const todo2 = app.addTodo('Second')
      app.toggleTodo(todo1.id)

      const completed = app.getCompletedTodos()
      expect(completed).toHaveLength(1)
      expect(completed[0].id).toBe(todo1.id)
    })
  })

  describe('getActiveTodos()', () => {
    test('should return only active todos', () => {
      const todo1 = app.addTodo('First')
      const todo2 = app.addTodo('Second')
      app.toggleTodo(todo1.id)

      const active = app.getActiveTodos()
      expect(active).toHaveLength(1)
      expect(active[0].id).toBe(todo2.id)
    })
  })

  describe('clearCompleted()', () => {
    test('should remove all completed todos', () => {
      const todo1 = app.addTodo('First')
      const todo2 = app.addTodo('Second')
      app.toggleTodo(todo1.id)

      app.clearCompleted()
      expect(app.getTodos()).toHaveLength(1)
      expect(app.getTodos()[0].id).toBe(todo2.id)
    })

    test('should return cleared todos', () => {
      const todo1 = app.addTodo('First')
      app.toggleTodo(todo1.id)

      const cleared = app.clearCompleted()
      expect(cleared).toHaveLength(1)
      expect(cleared[0].id).toBe(todo1.id)
    })
  })
})

describe('TodoApp - Integration Tests', () => {
  let container
  let app
  let user

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    app = new TodoApp()
    user = userEvent.setup()
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  test('should render todo app', () => {
    renderTodoApp(container, app)
    expect(screen.getByRole('heading')).toHaveTextContent('Todo App')
    expect(screen.getByPlaceholderText(/what needs/i)).toBeInTheDocument()
  })

  test('should add todo via form', async () => {
    renderTodoApp(container, app)

    const input = screen.getByPlaceholderText(/what needs/i)
    const button = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'Buy milk')
    await user.click(button)

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  test('should toggle todo completion', async () => {
    app.addTodo('Test todo')
    renderTodoApp(container, app)

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    const todo = app.getTodos()[0]
    expect(todo.completed).toBe(true)
  })

  test('should delete todo', async () => {
    app.addTodo('Test todo')
    renderTodoApp(container, app)

    const deleteBtn = screen.getByRole('button', { name: /delete/i })
    await user.click(deleteBtn)

    expect(screen.queryByText('Test todo')).not.toBeInTheDocument()
    expect(app.getTodos()).toHaveLength(0)
  })

  test('should show correct items count', async () => {
    renderTodoApp(container, app)

    const input = screen.getByPlaceholderText(/what needs/i)
    const addBtn = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'First')
    await user.click(addBtn)

    await user.type(input, 'Second')
    await user.click(addBtn)

    expect(screen.getByText('2 items left')).toBeInTheDocument()
  })
})
