// modules/voiceEngine.js
// Efficient voice synthesis system for Kevin

const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

class VoiceEngine {
  constructor() {
    this.voiceModel = null;
    this.isInitialized = false;
    this.voiceCache = new Map(); // Cache frequently used phrases
    this.maxCacheSize = 50; // Limit cache to save storage
    
    console.log("Voice Engine initialized");
  }

  // Initialize voice model (choose based on available resources)
  async initialize(voiceConfig = {}) {
    try {
      const { 
        provider = 'elevenlabs', // 'elevenlabs', 'coqui', 'local'
        voiceId = null,
        apiKey = null,
        modelPath = null 
      } = voiceConfig;

      this.provider = provider;
      this.voiceId = voiceId;
      this.apiKey = apiKey;
      this.modelPath = modelPath;

      switch (provider) {
        case 'elevenlabs':
          await this.initializeElevenLabs();
          break;
        case 'coqui':
          await this.initializeCoqui();
          break;
        case 'local':
          await this.initializeLocal();
          break;
        default:
          throw new Error(`Unsupported voice provider: ${provider}`);
      }

      this.isInitialized = true;
      console.log(`Voice Engine initialized with ${provider}`);
    } catch (error) {
      console.error('Error initializing voice engine:', error);
      throw error;
    }
  }

  // Initialize ElevenLabs (cloud-based, minimal storage)
  async initializeElevenLabs() {
    if (!this.apiKey) {
      throw new Error('ElevenLabs API key required');
    }
    
    // Test API connection
    try {
      const response = await axios.get('https://api.elevenlabs.io/v1/voices', {
        headers: { 'xi-api-key': this.apiKey }
      });
      console.log('ElevenLabs connection successful');
    } catch (error) {
      throw new Error('Failed to connect to ElevenLabs API');
    }
  }

  // Initialize Coqui TTS (local, more storage but better privacy)
  async initializeCoqui() {
    // This would initialize Coqui TTS locally
    // For now, we'll simulate the initialization
    console.log('Coqui TTS initialized (simulated)');
  }

  // Initialize local TTS fallback
  async initializeLocal() {
    // Fallback to system TTS if available
    console.log('Local TTS initialized');
  }

  // Generate speech from text
  async generateSpeech(text, options = {}) {
    if (!this.isInitialized) {
      throw new Error('Voice Engine not initialized');
    }

    // Check cache first
    const cacheKey = this.getCacheKey(text, options);
    if (this.voiceCache.has(cacheKey)) {
      console.log('Using cached voice for:', text.substring(0, 50) + '...');
      return this.voiceCache.get(cacheKey);
    }

    let audioBuffer;
    
    try {
      switch (this.provider) {
        case 'elevenlabs':
          audioBuffer = await this.generateElevenLabsSpeech(text, options);
          break;
        case 'coqui':
          audioBuffer = await this.generateCoquiSpeech(text, options);
          break;
        case 'local':
          audioBuffer = await this.generateLocalSpeech(text, options);
          break;
        default:
          throw new Error(`Unsupported provider: ${this.provider}`);
      }

      // Cache the result (with size limit)
      this.cacheAudio(cacheKey, audioBuffer);
      
      return audioBuffer;
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  }

  // Generate speech using ElevenLabs
  async generateElevenLabsSpeech(text, options = {}) {
    const { 
      stability = 0.5, 
      similarity_boost = 0.5,
      style = 0.0,
      use_speaker_boost = true 
    } = options;

    try {
      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${this.voiceId}`,
        {
          text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability,
            similarity_boost,
            style,
            use_speaker_boost
          }
        },
        {
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': this.apiKey
          },
          responseType: 'arraybuffer'
        }
      );

      return Buffer.from(response.data);
    } catch (error) {
      console.error('ElevenLabs API error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Generate speech using Coqui (local)
  async generateCoquiSpeech(text, options = {}) {
    // This would use Coqui TTS locally
    // For now, we'll return a placeholder
    console.log('Generating Coqui speech for:', text.substring(0, 50) + '...');
    return Buffer.from('placeholder_audio_data');
  }

  // Generate speech using local TTS
  async generateLocalSpeech(text, options = {}) {
    // This would use system TTS
    console.log('Generating local speech for:', text.substring(0, 50) + '...');
    return Buffer.from('placeholder_audio_data');
  }

  // Cache management
  getCacheKey(text, options) {
    return `${text}_${JSON.stringify(options)}`;
  }

  cacheAudio(key, audioBuffer) {
    // Implement LRU cache to manage storage
    if (this.voiceCache.size >= this.maxCacheSize) {
      const firstKey = this.voiceCache.keys().next().value;
      this.voiceCache.delete(firstKey);
    }
    
    this.voiceCache.set(key, audioBuffer);
  }

  // Clear cache to free up storage
  clearCache() {
    this.voiceCache.clear();
    console.log('Voice cache cleared');
  }

  // Get cache statistics
  getCacheStats() {
    return {
      size: this.voiceCache.size,
      maxSize: this.maxCacheSize,
      memoryUsage: this.estimateCacheMemoryUsage()
    };
  }

  estimateCacheMemoryUsage() {
    let totalSize = 0;
    for (const buffer of this.voiceCache.values()) {
      totalSize += buffer.length;
    }
    return `${(totalSize / 1024 / 1024).toFixed(2)} MB`;
  }
}

module.exports = VoiceEngine;