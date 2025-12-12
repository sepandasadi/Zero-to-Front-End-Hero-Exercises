/**
 * Membership Level Utilities
 *
 * Single responsibility: membership level calculations
 */

// Membership thresholds
export const MEMBERSHIP_LEVELS = {
  PLATINUM: { name: 'platinum', threshold: 10000 },
  GOLD: { name: 'gold', threshold: 5000 },
  SILVER: { name: 'silver', threshold: 1000 },
  BRONZE: { name: 'bronze', threshold: 0 }
}

/**
 * Determine membership level based on total spent
 * Uses simple early returns (KISS principle)
 *
 * @param {number} totalSpent - Total amount spent
 * @returns {string} Membership level name
 */
export function getMembershipLevel(totalSpent) {
  if (totalSpent >= MEMBERSHIP_LEVELS.PLATINUM.threshold) {
    return MEMBERSHIP_LEVELS.PLATINUM.name
  }

  if (totalSpent >= MEMBERSHIP_LEVELS.GOLD.threshold) {
    return MEMBERSHIP_LEVELS.GOLD.name
  }

  if (totalSpent >= MEMBERSHIP_LEVELS.SILVER.threshold) {
    return MEMBERSHIP_LEVELS.SILVER.name
  }

  return MEMBERSHIP_LEVELS.BRONZE.name
}

/**
 * Get points to next level
 * @param {number} totalSpent - Current total spent
 * @returns {Object} { pointsNeeded, nextLevel }
 */
export function getPointsToNextLevel(totalSpent) {
  const levels = Object.values(MEMBERSHIP_LEVELS).sort((a, b) => b.threshold - a.threshold)

  for (const level of levels) {
    if (totalSpent < level.threshold) {
      return {
        pointsNeeded: level.threshold - totalSpent,
        nextLevel: level.name
      }
    }
  }

  return {
    pointsNeeded: 0,
    nextLevel: 'max'
  }
}

