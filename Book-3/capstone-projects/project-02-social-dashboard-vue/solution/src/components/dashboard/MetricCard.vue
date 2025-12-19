<template>
  <div class="metric-card">
    <div class="flex items-center justify-between mb-4">
      <div class="icon-container">
        <component :is="iconComponent" class="w-6 h-6" />
      </div>
      <div
        :class="['trend-badge', changeIsPositive ? 'positive' : 'negative']"
      >
        {{ changeIsPositive ? '↑' : '↓' }} {{ Math.abs(change) }}%
      </div>
    </div>

    <h3 class="text-gray-600 dark:text-gray-400 text-sm mb-2">
      {{ title }}
    </h3>

    <p class="text-3xl font-bold mb-2">
      {{ formattedValue }}
    </p>

    <p class="text-sm text-gray-500">
      vs last period
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  value: [Number, String],
  change: Number,
  icon: String,
  format: {
    type: String,
    default: 'number'
  }
})

const iconComponent = computed(() => {
  // In a real app, import actual icons
  return 'div'
})

const changeIsPositive = computed(() => props.change > 0)

const formattedValue = computed(() => {
  if (props.format === 'currency') {
    return `$${props.value.toLocaleString()}`
  } else if (props.format === 'percentage') {
    return `${props.value}%`
  }
  return props.value.toLocaleString()
})
</script>

<style scoped>
.metric-card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow;
}

.icon-container {
  @apply bg-blue-100 dark:bg-blue-900 p-3 rounded-lg;
}

.trend-badge {
  @apply px-3 py-1 rounded-full text-sm font-semibold;
}

.trend-badge.positive {
  @apply bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300;
}

.trend-badge.negative {
  @apply bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300;
}
</style>

