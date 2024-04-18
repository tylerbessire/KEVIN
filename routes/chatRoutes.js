const express = require('express');
const router = express.Router();
const emotionalIntelligence = require('../modules/emotionalIntelligence');
const NLPProcessor = require('../modules/nlp');
const { completion } = require('litellm');
const { getHistoryFileId, saveHistoryToGoogleDrive } = require('../services/googleDriveService');
const PersonalityEngine = require('../modules/personalityEngine');
const kevinPersonality = new PersonalityEngine();
const drive = require('../services/googleDriveService').drive; // Ensure the Google Drive service is correctly referenced

router.post('/messages', async (req, res) => {
  try {
    const userMessage = req.body.message; // Corrected from req.body.speech to req.body.message to match the frontend payload
    const userId = req.session.userId;

    if (!userId) {
      console.error('User ID not found in session');
      return res.status(401).json({ error: 'Unauthorized: User ID not found in session.' });
    }

    // Initialize NLP Processor and process the text
    const nlpProcessor = new NLPProcessor();
    const nlpResult = nlpProcessor.processText(userMessage);

    // Analyze user emotion
    const userEmotion = emotionalIntelligence.analyzeUserEmotion(userMessage, nlpResult);

    // Determine feedback score based on a broader spectrum of emotions
    let feedbackScore = 0;
    switch (userEmotion) {
      case 'Happiness':
      case 'Joy':
      case 'Pride':
      case 'Gratitude':
      case 'Love':
        feedbackScore = 10;
        break;
      case 'Sadness':
      case 'Fear':
      case 'Anger':
      case 'Disgust':
        feedbackScore = -10;
        break;
      case 'Surprise':
      case 'Anticipation':
        feedbackScore = 5; // Neutral or uncertain emotions have a moderate positive feedback
        break;
      default:
        feedbackScore = 0; // Neutral/Balanced States or unrecognized emotions
    }

    // Let Kevin learn from the interaction
    const interactionDetails = {
      feedbackScore: feedbackScore,
    };
    kevinPersonality.learnFromInteraction(interactionDetails);

    // Retrieve interaction history from Google Drive
    const historyFileId = await getHistoryFileId(userId);
    const historyFile = await drive.files.get({ fileId: historyFileId, alt: 'media' });
    const history = historyFile.data.split('\n').filter(line => line.trim() !== '');

    // Save the updated interaction history to Google Drive
    await saveHistoryToGoogleDrive(userId, history.join('\n'));

    // Generate prompt for the OLLaMA API
    const prompt = `User: ${userMessage}\nEmotion: ${userEmotion}\nHistory: ${history.join('\n')}\nAssistant:`;

    // Send request to the OLLaMA API
    const response = await completion({
      model: "openhermes",
      messages: [{ "content": prompt, "role": "user" }],
      api_base: process.env.OLLAMA_API_BASE // Ensure the environment variable OLLAMA_API_BASE is correctly set
    });
    
    const assistantResponse = response.data.response;

    // Append the current interaction to the history
    history.push(`User: ${userMessage}`);
    history.push(`Assistant: ${assistantResponse}`);

    // Save the updated interaction history to Google Drive
    await saveHistoryToGoogleDrive(userId, history.join('\n'));

    res.json({ response: assistantResponse });
  } catch (error) {
    console.error('Error processing user message:', error);
    console.error(error.stack);
    res.status(500).json({ error: 'An error occurred while processing the message.' });
  }
});

module.exports = router;