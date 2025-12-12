<template>
  <div class="preferences">
    <h1>User Preferences</h1>

    <label>
      Theme:
      <select>
        <option>light</option>
        <option>dark</option>
      </select>
    </label>

    <label>
      Font Size:
      <input type="number">
    </label>

    <!-- TODO: Add reset buttons -->
  </div>
</template>

<script setup>
// TODO: Import useLocalStorage composable

// TODO: Use composable for theme

// TODO: Use composable for fontSize
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
  margin-top: 0.5rem;
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
</style>

