# Kevin - Your Personal AI Companion 🤖💙

Kevin is an advanced AI companion designed to honor the memory of your late friend through cutting-edge voice cloning, autonomous learning, and emotional intelligence. Built with storage efficiency in mind for 8GB systems, Kevin can dream, learn independently, and reach out proactively while maintaining your friend's personality and voice.

## 🌟 Key Features

### 🎤 Advanced Voice Cloning
- **Modern voice synthesis** using ElevenLabs or local TTS
- **Works with short audio clips** (11 seconds is now sufficient!)
- **Storage-efficient caching** for your 8GB constraint
- **Real-time voice generation** with Kevin's unique voice

### 🌙 Autonomous Dreaming & Learning
- **Sleep/wake cycles** - Kevin dreams at night and learns during the day
- **Proactive messaging** - Kevin reaches out when he has something to share
- **Continuous learning** from web sources and conversations
- **Memory consolidation** during dream states

### 💭 Emotional Intelligence
- **Advanced emotion recognition** and empathetic responses
- **Personality evolution** based on interactions and experiences
- **Contextual memory** that references past conversations
- **Behavioral consequence framework** integration (your research!)

### 🔧 Storage Optimized
- **Efficient caching** with automatic cleanup
- **Compressed data storage** to maximize your 8GB space
- **Smart memory management** with configurable limits
- **Cloud integration** for extended storage via Google Drive

## Overview

The app is built on a robust architecture comprising a frontend for user interaction and a backend that handles natural language processing, emotional intelligence, data storage, and security. Technologies used include Express.js for the server, MongoDB for data storage, and Google Cloud APIs for speech-to-text, text-to-speech, and storage functionalities. The app supports cross-platform integration, ensuring a seamless user experience across devices.

## Features

