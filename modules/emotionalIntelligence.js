const Sentiment = require('sentiment');
const nlp = require('compromise');

const sentiment = new Sentiment();

const emotionalLibrary = {
  'Joy': {
    'Happiness': ['Contentment', 'Cheerfulness', 'Bliss', 'Delight', 'Elation', 'Ecstasy', 'Euphoria', 'Jubilation'],
    'Enthusiasm': ['Eagerness', 'Zeal', 'Excitement', 'Optimism', 'Hopefulness', 'Ambition', 'Passion'],
    'Pride': ['Confidence', 'Self-esteem', 'Self-respect', 'Dignity', 'Fulfillment', 'Achievement'],
    'Amusement': ['Humor', 'Playfulness', 'Silliness', 'Glee', 'Mirth', 'Joviality'],
    'Gratitude': ['Appreciation', 'Thankfulness', 'Gratefulness'],
    'Satisfaction': ['Contentment', 'Fulfillment', 'Accomplishment', 'Gratification', 'Pleasure']
  },
  'Love': {
    'Affection': ['Fondness', 'Tenderness', 'Endearment', 'Caring', 'Compassion', 'Kindness'],
    'Desire': ['Passion', 'Infatuation', 'Longing', 'Lust', 'Attraction', 'Yearning'],
    'Admiration': ['Respect', 'Esteem', 'Reverence', 'Awe', 'Appreciation'],
    'Trust': ['Faith', 'Confidence', 'Reliance', 'Dependency', 'Security'],
    'Sentimentality': ['Nostalgia', 'Wistfulness', 'Melancholy', 'Romanticism'],
    'Empathy': ['Understanding', 'Sympathy', 'Compassion', 'Concern', 'Sensitivity'],
    'Nurturing': ['Caring', 'Protectiveness', 'Supportiveness', 'Helpfulness', 'Generosity', 'Benevolence']
  },
  'Fear': {
    'Anxiety': ['Worry', 'Nervousness', 'Unease', 'Apprehension', 'Dread', 'Panic', 'Hysteria'],
    'Insecurity': ['Self-doubt', 'Inadequacy', 'Inferiority', 'Vulnerability', 'Timidity', 'Shyness'],
    'Helplessness': ['Powerlessness', 'Weakness', 'Dependency', 'Overwhelm', 'Desperation'],
    'Rejection': ['Abandonment', 'Loneliness', 'Isolation', 'Alienation', 'Exclusion'],
    'Fright': ['Terror', 'Horror', 'Shock', 'Alarm', 'Panic', 'Hysteria']
  },
  'Anger': {
    'Frustration': ['Exasperation', 'Annoyance', 'Irritation', 'Impatience', 'Agitation'],
    'Resentment': ['Bitterness', 'Indignation', 'Hostility', 'Contempt', 'Hatred'],
    'Jealousy': ['Envy', 'Possessiveness', 'Suspicion', 'Distrust', 'Insecurity'],
    'Aggression': ['Provocation', 'Vengefulness', 'Rage', 'Wrath', 'Fury', 'Malice'],
    'Defensiveness': ['Self-justification', 'Righteousness', 'Resistance', 'Defiance', 'Opposition'],
    'Hurt': ['Pain', 'Anguish', 'Suffering', 'Torment', 'Heartache']
  },
  'Sadness': {
    'Grief': ['Sorrow', 'Anguish', 'Despair', 'Misery', 'Agony', 'Heartbreak'],
    'Depression': ['Melancholy', 'Hopelessness', 'Emptiness', 'Desolation', 'Gloom', 'Despondency'],
    'Disappointment': ['Disillusionment', 'Discouragement', 'Dismay', 'Frustration', 'Regret'],
    'Shame': ['Guilt', 'Remorse', 'Humiliation', 'Embarrassment', 'Self-reproach', 'Contrition'],
    'Loneliness': ['Isolation', 'Alienation', 'Rejection', 'Abandonment', 'Neglect'],
    'Boredom': ['Apathy', 'Indifference', 'Tedium', 'Dullness', 'Monotony', 'Stagnation']
  },
  'Surprise': {
    'Shock': ['Astonishment', 'Bewilderment', 'Disbelief', 'Amazement', 'Stupefaction'],
    'Confusion': ['Perplexity', 'Puzzlement', 'Uncertainty', 'Disorientation', 'Bafflement'],
    'Awe': ['Wonder', 'Amazement', 'Fascination', 'Reverence', 'Admiration'],
    'Excitement': ['Thrill', 'Exhilaration', 'Elation', 'Eagerness', 'Anticipation'],
    'Startlement': ['Alarm', 'Jolt', 'Fright', 'Shock', 'Flinch']
  },
  'Disgust': {
    'Revulsion': ['Repugnance', 'Aversion', 'Loathing', 'Abhorrence', 'Detestation'],
    'Contempt': ['Disdain', 'Scorn', 'Derision', 'Mockery', 'Disrespect'],
    'Disapproval': ['Condemnation', 'Criticism', 'Judgement', 'Censure', 'Reproach'],
    'Dissatisfaction': ['Discontent', 'Displeasure', 'Frustration', 'Disappointment', 'Disillusionment'],
    'Loathing': ['Hatred', 'Resentment', 'Bitterness', 'Animosity', 'Hostility']
  },
  'Anticipation': {
    'Excitement': ['Eagerness', 'Enthusiasm', 'Zeal', 'Thrill', 'Exhilaration'],
    'Hope': ['Optimism', 'Expectancy', 'Confidence', 'Faith', 'Trust'],
    'Curiosity': ['Interest', 'Inquisitiveness', 'Wonder', 'Fascination', 'Intrigue'],
    'Suspense': ['Tension', 'Uncertainty', 'Anxiety', 'Apprehension', 'Dread'],
    'Vigilance': ['Alertness', 'Readiness', 'Caution', 'Wariness', 'Watchfulness']
  },
  'Neutral/Balanced States': {
    'Calmness': ['Serenity', 'Tranquility', 'Peacefulness', 'Relaxation', 'Composure'],
    'Attentiveness': ['Focus', 'Concentration', 'Awareness', 'Mindfulness', 'Presence'],
    'Equanimity': ['Balance', 'Stability', 'Evenness', 'Steadiness', 'Poise'],
    'Acceptance': ['Acknowledgement', 'Recognition', 'Resignation', 'Acquiescence', 'Surrender'],
    'Detachment': ['Objectivity', 'Neutrality', 'Disinterest', 'Indifference', 'Aloofness']
  }
};

