/**
 * HighScores.js - High Scores Management
 * localStorage operations for leaderboard
 */

const HighScores = {
  STORAGE_KEY: 'quizHighScores',
  MAX_SCORES: 10,

  /**
   * Get all high scores
   */
  getAll() {
    try {
      const scores = localStorage.getItem(this.STORAGE_KEY);
      return scores ? JSON.parse(scores) : [];
    } catch (error) {
      console.error('Error loading high scores:', error);
      return [];
    }
  },

  /**
   * Add new score
   */
  add(scoreData) {
    try {
      const scores = this.getAll();

      // Add timestamp and date
      const newScore = {
        ...scoreData,
        date: new Date().toISOString(),
        timestamp: Date.now()
      };

      scores.push(newScore);

      // Sort by score (descending)
      scores.sort((a, b) => b.score - a.score);

      // Keep only top scores
      const topScores = scores.slice(0, this.MAX_SCORES);

      // Save
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(topScores));

      // Return rank (1-based)
      const rank = topScores.findIndex(s => s.timestamp === newScore.timestamp) + 1;
      return rank > 0 ? rank : null;

    } catch (error) {
      console.error('Error saving high score:', error);
      return null;
    }
  },

  /**
   * Check if score qualifies for leaderboard
   */
  qualifies(score) {
    const scores = this.getAll();

    if (scores.length < this.MAX_SCORES) {
      return true;
    }

    const lowestScore = scores[scores.length - 1].score;
    return score > lowestScore;
  },

  /**
   * Get scores by difficulty
   */
  getByDifficulty(difficulty) {
    if (difficulty === 'all') {
      return this.getAll();
    }
    return this.getAll().filter(s => s.difficulty === difficulty);
  },

  /**
   * Get scores by category
   */
  getByCategory(category) {
    if (category === 'all') {
      return this.getAll();
    }
    return this.getAll().filter(s => s.category === category);
  },

  /**
   * Clear all scores
   */
  clear() {
    if (confirm('Are you sure you want to clear all high scores? This cannot be undone.')) {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    }
    return false;
  },

  /**
   * Get player's best score
   */
  getPlayerBest(playerName) {
    const scores = this.getAll();
    const playerScores = scores.filter(s => s.name === playerName);

    if (playerScores.length === 0) return null;

    return playerScores.reduce((best, current) => {
      return current.score > best.score ? current : best;
    });
  },

  /**
   * Format date for display
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  },

  /**
   * Render leaderboard HTML
   */
  render(difficulty = 'all') {
    const scores = this.getByDifficulty(difficulty);

    if (scores.length === 0) {
      return '<p class="empty-message">No high scores yet. Be the first!</p>';
    }

    return `
      <table class="leaderboard">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Correct</th>
            <th>%</th>
            <th>Difficulty</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${scores.map((score, index) => `
            <tr class="score-row">
              <td class="rank">
                ${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
              </td>
              <td class="name">${score.name}</td>
              <td class="score">${score.score}</td>
              <td class="correct">${score.correct}/${score.total}</td>
              <td class="percentage">${score.percentage}%</td>
              <td>
                <span class="badge badge-${score.difficulty.toLowerCase()}">
                  ${score.difficulty}
                </span>
              </td>
              <td class="category">${score.category}</td>
              <td class="date">${this.formatDate(score.date)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
};

