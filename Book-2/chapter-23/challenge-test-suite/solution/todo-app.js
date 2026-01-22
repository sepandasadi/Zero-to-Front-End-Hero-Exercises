// Todo App with full test coverage

export class TodoApp {
  constructor() {
    this.todos = []
    this.nextId = 1
  }

  addTodo(text) {
    if (!text || text.trim() === '') {
      throw new Error('Todo text cannot be empty')
    }

    const todo = {
      id: this.nextId++,
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    }

    this.todos.push(todo)
    return todo
  }

  getTodos() {
    return [...this.todos]
  }

  getTodoById(id) {
    return this.todos.find((todo) => todo.id === id)
  }

  toggleTodo(id) {
    const todo = this.getTodoById(id)
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`)
    }
    todo.completed = !todo.completed
    return todo
  }

  deleteTodo(id) {
    const index = this.todos.findIndex((todo) => todo.id === id)
    if (index === -1) {
      throw new Error(`Todo with id ${id} not found`)
    }
    return this.todos.splice(index, 1)[0]
  }

  updateTodo(id, newText) {
    const todo = this.getTodoById(id)
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`)
    }
    if (!newText || newText.trim() === '') {
      throw new Error('Todo text cannot be empty')
    }
    todo.text = newText.trim()
    return todo
  }

  getCompletedTodos() {
    return this.todos.filter((todo) => todo.completed)
  }

  getActiveTodos() {
    return this.todos.filter((todo) => !todo.completed)
  }

  clearCompleted() {
    const completed = this.getCompletedTodos()
    this.todos = this.getActiveTodos()
    return completed
  }
}

// UI rendering function
export function renderTodoApp(container, app) {
  const html = `
    <div class="todo-app">
      <h1>Todo App</h1>
      <form id="todo-form">
        <input type="text" id="todo-input" placeholder="What needs to be done?" required />
        <button type="submit">Add</button>
      </form>
      <ul id="todo-list"></ul>
      <div id="todo-stats"></div>
    </div>
  `
  container.innerHTML = html

  const form = container.querySelector('#todo-form')
  const input = container.querySelector('#todo-input')
  const list = container.querySelector('#todo-list')

  function render() {
    const todos = app.getTodos()
    list.innerHTML = todos
      .map(
        (todo) => `
        <li data-id="${todo.id}" class="${todo.completed ? 'completed' : ''}">
          <input type="checkbox" ${todo.completed ? 'checked' : ''} data-action="toggle" />
          <span>${todo.text}</span>
          <button data-action="delete">Delete</button>
        </li>
      `
      )
      .join('')

    const stats = container.querySelector('#todo-stats')
    stats.textContent = `${app.getActiveTodos().length} items left`
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    app.addTodo(input.value)
    input.value = ''
    render()
  })

  list.addEventListener('click', (e) => {
    const li = e.target.closest('li')
    if (!li) return

    const id = parseInt(li.dataset.id)
    const action = e.target.dataset.action

    if (action === 'toggle') {
      app.toggleTodo(id)
    } else if (action === 'delete') {
      app.deleteTodo(id)
    }

    render()
  })

  render()
}