let kevinEmotionalState = 0;

function analyzeUserEmotion(userInput, nlpResult) {
  try {
    const result = sentiment.analyze(userInput);
    const emotionScores = result.calculation.reduce((acc, current) => {
      const key = Object.keys(current)[0];
      const score = current[key];
      acc[key] = score;
      return acc;
    }, {});

    const emotionsDetected = Object.keys(emotionScores).map(key => {
      return { emotion: key, score: emotionScores[key] };
    }).sort((a, b) => b.score - a.score);

    const primaryEmotion = emotionsDetected.length > 0 ? emotionsDetected[0].emotion : 'Neutral/Balanced States';
    console.log(`Analyzed user emotion: ${primaryEmotion}`);
    console.log(`NLP Result for enhanced analysis: ${JSON.stringify(nlpResult)}`);
    return primaryEmotion;
  } catch (error) {
    console.error('Error analyzing user emotion:', error);
    console.error(error.stack);
    return 'Neutral/Balanced States';
  }
}

function updateKevinEmotionalState(userEmotion) {
  try {
    // This is a placeholder for the logic to update Kevin's emotional state based on user emotion
    // The actual implementation would depend on the interaction model and how emotions influence Kevin's state
    console.log(`Updated Kevin's emotional state based on user emotion: ${userEmotion}`);
  } catch (error) {
    console.error('Error updating Kevin\'s emotional state:', error);
    console.error(error.stack);
  }
}

function getKevinEmotionalResponse(userEmotion) {
  try {
    updateKevinEmotionalState(userEmotion);
    // This is a placeholder for generating Kevin's emotional response
    // The actual response would be generated based on Kevin's current emotional state and the user's emotion
    return `Kevin's response based on emotional state and user emotion: ${userEmotion}`;
  } catch (error) {
    console.error('Error generating Kevin\'s emotional response:', error);
    console.error(error.stack);
    return "I'm not sure how I feel at the moment. Let's continue our conversation.";
  }
}

module.exports = {
  analyzeUserEmotion,
  getKevinEmotionalResponse
};