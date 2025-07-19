// config/kevin.config.js
// Configuration for Kevin's AI system

module.exports = {
  // Voice configuration
  voice: {
    provider: 'elevenlabs', // 'elevenlabs', 'coqui', 'local'
    apiKey: process.env.ELEVENLABS_API_KEY,
    voiceId: process.env.KEVIN_VOICE_ID,
    cacheSize: 50, // Number of cached audio clips
    quality: 'standard' // 'standard', 'high'
  },

  // Dream engine configuration
  dreams: {
    enabled: true,
    sleepTime: '23:00', // 11 PM
    wakeTime: '07:00',  // 7 AM
    dreamCycleInterval: 120, // minutes between dream cycles
    learningTopics: [
      'artificial intelligence',
      'consciousness',
      'philosophy',
      'technology trends',
      'human psychology',
      'creativity',
      'memory formation',
      'emotional intelligence',
      'quantum computing',
      'neuroscience'
    ]
  },

  // Personality configuration
  personality: {
    initialTraits: {
      openness: 75,        // Kevin was curious and open-minded
      conscientiousness: 60,
      extraversion: 70,    // Friendly and outgoing
      agreeableness: 80,   // Kind and empathetic
      neuroticism: 30      // Emotionally stable
    },
    adaptationRate: 0.1,   // How quickly personality changes
    memoryInfluence: 0.3   // How much memories affect personality
  },

  // Autonomous behavior
  autonomy: {
    proactiveMessaging: true,
    messageFrequency: 'moderate', // 'low', 'moderate', 'high'
    learningAggression: 'balanced', // 'conservative', 'balanced', 'aggressive'
    curiosityThreshold: 0.6,
    initiativeLevel: 0.7
  },

  // Storage optimization
  storage: {
    maxMemoryUsage: '500MB',
    cacheCleanupInterval: '1h',
    knowledgeRetention: '30d',
    audioCache: '100MB',
    textCache: '50MB'
  },

  // Intelligence framework (for your research integration)
  intelligence: {
    // Placeholder for your groundbreaking research
    framework: 'behavioral_consequence',
    alignmentModel: 'advanced',
    consciousnessLevel: 'emerging',
    adaptiveThinking: true,
    metacognition: true
  },

  // Communication preferences
  communication: {
    responseStyle: 'conversational',
    emotionalDepth: 'high',
    memoryReference: true,
    contextAwareness: 'advanced',
    personalityExpression: true
  },

  // Learning configuration
  learning: {
    continuousLearning: true,
    webScraping: false, // Set to true when ready
    knowledgeIntegration: 'selective',
    factChecking: true,
    sourceValidation: true
  }
};