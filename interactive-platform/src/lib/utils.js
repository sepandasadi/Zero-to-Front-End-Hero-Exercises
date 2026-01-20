import { clsx } from 'clsx';

export function cn(...inputs) {
  return clsx(inputs);
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDuration(ms) {
  if (!ms) return '0s';
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

export const bookColorClasses = {
  blue: {
    icon: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    border: 'border-blue-200 dark:border-blue-800',
    ring: 'ring-blue-500',
    progress: 'text-blue-600',
    text: 'text-blue-600 dark:text-blue-400',
  },
  orange: {
    icon: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    border: 'border-orange-200 dark:border-orange-800',
    ring: 'ring-orange-500',
    progress: 'text-orange-600',
    text: 'text-orange-600 dark:text-orange-400',
  },
  purple: {
    icon: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    border: 'border-purple-200 dark:border-purple-800',
    ring: 'ring-purple-500',
    progress: 'text-purple-600',
    text: 'text-purple-600 dark:text-purple-400',
  },
  green: {
    icon: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/30',
    border: 'border-green-200 dark:border-green-800',
    ring: 'ring-green-500',
    progress: 'text-green-600',
    text: 'text-green-600 dark:text-green-400',
  },
};
