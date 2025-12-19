import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: localStorage.getItem('theme') === 'dark'
  }),

  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },

    setTheme(isDark) {
      this.isDark = isDark
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }
  }
})

