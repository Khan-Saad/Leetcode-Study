export const getIconForDifficulty = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return '🌱'; // Leaf emoji for easy
      case 'medium':
        return '🎮'; // Joystick emoji for medium
      case 'hard':
        return '🐞'; // Bug emoji for hard
      default:
        return '❓'; // Question mark for unknown
    }
  };