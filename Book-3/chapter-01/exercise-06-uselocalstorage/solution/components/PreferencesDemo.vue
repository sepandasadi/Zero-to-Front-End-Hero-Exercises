<template>
  <div class="preferences">
    <h1>User Preferences</h1>

    <label>
      Theme:
      <select v-model="theme">
        <option>light</option>
        <option>dark</option>
      </select>
      <button @click="resetTheme">Reset</button>
    </label>

    <label>
      Font Size:
      <input type="number" v-model.number="fontSize">
      <button @click="resetFontSize">Reset</button>
    </label>

    <div class="preview">
      <p>Theme: {{ theme }}</p>
      <p>Font Size: {{ fontSize }}px</p>
    </div>
  </div>
</template>

<script setup>
import { useLocalStorage } from '../composables/useLocalStorage';

const { value: theme, reset: resetTheme } = useLocalStorage('theme', 'light');
const { value: fontSize, reset: resetFontSize } = useLocalStorage('fontSize', 16);
</script>

<style scoped>
.preferences {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 1rem;
}

select, input {
  margin-left: 1rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #2563eb;
}

.preview {
  margin-top: 2rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 4px;
}

.preview p {
  margin: 0.5rem 0;
  font-weight: 600;
}
</style>

