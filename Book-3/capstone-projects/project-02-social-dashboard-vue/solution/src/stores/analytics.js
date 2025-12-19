import { defineStore } from 'pinia'

export const useAnalyticsStore = defineStore('analytics', {
  state: () => ({
    metrics: {
      followers: 12500,
      engagement: 4.8,
      reach: 45000,
      posts: 156,
      change: {
        followers: 12.5,
        engagement: 8.3,
        reach: -3.2,
        posts: 15.7
      }
    },
    chartData: {
      engagement: [],
      followers: [],
      posts: []
    },
    loading: false,
    error: null
  }),

  getters: {
    engagementRate: (state) =>
      ((state.metrics.engagement / 100) * state.metrics.followers).toFixed(0),

    totalInteractions: (state) =>
      Math.floor(state.metrics.reach * (state.metrics.engagement / 100)),

    avgPostEngagement: (state) =>
      (state.metrics.engagement / state.metrics.posts).toFixed(2)
  },

  actions: {
    async fetchData(dateRange) {
      this.loading = true
      this.error = null

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Generate chart data
        this.chartData.engagement = this.generateEngagementData()
        this.chartData.followers = this.generateFollowersData()
        this.chartData.posts = this.generatePostsData()

      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    generateEngagementData() {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      return days.map(day => ({
        day,
        value: Math.floor(Math.random() * 500) + 200
      }))
    },

    generateFollowersData() {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      let currentFollowers = 10000

      return months.map(month => {
        currentFollowers += Math.floor(Math.random() * 1000) + 200
        return {
          month,
          value: currentFollowers
        }
      })
    },

    generatePostsData() {
      return Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `Post ${i + 1}`,
        engagement: Math.floor(Math.random() * 1000) + 100,
        reach: Math.floor(Math.random() * 5000) + 500,
        likes: Math.floor(Math.random() * 500) + 50,
        comments: Math.floor(Math.random() * 100) + 10
      }))
    },

    updateMetrics(newMetrics) {
      this.metrics = { ...this.metrics, ...newMetrics }
    }
  }
})

