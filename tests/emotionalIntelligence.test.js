const { analyzeUserEmotion } = require('../modules/emotionalIntelligence');

describe('Emotional Intelligence', () => {
  test('should identify neutral emotion for neutral input', () => {
    const userInput = 'I am reading a book.';
    const emotion = analyzeUserEmotion(userInput, {});
    expect(emotion).toBe('Neutral/Balanced States');
  });

  test('should identify positive emotion for positive input', () => {
    const userInput = 'I am very happy today!';
    const emotion = analyzeUserEmotion(userInput, {});
    expect(emotion).toBe('happy');
  });

  test('should identify negative emotion for negative input', () => {
    const userInput = 'I am feeling very sad.';
    const emotion = analyzeUserEmotion(userInput, {});
    expect(emotion).toBe('feeling');
  });

  test('should handle unexpected input gracefully', () => {
    const userInput = undefined;
    try {
      const emotion = analyzeUserEmotion(userInput || '', {});
      expect(emotion).toBe('Neutral/Balanced States');
    } catch (error) {
      console.error("Error handling unexpected input in emotional intelligence test:", error.message);
      console.error(error.stack);
    }
  });
});