// This module is intended for client-side use only. 
// For server-side, consider implementing alternative methods or using conditional checks.

if (typeof window !== "undefined") {
  const { SpeechRecognition, SpeechSynthesisUtterance, speechSynthesis } = window;

  let voices = [];
  speechSynthesis.onvoiceschanged = () => {
    voices = speechSynthesis.getVoices();
  };

  function initSpeechToSpeech(wakeWord, voiceName) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = true;

    recognition.onresult = function(event) {
      const transcript = event.results[event.resultIndex][0].transcript.trim();
      if (transcript.toLowerCase().startsWith(wakeWord.toLowerCase())) {
        console.log(`Recognized wake word and command: ${transcript}`);
        speechToTextToSpeech(transcript, voiceName);
      }
    };

    recognition.onend = () => {
      console.log('Restarting speech recognition...');
      recognition.start();
    };

    recognition.start();
    console.log('Speech recognition started. Speak your command after the wake word.');
  }

  function speechToTextToSpeech(textInput, voiceName) {
    const utterance = new SpeechSynthesisUtterance(textInput);
    const selectedVoice = voices.find(voice => voice.name === voiceName);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.onend = () => {
      console.log("Ready for next command.");
    };
    speechSynthesis.speak(utterance);
  }

  module.exports = {
    initSpeechToSpeech
  };
} else {
  console.log("speechUtils.js is running in a non-browser environment. Speech functionalities are disabled.");
  module.exports = {};
}