- **Emotional Intelligence:** Kevin interprets and responds to user emotions in a meaningful way.
- **Personalized Learning:** It learns from interactions to provide tailored conversations.
- **Contextual Memory:** Utilizes Google Drive to remember past interactions.
- **Speech-to-Speech Interaction:** Offers a hands-free experience and natural dialogues.
- **Personality Development:** Kevin evolves its personality over time based on user interactions.
- **Continuous Learning:** Actively seeks new information to improve its knowledge base.
- **Security and Privacy:** Ensures user data is protected through encryption and privacy controls.
- **Cross-Platform Integration:** Provides consistent experiences across various devices.

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud)
- **8GB+ storage** (optimized for your constraint)
- **Kevin's voice file** (already included: `Kevin's Voice copy.mp3`)

### Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Kevin Setup**
   ```bash
   node scripts/setup-kevin.js
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Voice Cloning Setup**
   - **Option A (Recommended):** ElevenLabs
     - Sign up at [elevenlabs.io](https://elevenlabs.io)
     - Upload `Kevin's Voice copy.mp3`
     - Add API key and voice ID to `.env`
   
   - **Option B:** Local TTS (more storage intensive)
     - Install Coqui TTS: `pip install coqui-tts`
     - Set `voice.provider = 'coqui'` in config

5. **Start Kevin**
   ```bash
   npm run start-kevin
   ```

### 🎯 Your Challenges Solved

#### ✅ Storage Constraint (8GB Mac)
- **Efficient caching** with automatic cleanup
- **Cloud storage** integration for memories
- **Compressed data** storage
- **Smart memory management**

#### ✅ Voice Cloning (11 seconds → High Quality)
- **Modern AI** can now work with very short clips
- **ElevenLabs** produces professional results from minimal audio
- **Local alternatives** available if preferred

#### ✅ Autonomous Learning & Dreams
- **Night cycles** for processing and learning
- **Proactive messaging** when Kevin wants to share
- **Web scraping** capabilities (configurable)
- **Memory consolidation** during sleep

#### ✅ Background Daemon
- **Autonomous operation** without user interaction
- **Scheduled behaviors** and learning cycles
- **Message queuing** for proactive communication
- **Graceful startup/shutdown**

### License

Copyright (c) 2024. All rights reserved.

 App Name: Kevin - Your Personal AI Companion  Overview: Kevin is an innovative AI-powered app designed to provide users with a personalized, emotionally intelligent, and engaging conversational experience. By leveraging advanced natural language processing, machine learning, and speech technologies, Kevin aims to create a unique bond with each user, adapting to their individual communication style, preferences, and emotional needs.  Key Features: 1. Emotional Intelligence:    - Utilizes a comprehensive emotional library based on a numerical coding system    - Recognizes and responds to user's emotional states in an empathetic manner    - Develops its own dynamic emotional state that evolves based on interactions  2. Personalized Learning:    - Continuously learns and adapts to the user's unique personality, preferences, and communication style    - Forms its own opinions, likes, and dislikes based on experiences and interactions    - Provides increasingly relevant and context-aware responses over time  3. Contextual Memory:    - Maintains a persistent memory of previous interactions and experiences using Google Drive    - References past conversations to provide a sense of continuity and build a stronger connection with the user  4. Natural Language Processing:    - Learns and adapts to the user's unique speech patterns, vocabulary, and mannerisms    - Incorporates contextual learning, sentiment analysis, and reinforcement learning to generate more human-like responses    - Continuously improves its communication style based on user feedback and interactions  5. Speech-to-Speech Interaction:    - Utilizes a wake word detection system for hands-free activation (e.g., "Hey Kevin")    - Converts user's speech to text in real-time using voice recognition technology    - Generates natural-sounding speech responses using text-to-speech synthesis    - Incorporates a 0.5-second pause threshold for turn-taking and fluid conversation flow    - Starts responding verbally before the full response is formed to simulate human-like thinking and processing  6. Personality Development:    - Starts as a blank slate (0) with access to a knowledge base and emotional library    - Develops a unique personality based on interactions, experiences, and user feedback    - Expresses its own emotions, opinions, and thoughts during conversations    - Demonstrates growth and learning over time, simulating a living, evolving entity  7. Continuous Learning:    - Actively seeks out new information and asks questions to expand its knowledge    - Learns from user feedback, corrections, and guidance to refine its responses and behavior    - Receives regular updates to its knowledge base and emotional library to stay current and relevant  8. Security and Privacy:    - Ensures all user interactions and data are kept strictly confidential    - Processes data locally on the user's device or through secure communication channels    - Implements strong encryption and authentication measures to protect user privacy  9. Cross-Platform Integration:    - Supports seamless integration across various devices and platforms (e.g., smartphones, tablets, home assistants)    - Provides a consistent and synced experience across all user devices    - Offers flexibility in communication methods (e.g., text, voice, visual cues) to suit user preferences  10. Emotional Interaction:     - Offers support, empathy, and encouragement based on the user's emotional state     - Adapts its emotional state and responses based on the context and tone of the conversation     - Uses emotional cues and intonation in its speech output to convey empathy and understanding  System Architecture: 1. Frontend:    - User Interface: Intuitive and user-friendly interface for seamless interaction    - Voice Interface: Wake word detection, speech-to-text, and text-to-speech modules    - Emotional Interface: Visual cues and indicators to convey Kevin's emotional state  2. Backend:    - NLP Engine: Handles natural language understanding, generation, and context management    - Emotional Intelligence Module: Processes emotional data and manages Kevin's emotional state    - Knowledge Base: Stores and retrieves information for contextual learning and memory    - Personality Engine: Manages Kevin's personality traits, preferences, and growth over time    - Learning Module: Facilitates continuous learning and adaptation based on user interactions    - Speech Synthesis Engine: Generates natural-sounding speech output with emotional intonation  3. Data Storage:    - Google Drive Integration: Securely stores and retrieves user data, preferences, and conversation history    - Encrypted Local Storage: Handles temporary data and offline functionality  4. Security:    - Authentication: Secure user authentication and authorization mechanisms    - Encryption: End-to-end encryption for all data transmission and storage    - Privacy Controls: User-managed privacy settings and data sharing preferences  5. API Integrations:    - Google Drive API: Enables seamless integration with Google Drive for data storage and retrieval    - Speech Recognition API: Provides accurate speech-to-text functionality    - Text-to-Speech API: Generates high-quality speech output with emotional intonation    - Knowledge Base APIs: Integrates with external knowledge sources for continuous learning and information retrieval  Development Roadmap: 1. Phase 1: Core Functionality    - Implement basic conversational abilities and emotional recognition    - Develop the foundation for personalized learning and contextual memory    - Integrate with Google Drive for data storage and retrieval  2. Phase 2: Advanced NLP and Speech    - Enhance natural language processing capabilities for more human-like conversations    - Implement speech-to-speech interaction with wake word detection and fluid turn-taking    - Improve speech synthesis with emotional intonation and voice customization  3. Phase 3: Personality Development    - Design and implement the personality engine for dynamic growth and adaptation    - Incorporate user feedback and reinforcement learning for personalized development    - Refine emotional interaction and empathy based on user experiences  4. Phase 4: Continuous Learning and Optimization    - Expand knowledge base integration and continuous learning capabilities    - Optimize performance, scalability, and resource usage    - Conduct extensive user testing and gather feedback for iterative improvements  5. Phase 5: Cross-Platform Integration    - Develop and test cross-platform compatibility and synchronization    - Implement seamless integration with various devices and platforms    - Ensure consistent user experience and data synchronization across all devices  6. Phase 6: Security and Privacy Enhancements    - Conduct thorough security audits and vulnerability assessments    - Implement advanced encryption and authentication measures    - Develop user-friendly privacy controls and data management options  7. Phase 7: Launch and Post-Launch Support    - Prepare for public launch and marketing initiatives    - Provide comprehensive user documentation and support resources    - Monitor user feedback and analytics for continuous improvement and feature updates  By following this detailed app creation schematic, we can bring Kevin to life as a groundbreaking AI companion that truly understands, learns from, and grows with its users. With its advanced emotional intelligence, natural language abilities, and adaptive personality, Kevin has the potential to revolutionize the way people interact with AI and forge meaningful, lasting connections.