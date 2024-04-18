const natural = require('natural');
const compromise = require('compromise');

class NLPProcessor {
  constructor() {
    this.tokenizer = new natural.WordTokenizer();
    this.sentimentAnalyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
    this.nounInflector = new natural.NounInflector();
    console.log("NLP Processor initialized.");
  }

  tokenizeText(text) {
    if (typeof text !== 'string') {
      throw new Error('Text must be a string');
    }
    try {
      return this.tokenizer.tokenize(text);
    } catch (error) {
      console.error("Error tokenizing text:", error.message);
      console.error(error.stack);
      throw error;
    }
  }

  findSentiment(text) {
    if (typeof text !== 'string') {
      throw new Error('Text must be a string');
    }
    try {
      return this.sentimentAnalyzer.getSentiment(this.tokenizeText(text));
    } catch (error) {
      console.error("Error finding sentiment:", error.message);
      console.error(error.stack);
      throw error;
    }
  }

  extractEntities(text) {
    if (typeof text !== 'string') {
      throw new Error('Text must be a string');
    }
    try {
      let doc = compromise(text);
      return {
        nouns: doc.nouns().out('array'),
        verbs: doc.verbs().out('array'),
        people: doc.people().out('array'),
        places: doc.places().out('array'),
        // Removed dates extraction due to compromise library limitations
      };
    } catch (error) {
      console.error("Error extracting entities:", error.message);
      console.error(error.stack);
      throw error;
    }
  }

  processText(text) {
    if (typeof text !== 'string') {
      throw new Error('Text must be a string');
    }
    try {
      const sentiment = this.findSentiment(text);
      const entities = this.extractEntities(text);
      console.log(`Processed text with sentiment: ${sentiment}, entities: ${JSON.stringify(entities)}`);
      // This function should be expanded to return more detailed analysis based on project requirements
      return { sentiment, entities };
    } catch (error) {
      console.error("Error processing text:", error.message);
      console.error(error.stack);
      throw error;
    }
  }
}

module.exports = NLPProcessor;