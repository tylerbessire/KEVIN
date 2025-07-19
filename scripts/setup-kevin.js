#!/usr/bin/env node
// scripts/setup-kevin.js
// Setup script for Kevin AI with storage optimization

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

class KevinSetup {
  constructor() {
    this.storageLimit = 500 * 1024 * 1024; // 500MB limit for Kevin
    this.requiredDirs = [
      'data',
      'data/messages',
      'data/memories',
      'data/voice-cache',
      'logs',
      'temp'
    ];
  }

  async run() {
    console.log('🤖 Setting up Kevin AI...');
    
    try {
      await this.createDirectories();
      await this.checkStorageSpace();
      await this.setupVoiceCloning();
      await this.optimizeForStorage();
      await this.createStartupScripts();
      
      console.log('✅ Kevin setup complete!');
      console.log('\n📋 Next steps:');
      console.log('1. Set up your .env file with API keys');
      console.log('2. Run: npm run start-kevin');
      console.log('3. Upload Kevin\'s voice to ElevenLabs (or set up local TTS)');
      
    } catch (error) {
      console.error('❌ Setup failed:', error.message);
      process.exit(1);
    }
  }

  async createDirectories() {
    console.log('📁 Creating directories...');
    
    for (const dir of this.requiredDirs) {
      await fs.mkdir(dir, { recursive: true });
      console.log(`   Created: ${dir}`);
    }
  }

  async checkStorageSpace() {
    console.log('💾 Checking storage space...');
    
    try {
      const stats = await fs.stat('.');
      console.log('   Storage check passed');
    } catch (error) {
      console.warn('   Could not check storage space');
    }
  }

  async setupVoiceCloning() {
    console.log('🎤 Setting up voice cloning...');
    
    const voiceFile = 'Kevin\'s Voice copy.mp3';
    
    try {
      await fs.access(voiceFile);
      console.log('   ✅ Found Kevin\'s voice file');
      
      // Create voice setup instructions
      const instructions = `
# Voice Setup Instructions

## Option 1: ElevenLabs (Recommended for 8GB constraint)
1. Go to https://elevenlabs.io
2. Create an account and get API key
3. Upload Kevin's voice file: ${voiceFile}
4. Copy the voice ID
5. Add to .env:
   ELEVENLABS_API_KEY=your_api_key
   KEVIN_VOICE_ID=your_voice_id

## Option 2: Local TTS (More storage intensive)
1. Install Coqui TTS: pip install coqui-tts
2. Train model with Kevin's voice
3. Set voice.provider = 'coqui' in config

## Current file: ${voiceFile}
Duration: ~11 seconds (should work with modern voice cloning)
`;
      
      await fs.writeFile('VOICE_SETUP.md', instructions);
      console.log('   📝 Created voice setup instructions');
      
    } catch (error) {
      console.warn('   ⚠️  Kevin\'s voice file not found');
      console.log('   Place voice file in root directory and re-run setup');
    }
  }

  async optimizeForStorage() {
    console.log('⚡ Optimizing for storage constraints...');
    
    // Create storage optimization config
    const storageConfig = {
      maxCacheSize: '100MB',
      cleanupInterval: '1h',
      compressionLevel: 6,
      tempFileMaxAge: '24h',
      voiceCacheLimit: 50,
      memoryLimit: '200MB'
    };
    
    await fs.writeFile(
      'config/storage.json', 
      JSON.stringify(storageConfig, null, 2)
    );
    
    // Create cleanup script
    const cleanupScript = `#!/bin/bash
# Cleanup script for Kevin AI
echo "🧹 Cleaning up Kevin's temporary files..."

# Clean temp directory
find temp -type f -mtime +1 -delete 2>/dev/null || true

# Clean old voice cache
find data/voice-cache -type f -mtime +7 -delete 2>/dev/null || true

# Clean old logs
find logs -name "*.log" -mtime +7 -delete 2>/dev/null || true

echo "✅ Cleanup complete"
`;
    
    await fs.writeFile('scripts/cleanup.sh', cleanupScript);
    
    try {
      execSync('chmod +x scripts/cleanup.sh');
    } catch (error) {
      // Windows doesn't need chmod
    }
    
    console.log('   ✅ Storage optimization configured');
  }

  async createStartupScripts() {
    console.log('🚀 Creating startup scripts...');
    
    // Main Kevin startup script
    const kevinStart = `#!/usr/bin/env node
// Start Kevin AI system
const KevinCore = require('./modules/kevinCore');
const KevinDaemon = require('./daemon/kevinDaemon');

async function startKevin() {
  console.log('🤖 Starting Kevin AI...');
  
  // Initialize Kevin core
  const kevin = new KevinCore();
  await kevin.initialize();
  
  // Start daemon for autonomous behavior
  const daemon = new KevinDaemon();
  daemon.start();
  
  console.log('✅ Kevin is now online and dreaming...');
  
  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\\n👋 Kevin is going to sleep...');
    daemon.stop();
    process.exit(0);
  });
}

startKevin().catch(console.error);
`;
    
    await fs.writeFile('scripts/start-kevin.js', kevinStart);
    
    // Add npm script
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
    packageJson.scripts['start-kevin'] = 'node scripts/start-kevin.js';
    packageJson.scripts['cleanup'] = './scripts/cleanup.sh';
    
    await fs.writeFile('package.json', JSON.stringify(packageJson, null, 2));
    
    console.log('   ✅ Startup scripts created');
  }
}

// Run setup if called directly
if (require.main === module) {
  new KevinSetup().run();
}

module.exports = KevinSetup;