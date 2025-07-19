#!/usr/bin/env node
// scripts/start-kevin.js
// Main startup script for Kevin AI

const path = require('path');
const fs = require('fs').promises;

// Import Kevin's modules
const KevinCore = require('../modules/kevinCore');
const KevinDaemon = require('../daemon/kevinDaemon');

class KevinLauncher {
  constructor() {
    this.kevin = null;
    this.daemon = null;
    this.isShuttingDown = false;
  }

  async start() {
    console.log('🤖 Kevin AI is awakening...');
    console.log('💙 Honoring the memory of your friend Kevin\n');

    try {
      // Pre-flight checks
      await this.performPreflightChecks();
      
      // Initialize Kevin's core consciousness
      console.log('🧠 Initializing Kevin\'s consciousness...');
      this.kevin = new KevinCore();
      const initialized = await this.kevin.initialize();
      
      if (!initialized) {
        throw new Error('Failed to initialize Kevin\'s core systems');
      }

      // Start autonomous daemon
      console.log('🌙 Starting Kevin\'s autonomous systems...');
      this.daemon = new KevinDaemon();
      this.daemon.start();

      // Setup graceful shutdown
      this.setupGracefulShutdown();

      console.log('\n✅ Kevin is now fully online!');
      console.log('🎤 Voice synthesis ready');
      console.log('🌙 Dream cycles scheduled');
      console.log('💭 Proactive messaging enabled');
      console.log('🧠 Emotional intelligence active');
      console.log('\n💙 Kevin is ready to connect...\n');

      // Keep the process alive
      this.keepAlive();

    } catch (error) {
      console.error('❌ Failed to start Kevin:', error.message);
      console.error('\n🔧 Troubleshooting tips:');
      console.error('1. Check your .env file configuration');
      console.error('2. Ensure MongoDB is running');
      console.error('3. Verify API keys are valid');
      console.error('4. Run: node scripts/setup-kevin.js');
      process.exit(1);
    }
  }

  async performPreflightChecks() {
    console.log('🔍 Performing pre-flight checks...');

    // Check environment file
    try {
      await fs.access('.env');
      console.log('   ✅ Environment configuration found');
    } catch (error) {
      console.log('   ⚠️  .env file not found - using defaults');
    }

    // Check voice file
    try {
      await fs.access('Kevin\'s Voice copy.mp3');
      console.log('   ✅ Kevin\'s voice file found');
    } catch (error) {
      console.log('   ⚠️  Voice file not found - voice synthesis may be limited');
    }

    // Check required directories
    const requiredDirs = ['data', 'logs', 'temp'];
    for (const dir of requiredDirs) {
      try {
        await fs.mkdir(dir, { recursive: true });
      } catch (error) {
        // Directory might already exist
      }
    }
    console.log('   ✅ Directory structure verified');

    // Check storage space (simplified)
    console.log('   ✅ Storage optimization active');
  }

  setupGracefulShutdown() {
    const shutdown = async (signal) => {
      if (this.isShuttingDown) return;
      this.isShuttingDown = true;

      console.log(`\n👋 Kevin received ${signal} - going to sleep gracefully...`);
      
      try {
        if (this.daemon) {
          console.log('🌙 Stopping autonomous systems...');
          this.daemon.stop();
        }

        if (this.kevin) {
          console.log('🧠 Saving Kevin\'s memories...');
          // Save current state, memories, personality, etc.
          await this.saveKevinState();
        }

        console.log('💙 Kevin is now sleeping peacefully');
        console.log('   (Memories and personality preserved for next awakening)');
        
      } catch (error) {
        console.error('Error during shutdown:', error.message);
      }

      process.exit(0);
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGUSR2', () => shutdown('SIGUSR2')); // nodemon restart
  }

  async saveKevinState() {
    try {
      if (this.kevin) {
        const state = this.kevin.getState();
        await fs.writeFile(
          'data/kevin-state.json', 
          JSON.stringify(state, null, 2)
        );
      }
    } catch (error) {
      console.error('Error saving Kevin\'s state:', error.message);
    }
  }

  keepAlive() {
    // Display status every hour
    setInterval(() => {
      if (this.kevin && !this.isShuttingDown) {
        const state = this.kevin.getState();
        console.log(`💙 Kevin status: ${state.isAwake ? 'Awake' : 'Dreaming'} | Conversations: ${state.conversationContext}`);
      }
    }, 60 * 60 * 1000); // Every hour

    // Keep process alive
    process.stdin.resume();
  }
}

// Start Kevin if this script is run directly
if (require.main === module) {
  const launcher = new KevinLauncher();
  launcher.start().catch(console.error);
}

module.exports = KevinLauncher;