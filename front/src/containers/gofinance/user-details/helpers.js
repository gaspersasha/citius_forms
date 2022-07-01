export const getCreditScoreLevel = (score) => {
  if (!score || typeof score !== 'number') return null;
  if (score < 50) return 'Bad';
  if (score < 239) return 'Very poor';
  if (score < 320) return 'Poor';
  if (score < 410) return 'Fair';
  if (score < 470) return 'Good';

  return 'Excellent';
};
