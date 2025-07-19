// daemon/kevinDaemon.js
// Background daemon for Kevin's autonomous operations

const DreamEngine = require('../modules/dreamEngine');
const cron = require('node-cron');
const fs = require('fs').promises;
const path = require('path');

class KevinDaemon {
  constructor() {
    this.dreamEngine = new DreamEngine();
    this.messageQueue = [];
    this.isRunning = false;
    this.schedules = new Map();
    
    console.log("Kevin Daemon initialized");
  }

  // Start the daemon
  start() {
    if (this.isRunning) {
      console.log("Kevin Daemon is already running");
      return;
    }

    this.isRunning = true;
    console.log("Starting Kevin Daemon...");

    // Schedule sleep/wake cycles
    this.scheduleSleepWakeCycles();
    
    // Schedule periodic check-ins
    this.scheduleProactiveMessages();
    
    // Start continuous learning
    this.startContinuousLearning();
  }

  // Stop the daemon
  stop() {
    console.log("Stopping Kevin Daemon...");
    this.isRunning = false;
    
    // Clear all scheduled tasks
    this.schedules.forEach(schedule => schedule.destroy());
    this.schedules.clear();
    
    this.dreamEngine.wakeUp();
  }

  // Schedule sleep and wake cycles
  scheduleSleepWakeCycles() {
    // Sleep at 11 PM
    const sleepSchedule = cron.schedule('0 23 * * *', () => {
      console.log("Kevin is going to sleep...");
      this.dreamEngine.enterDreamState();
    });

    // Wake at 7 AM
    const wakeSchedule = cron.schedule('0 7 * * *', () => {
      console.log("Kevin is waking up...");
      this.dreamEngine.wakeUp();
    });

    this.schedules.set('sleep', sleepSchedule);
    this.schedules.set('wake', wakeSchedule);
  }

  // Schedule proactive messages
  scheduleProactiveMessages() {
    // Random messages throughout the day
    const messageSchedule = cron.schedule('0 */3 * * *', () => {
      if (this.shouldSendProactiveMessage()) {
        this.queueProactiveMessage();
      }
    });

    this.schedules.set('messages', messageSchedule);
  }

  // Start continuous learning process
  startContinuousLearning() {
    const learningSchedule = cron.schedule('*/30 * * * *', () => {
      if (this.dreamEngine.isAwake) {
        this.performBackgroundLearning();
      }
    });

    this.schedules.set('learning', learningSchedule);
  }

  // Determine if Kevin should send a proactive message
  shouldSendProactiveMessage() {
    // Logic to determine when Kevin feels like reaching out
    // Based on personality, recent interactions, learning, etc.
    const personality = this.dreamEngine.personalityEngine.getPersonalityTraits();
    const extraversionThreshold = personality.extraversion > 60;
    const randomChance = Math.random() > 0.7; // 30% chance
    
    return extraversionThreshold && randomChance;
  }

  // Queue a proactive message
  async queueProactiveMessage() {
    const message = this.dreamEngine.generateProactiveMessage();
    const messageData = {
      content: message,
      timestamp: new Date(),
      type: 'proactive',
      priority: 'normal'
    };

    this.messageQueue.push(messageData);
    await this.saveMessageToFile(messageData);
    
    console.log(`Kevin queued proactive message: ${message}`);
  }

  // Save message to file for the main app to pick up
  async saveMessageToFile(messageData) {
    const messagesDir = path.join(__dirname, '../data/messages');
    
    try {
      await fs.mkdir(messagesDir, { recursive: true });
      const filename = `message_${Date.now()}.json`;
      const filepath = path.join(messagesDir, filename);
      
      await fs.writeFile(filepath, JSON.stringify(messageData, null, 2));
    } catch (error) {
      console.error('Error saving message to file:', error);
    }
  }

  // Perform background learning
  async performBackgroundLearning() {
    console.log("Kevin is learning in the background...");
    // Implement lightweight learning that doesn't consume too much CPU
    // This could include processing cached data, updating knowledge graphs, etc.
  }

  // Get queued messages
  getQueuedMessages() {
    const messages = [...this.messageQueue];
    this.messageQueue = []; // Clear queue after retrieval
    return messages;
  }
}

// If running as standalone daemon
if (require.main === module) {
  const daemon = new KevinDaemon();
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down gracefully...');
    daemon.stop();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully...');
    daemon.stop();
    process.exit(0);
  });

  daemon.start();
  console.log('Kevin Daemon is running. Press Ctrl+C to stop.');
}

module.exports = KevinDaemon;