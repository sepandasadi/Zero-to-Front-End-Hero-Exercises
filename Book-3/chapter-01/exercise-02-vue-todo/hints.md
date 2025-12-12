# Exercise 2: Vue Todo List - Hints

## Getting Started

### Hint 1: Setting Up State with Vue 3 Composition API
Vue 3 uses `ref()` to create reactive state:

```javascript
import { ref } from 'vue';

const todos = ref([]);
const newTodoText = ref('');
const filter = ref('all');
```

Each todo object should look like:
```javascript
{
  id: Date.now(),      // Unique ID
  text: 'Buy groceries', // Todo text
  done: false           // Completion status
}
```

---

## Implementation Hints

### Hint 2: Adding Todos
To add a todo, push a new object to the array:

```javascript
function addTodo() {
  if (newTodoText.value) {
    todos.value.push({
      id: Date.now(),
      text: newTodoText.value,
      done: false
    });
    newTodoText.value = ''; // Clear input
  }
}
```

**Important:** In Vue 3 with `ref`, you must use `.value` to access the actual value!

---

### Hint 3: Two-Way Binding with v-model
`v-model` automatically syncs input with state:

```vue
<input
  v-model.trim="newTodoText"
  @keyup.enter="addTodo"
  placeholder="What needs to be done?"
>
```

- `.trim` modifier removes whitespace
- `@keyup.enter` triggers function when Enter is pressed

---

### Hint 4: Rendering Lists with v-for
Display todos with `v-for`:

```vue
<ul class="todo-list">
  <li v-for="todo in filteredTodos" :key="todo.id">
    <input type="checkbox" v-model="todo.done">
    <span>{{ todo.text }}</span>
    <button @click="deleteTodo(todo.id)">Delete</button>
  </li>
</ul>
```

**Always include `:key`** with a unique identifier!

---

### Hint 5: Computed Properties for Filtering
Use `computed()` for derived state:

```javascript
import { computed } from 'vue';

const filteredTodos = computed(() => {
  if (filter.value === 'active') {
    return todos.value.filter(t => !t.done);
  }
  if (filter.value === 'completed') {
    return todos.value.filter(t => t.done);
  }
  return todos.value; // 'all'
});
```

**Why computed instead of a function?**
- Cached until dependencies change
- More efficient for frequently accessed data

---

### Hint 6: Stats with Computed Properties
Calculate counts automatically:

```javascript
const completedCount = computed(() => {
  return todos.value.filter(t => t.done).length;
});

const activeCount = computed(() => {
  return todos.value.filter(t => !t.done).length;
});
```

These update automatically when todos change!

---

### Hint 7: Deleting Todos
Filter out the todo by ID:

```javascript
function deleteTodo(id) {
  todos.value = todos.value.filter(todo => todo.id !== id);
}
```

---

### Hint 8: Conditional Rendering with v-if
Show/hide elements based on conditions:

```vue
<ul class="todo-list" v-if="filteredTodos.length > 0">
  <!-- todos -->
</ul>

<div v-else class="empty-state">
  <p>{{ emptyMessage }}</p>
</div>
```

---

### Hint 9: Dynamic Classes
Apply classes conditionally:

```vue
<li :class="{ done: todo.done }">
  <!-- This adds 'done' class when todo.done is true -->
</li>

<button
  :class="{ active: filter === filterOption }"
>
  {{ filterOption }}
</button>
```

---

## Common Mistakes

### ❌ Mistake 1: Forgetting .value
```javascript
// WRONG (in <script setup>):
todos.push({ ... });  // Error!

// CORRECT:
todos.value.push({ ... });
```

In the `<template>`, Vue automatically unwraps refs, so you DON'T use `.value` there!

```vue
<!-- In template, this is CORRECT: -->
<p>{{ todos.length }}</p>
```

---

### ❌ Mistake 2: Mutating Filtered Arrays
```javascript
// WRONG:
function deleteTodo(id) {
  filteredTodos.value = filteredTodos.value.filter(...);
  // filteredTodos is computed, you can't set it!
}

// CORRECT:
function deleteTodo(id) {
  todos.value = todos.value.filter(...);
  // Modify the source data, computed updates automatically
}
```

---

### ❌ Mistake 3: Missing :key in v-for
```vue
<!-- WRONG: -->
<li v-for="todo in todos">
  <!-- No key! -->
</li>

<!-- CORRECT: -->
<li v-for="todo in todos" :key="todo.id">
  <!-- Unique key helps Vue track items -->
</li>
```

---

### ❌ Mistake 4: Using Array Index as Key with Mutable Lists
```vue
<!-- RISKY: -->
<li v-for="(todo, index) in todos" :key="index">
  <!-- Index can change when items are reordered/deleted -->
</li>

<!-- BETTER: -->
<li v-for="todo in todos" :key="todo.id">
  <!-- ID is stable and unique -->
</li>
```

