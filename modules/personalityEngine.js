// modules/personalityEngine.js

class PersonalityEngine {
  constructor() {
    // Define initial personality traits
    this.traits = {
      openness: 50, // Openness to experience
      conscientiousness: 50, // Conscientiousness
      extraversion: 50, // Extraversion
      agreeableness: 50, // Agreeableness
      neuroticism: 50, // Emotional stability
    };
    console.log("Personality Engine initialized with default traits.");
  }

  // Adjust personality traits based on user interaction and feedback
  adjustTraits(feedback) {
    try {
      // Example adjustment logic based on positive or negative feedback
      if (feedback > 0) {
        this.traits.openness = Math.min(100, this.traits.openness + feedback * 0.1);
        this.traits.extraversion = Math.min(100, this.traits.extraversion + feedback * 0.1);
      } else {
        this.traits.neuroticism = Math.min(100, this.traits.neuroticism + Math.abs(feedback) * 0.1);
      }

      // Ensure traits remain within bounds (0-100)
      Object.keys(this.traits).forEach(trait => {
        this.traits[trait] = Math.max(0, this.traits[trait]);
      });

      console.log(`Personality traits adjusted based on feedback. New traits: ${JSON.stringify(this.traits)}`);
    } catch (error) {
      console.error("Error adjusting personality traits:", error);
      console.error(error.stack);
    }
  }

  // Simulate Kevin's learning from interactions
  learnFromInteraction(interactionDetails) {
    try {
      // Placeholder for complex learning logic
      // For simplicity, we use a basic feedback mechanism
      // Positive interaction increases openness and extraversion, while negative ones increase neuroticism
      const feedback = interactionDetails.feedbackScore; // Assume interactionDetails contain a feedbackScore indicating positive or negative interaction
      this.adjustTraits(feedback);

      console.log("Kevin learned from interaction, personality traits updated.");
    } catch (error) {
      console.error("Error in learning from interaction:", error);
      console.error(error.stack);
    }
  }

  // Get current personality traits
  getPersonalityTraits() {
    try {
      console.log("Current personality traits retrieved.");
      return this.traits;
    } catch (error) {
      console.error("Error retrieving personality traits:", error);
      console.error(error.stack);
      return {};
    }
  }

  // Reset traits to neutral values
  resetTraits() {
    try {
      Object.keys(this.traits).forEach(trait => {
        this.traits[trait] = 50;
      });
      console.log("Personality traits have been reset to neutral values.");
    } catch (error) {
      console.error("Error resetting personality traits:", error);
      console.error(error.stack);
    }
  }
}

module.exports = PersonalityEngine;