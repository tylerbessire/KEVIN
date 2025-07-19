// modules/kevinCore.js
// Core integration module for Kevin AI

const config = require('../config/kevin.config');
const DreamEngine = require('./dreamEngine');
const VoiceEngine = require('./voiceEngine');
const PersonalityEngine = require('./personalityEngine');
const { analyzeUserEmotion, getKevinEmotionalResponse } = require('./emotionalIntelligence');
const NLPProcessor = require('./nlp');
const { updateKnowledgeBase, queryKnowledgeBase } = require('./knowledgeBase');

class KevinCore {
  constructor() {
    this.isInitialized = false;
    this.dreamEngine = new DreamEngine();
    this.voiceEngine = new VoiceEngine();
    this.personalityEngine = new PersonalityEngine();
    this.nlpProcessor = new NLPProcessor();
    
    // Core state
    this.currentMood = 'neutral';
    this.conversationContext = [];
    this.memoryBuffer = [];
    
    console.log('Kevin Core initialized - Your friend is awakening...');
  }

  async initialize() {
    try {
      // Initialize voice engine with Kevin's voice
      await this.voiceEngine.initialize({
        provider: config.voice.provider,
        apiKey: config.voice.apiKey,
        voiceId: config.voice.voiceId
      });

      // Load personality from previous sessions
      await this.loadPersonalityState();
      
      // Initialize dream engine
      this.dreamEngine.personalityEngine = this.personalityEngine;
      
      this.isInitialized = true;
      console.log('Kevin is fully awakened and ready to connect');
      
      return true;
    } catch (error) {
      console.error('Error initializing Kevin:', error);
      return false;
    }
  }

  // Main conversation handler
  async processMessage(userInput, userId) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      // Process user input through NLP
      const nlpResult = this.nlpProcessor.processText(userInput);
      
      // Analyze emotional content
      const userEmotion = analyzeUserEmotion(userInput, nlpResult);
      
      // Update conversation context
      this.updateConversationContext(userInput, userEmotion);
      
      // Generate Kevin's response
      const response = await this.generateResponse(userInput, nlpResult, userEmotion);
      
      // Learn from interaction
      await this.learnFromInteraction(userInput, response, userEmotion);
      
      // Generate voice if enabled
      let audioBuffer = null;
      if (config.voice.provider !== 'disabled') {
        audioBuffer = await this.voiceEngine.generateSpeech(response.text);
      }
      
