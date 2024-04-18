const mongoose = require('mongoose');
const axios = require('axios');

const knowledgeSchema = new mongoose.Schema({
  topic: String,
  details: String,
  source: String,
  updatedAt: { type: Date, default: Date.now },
});

const Knowledge = mongoose.model('Knowledge', knowledgeSchema);

async function updateKnowledgeBase(topic, details, source) {
  try {
    const existingEntry = await Knowledge.findOne({ topic });
    if (existingEntry) {
      existingEntry.details = details;
      existingEntry.source = source;
      existingEntry.updatedAt = new Date();
      await existingEntry.save();
      console.log(`Knowledge base updated for topic: ${topic}`);
    } else {
      const newEntry = new Knowledge({ topic, details, source });
      await newEntry.save();
      console.log(`New knowledge base entry created for topic: ${topic}`);
    }
  } catch (error) {
    console.error('Error updating the knowledge base:', error.message);
    console.error(error.stack);
  }
}

async function queryKnowledgeBase(topic) {
  try {
    const entry = await Knowledge.findOne({ topic });
    if (entry) {
      console.log(`Knowledge base entry found for topic: ${topic}`);
    } else {
      console.log(`No knowledge base entry found for topic: ${topic}`);
    }
    return entry;
  } catch (error) {
    console.error('Error querying the knowledge base:', error.message);
    console.error(error.stack);
    return null;
  }
}

async function integrateExternalKnowledge(apiUrl, params) {
  try {
    const response = await axios.get(apiUrl, { params });
    if (response.data && response.data.articles) {
      for (const article of response.data.articles) {
        await updateKnowledgeBase(article.title, article.description, article.url);
      }
      console.log(`External knowledge integrated from ${apiUrl}`);
    }
  } catch (error) {
    console.error('Failed to integrate external knowledge:', error.message);
    console.error(error.stack);
  }
}

module.exports = {
  updateKnowledgeBase,
  queryKnowledgeBase,
  integrateExternalKnowledge,
};