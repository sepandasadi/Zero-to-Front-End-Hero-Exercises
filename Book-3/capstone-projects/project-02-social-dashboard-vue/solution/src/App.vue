<template>
  <div id="app" :class="{ 'dark': isDark }">
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)
</script>

<style>
#app {
  min-height: 100vh;
  transition: background-color 0.3s ease;
}

.dark {
  background-color: #1a202c;
  color: #e2e8f0;
}
</style>