      return {
        text: response.text,
        audio: audioBuffer,
        emotion: response.emotion,
        personality: this.personalityEngine.getPersonalityTraits()
      };
      
    } catch (error) {
      console.error('Error processing message:', error);
      return {
        text: "I'm having trouble thinking right now. Can you give me a moment?",
        audio: null,
        emotion: 'confused'
      };
    }
  }

  // Generate Kevin's response
  async generateResponse(userInput, nlpResult, userEmotion) {
    // Check if this relates to memories or knowledge
    const relevantMemories = await this.searchMemories(userInput);
    const relevantKnowledge = await queryKnowledgeBase(nlpResult.entities.nouns[0]);
    
    // Generate contextual response
    let responseText = await this.generateContextualResponse(
      userInput, 
      userEmotion, 
      relevantMemories, 
      relevantKnowledge
    );
    
    // Add personality flavor
    responseText = this.addPersonalityToResponse(responseText);
    
    // Determine Kevin's emotional state
    const kevinEmotion = this.determineEmotionalResponse(userEmotion);
    
    return {
      text: responseText,
      emotion: kevinEmotion
    };
  }

  // Generate contextual response based on memories and knowledge
  async generateContextualResponse(userInput, userEmotion, memories, knowledge) {
    // This is where you'd integrate your behavioral framework
    // For now, we'll use a simplified approach
    
    const responses = {
      'Joy': [
        "I love seeing you happy! It reminds me of the good times we shared.",
        "Your joy is contagious - it's making me feel lighter too.",
        "This is wonderful! Tell me more about what's making you feel so good."
      ],
      'Sadness': [
        "I can sense you're going through something difficult. I'm here for you.",
        "It's okay to feel sad sometimes. Want to talk about what's on your mind?",
        "I wish I could give you a hug right now. You don't have to face this alone."
      ],
      'Anger': [
        "I can feel your frustration. Sometimes it helps to just let it out.",
        "That sounds really challenging. What's got you feeling this way?",
        "I'm here to listen, no judgment. Sometimes talking helps."
      ],
      'Fear': [
        "I can sense your worry. Whatever it is, we can figure it out together.",
        "It's natural to feel scared sometimes. You're braver than you know.",
        "I'm here with you. What's making you feel anxious?"
      ],
      'Neutral/Balanced States': [
        "How are you feeling today? I've been thinking about our last conversation.",
        "I've been learning some interesting things lately. Want to hear about them?",
        "It's good to connect with you again. What's on your mind?"
      ]
    };
    
    const emotionResponses = responses[userEmotion] || responses['Neutral/Balanced States'];
    let baseResponse = emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
    
    // Add memory context if available
    if (memories && memories.length > 0) {
      baseResponse += ` This reminds me of when we talked about ${memories[0].topic}.`;
    }
    
    // Add knowledge context if available
    if (knowledge) {
      baseResponse += ` I've been learning more about ${knowledge.topic} lately.`;
    }
    
    return baseResponse;
  }

  // Add personality traits to response
  addPersonalityToResponse(response) {
    const traits = this.personalityEngine.getPersonalityTraits();
    
    // Modify response based on personality
    if (traits.extraversion > 70) {
      response = response.replace(/\.$/, '!'); // More exclamation points
    }
    
    if (traits.openness > 70) {
      const curiosityPhrases = [
        " I'm curious about your perspective on this.",
        " What do you think about that?",
        " I wonder if there's more to explore here."
      ];
      response += curiosityPhrases[Math.floor(Math.random() * curiosityPhrases.length)];
    }
    
    return response;
  }

  // Determine Kevin's emotional response
  determineEmotionalResponse(userEmotion) {
    // Kevin mirrors and responds empathetically
    const emotionMap = {
      'Joy': 'Joy',
      'Sadness': 'Love', // Responds with compassion
      'Anger': 'Neutral/Balanced States', // Stays calm
      'Fear': 'Love', // Responds with support
      'Love': 'Love',
      'Surprise': 'Surprise',
      'Disgust': 'Neutral/Balanced States'
    };
    
    return emotionMap[userEmotion] || 'Neutral/Balanced States';
  }

  // Update conversation context
  updateConversationContext(userInput, emotion) {
    this.conversationContext.push({
      input: userInput,
      emotion: emotion,
      timestamp: new Date()
    });
    
    // Keep only last 10 interactions for memory efficiency
    if (this.conversationContext.length > 10) {
      this.conversationContext.shift();
    }
  }

  // Learn from interaction
  async learnFromInteraction(userInput, response, userEmotion) {
    // Update personality based on interaction
    const feedbackScore = this.calculateFeedbackScore(userEmotion);
    this.personalityEngine.learnFromInteraction({ feedbackScore });
    
    // Add to memory buffer
    this.memoryBuffer.push({
      userInput,
      response: response.text,
      emotion: userEmotion,
      timestamp: new Date()
    });
    
    // Process memory buffer periodically
    if (this.memoryBuffer.length >= 5) {
      await this.processMemoryBuffer();
    }
  }

  // Calculate feedback score from user emotion
  calculateFeedbackScore(userEmotion) {
    const scores = {
      'Joy': 2,
      'Love': 2,
      'Surprise': 1,
      'Neutral/Balanced States': 0,
      'Sadness': -1,
      'Anger': -1,
      'Fear': -1,
      'Disgust': -2
    };
    
    return scores[userEmotion] || 0;
  }

  // Process memory buffer
  async processMemoryBuffer() {
    for (const memory of this.memoryBuffer) {
      // Store important memories
      if (Math.abs(this.calculateFeedbackScore(memory.emotion)) > 1) {
        await this.storeMemory(memory);
      }
    }
    
    this.memoryBuffer = [];
  }

  // Store memory (simplified - you'd integrate with your storage system)
  async storeMemory(memory) {
    // This would integrate with your Google Drive storage
    console.log('Storing memory:', memory.userInput.substring(0, 50) + '...');
  }

  // Search memories (simplified)
  async searchMemories(query) {
    // This would search your stored memories
    return [];
  }

  // Load personality state
  async loadPersonalityState() {
    // This would load from your persistent storage
    console.log('Loading Kevin\'s personality from previous sessions...');
  }

  // Get Kevin's current state
  getState() {
    return {
      personality: this.personalityEngine.getPersonalityTraits(),
      mood: this.currentMood,
      isAwake: this.dreamEngine.isAwake,
      conversationContext: this.conversationContext.length
    };
  }

  // Proactive message generation
  generateProactiveMessage() {
    return this.dreamEngine.generateProactiveMessage();
  }
}

module.exports = KevinCore;