---

## Step-by-Step Checklist

- [ ] Import `ref` and `computed` from 'vue'
- [ ] Create `todos` ref (empty array)
- [ ] Create `newTodoText` ref (empty string)
- [ ] Create `filter` ref ('all')
- [ ] Create `addTodo()` function
- [ ] Create `deleteTodo(id)` function
- [ ] Create `clearCompleted()` function
- [ ] Create `filteredTodos` computed property
- [ ] Create `completedCount` computed property
- [ ] Create `activeCount` computed property
- [ ] Create `emptyMessage` computed property
- [ ] Add input with v-model and @keyup.enter
- [ ] Add filter buttons with v-for and :class
- [ ] Add todo list with v-for and :key
- [ ] Add checkbox with v-model for each todo
- [ ] Add delete button for each todo
- [ ] Add stats display
- [ ] Add clear completed button with v-if

---

## Testing Your Implementation

### Test 1: Adding Todos
1. Type "Buy groceries" and click Add
2. Type "Walk the dog" and press Enter
3. Both should appear in the list
4. Input should clear after each add

### Test 2: Completing Todos
1. Check the checkbox for "Buy groceries"
2. Text should get strikethrough
3. Completed count should increase

### Test 3: Filtering
1. Add 3 todos, complete 1
2. Click "Active" → should show 2 todos
3. Click "Completed" → should show 1 todo
4. Click "All" → should show 3 todos

### Test 4: Deleting
1. Click delete on a todo
2. It should disappear
3. Stats should update

### Test 5: Clear Completed
1. Complete 2 todos
2. Click "Clear Completed"
3. Only active todos remain

---

## Debugging Tips

### Problem: Changes not showing in UI
**Check:**
- Are you using `.value` in `<script setup>`?
- Did you import `ref` from 'vue'?
- Check browser console for errors

### Problem: v-model not working
**Check:**
- Is the variable a `ref()`?
- Correct syntax: `v-model="variableName"` (no .value in template)
- Check if input has value attribute

### Problem: Computed not updating
**Check:**
- Did you import `computed` from 'vue'?
- Are you accessing reactive data inside computed?
- Did you use `.value` for refs inside computed?

### Problem: List not rendering
**Check:**
- Is the data an array?
- Did you use `:key` with unique values?
- Check Vue DevTools to see the data

---

## Vue 3 Composition API Reminders

### In `<script setup>`:
```javascript
const count = ref(0);
count.value++;  // ✅ Use .value
```

### In `<template>`:
```vue
<p>{{ count }}</p>  <!-- ✅ No .value needed -->
```

### In computed:
```javascript
const doubled = computed(() => {
  return count.value * 2;  // ✅ Use .value
});
```

---

## Bonus Challenges Hints

### Bonus 1: Edit Todos Inline
```vue
<li @dblclick="startEditing(todo)">
  <input
    v-if="editingId === todo.id"
    v-model="editText"
    @blur="finishEditing(todo)"
    @keyup.enter="finishEditing(todo)"
  >
  <span v-else>{{ todo.text }}</span>
</li>
```

### Bonus 2: LocalStorage Persistence
```javascript
import { watch } from 'vue';

// Load on mount
const todos = ref(JSON.parse(localStorage.getItem('todos') || '[]'));

// Save on change
watch(todos, (newTodos) => {
  localStorage.setItem('todos', JSON.stringify(newTodos));
}, { deep: true });
```

### Bonus 3: Priority Levels
Add priority to todo object:
```javascript
{
  id: Date.now(),
  text: 'Important task',
  done: false,
  priority: 'high'  // 'low', 'medium', 'high'
}
```

---

## Still Stuck?

1. **Check Vue DevTools** - See reactive data in real-time
2. **Console.log the data** - Use `console.log(todos.value)`
3. **Read error messages** - Vue has helpful error messages
4. **Check the official docs** - https://vuejs.org/guide/
5. **Compare with solution** - Available in solution/ folder

---

## Key Vue Concepts You're Learning

1. **Reactivity** - Data changes automatically update the UI
2. **ref()** - Creates reactive primitive values
3. **computed()** - Cached derived state
4. **v-model** - Two-way data binding
5. **v-for** - List rendering
6. **v-if/v-else** - Conditional rendering
7. **Event handling** - @click, @keyup, etc.
8. **Event modifiers** - .enter, .trim, etc.

---

## Next Steps

Once you complete this:
1. Try the bonus challenges
2. Add your own features (due dates, categories, etc.)
3. Move on to Exercise 3 (Framework Comparison)
4. Compare Vue's approach with React's approach

**You're doing great! Keep building!** 🚀

