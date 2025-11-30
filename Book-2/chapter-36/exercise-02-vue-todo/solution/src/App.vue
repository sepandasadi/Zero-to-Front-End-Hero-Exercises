<template>
  <div class="app-container">
    <div class="todo-app">
      <h1>My Todo List</h1>

      <!-- Add todo form -->
      <div class="add-todo">
        <input
          v-model.trim="newTodoText"
          @keyup.enter="addTodo"
          placeholder="What needs to be done?"
        >
        <button @click="addTodo">Add</button>
      </div>

      <!-- Filter buttons -->
      <div class="filters">
        <button
          v-for="filterOption in ['all', 'active', 'completed']"
          :key="filterOption"
          @click="filter = filterOption"
          :class="{ active: filter === filterOption }"
        >
          {{ filterOption }}
        </button>
      </div>

      <!-- Todo list -->
      <ul class="todo-list" v-if="filteredTodos.length > 0">
        <li v-for="todo in filteredTodos" :key="todo.id" :class="{ done: todo.done }">
          <input type="checkbox" v-model="todo.done">
          <span>{{ todo.text }}</span>
          <button @click="deleteTodo(todo.id)">Delete</button>
        </li>
      </ul>

      <!-- Empty state -->
      <div v-else class="empty-state">
        <p>{{ emptyMessage }}</p>
      </div>

      <!-- Stats -->
      <div class="stats">
        <p><strong>Total:</strong> {{ todos.length }}</p>
        <p><strong>Completed:</strong> {{ completedCount }}</p>
        <p><strong>Active:</strong> {{ activeCount }}</p>
      </div>

      <!-- Clear completed -->
      <button
        v-if="completedCount > 0"
        @click="clearCompleted"
        class="clear-completed"
      >
        Clear Completed ({{ completedCount }})
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const todos = ref([]);
const newTodoText = ref('');
const filter = ref('all');

function addTodo() {
  if (newTodoText.value) {
    todos.value.push({
      id: Date.now(),
      text: newTodoText.value,
      done: false
    });
    newTodoText.value = '';
  }
}

function deleteTodo(id) {
  todos.value = todos.value.filter(todo => todo.id !== id);
}

function clearCompleted() {
  todos.value = todos.value.filter(todo => !todo.done);
}

const filteredTodos = computed(() => {
  if (filter.value === 'active') {
    return todos.value.filter(t => !t.done);
  }
  if (filter.value === 'completed') {
    return todos.value.filter(t => t.done);
  }
  return todos.value;
});

const completedCount = computed(() => todos.value.filter(t => t.done).length);
const activeCount = computed(() => todos.value.filter(t => !t.done).length);

const emptyMessage = computed(() => {
  if (todos.value.length === 0) return 'No todos yet. Add one above!';
  if (filter.value === 'active' && activeCount.value === 0) {
    return 'All tasks completed! 🎉';
  }
  if (filter.value === 'completed' && completedCount.value === 0) {
    return 'No completed tasks yet.';
  }
  return '';
});
</script>

<style scoped>
/* Styles moved to style.css */
</style>

