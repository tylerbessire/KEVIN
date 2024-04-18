const PersonalityEngine = require('../modules/personalityEngine');

describe('Personality Engine', () => {
  const engine = new PersonalityEngine();

  test('should start with neutral traits', () => {
    const traits = engine.getPersonalityTraits();
    expect(traits.openness).toBe(50);
    expect(traits.conscientiousness).toBe(50);
    expect(traits.extraversion).toBe(50);
    expect(traits.agreeableness).toBe(50);
    expect(traits.neuroticism).toBe(50);
  });

  test('should adjust traits based on feedback', () => {
    engine.adjustTraits(10);
    const traits = engine.getPersonalityTraits();
    expect(traits.openness).toBeGreaterThan(50);
    expect(traits.extraversion).toBeGreaterThan(50);
    engine.adjustTraits(-10);
    const newTraits = engine.getPersonalityTraits();
    expect(newTraits.neuroticism).toBeGreaterThan(50);
  });

  test('should not exceed trait boundaries', () => {
    engine.adjustTraits(1000);
    let traits = engine.getPersonalityTraits();
    expect(traits.openness).toBeLessThanOrEqual(100);
    expect(traits.extraversion).toBeLessThanOrEqual(100);
    engine.adjustTraits(-1000);
    traits = engine.getPersonalityTraits();
    expect(traits.neuroticism).toBeGreaterThanOrEqual(0);
  });

  // Additional tests to improve coverage
  test('should handle negative feedback correctly', () => {
    engine.adjustTraits(-20);
    const traits = engine.getPersonalityTraits();
    expect(traits.neuroticism).toBeLessThanOrEqual(100);
    expect(traits.openness).toBeGreaterThanOrEqual(0);
    expect(traits.extraversion).toBeGreaterThanOrEqual(0);
  });

  test('should correctly reset traits to neutral', () => {
    engine.adjustTraits(100); // Increase some traits
    engine.resetTraits(); // Reset traits to neutral
    const traits = engine.getPersonalityTraits();
    // Check if traits are reset to neutral values
    expect(traits.openness).toBe(50);
    expect(traits.conscientiousness).toBe(50);
    expect(traits.extraversion).toBe(50);
    expect(traits.agreeableness).toBe(50);
    expect(traits.neuroticism).toBe(50);
  });
});