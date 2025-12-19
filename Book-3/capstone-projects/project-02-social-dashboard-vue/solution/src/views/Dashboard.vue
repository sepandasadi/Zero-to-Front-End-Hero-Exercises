<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400">
        Welcome back! Here's your social media analytics overview.
      </p>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading analytics...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <div v-else class="dashboard-content">
      <!-- Metrics Grid -->
      <div class="metrics-grid">
        <MetricCard
          title="Total Followers"
          :value="metrics.followers"
          :change="metrics.change.followers"
          icon="users"
        />
        <MetricCard
          title="Engagement Rate"
          :value="metrics.engagement"
          :change="metrics.change.engagement"
          format="percentage"
          icon="heart"
        />
        <MetricCard
          title="Total Reach"
          :value="metrics.reach"
          :change="metrics.change.reach"
          icon="eye"
        />
        <MetricCard
          title="Posts Published"
          :value="metrics.posts"
          :change="metrics.change.posts"
          icon="file"
        />
      </div>

      <!-- Charts Section -->
      <div class="charts-section">
        <div class="chart-container">
          <h3 class="chart-title">Engagement Overview</h3>
          <!-- Engagement Chart Component -->
        </div>

        <div class="chart-container">
          <h3 class="chart-title">Follower Growth</h3>
          <!-- Followers Chart Component -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAnalyticsStore } from '@/stores/analytics'
import MetricCard from '@/components/dashboard/MetricCard.vue'

const analyticsStore = useAnalyticsStore()
const { metrics, loading, error } = storeToRefs(analyticsStore)

onMounted(() => {
  analyticsStore.fetchData()
})
</script>

<style scoped>
.dashboard {
  @apply p-6;
}

.dashboard-header {
  @apply mb-8;
}

.metrics-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8;
}

.charts-section {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-6;
}

.chart-container {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-md p-6;
}

.chart-title {
  @apply text-xl font-semibold mb-4;
}

.loading-state {
  @apply flex flex-col items-center justify-center py-16;
}

.spinner {
  @apply animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 mb-4;
}
</style>

