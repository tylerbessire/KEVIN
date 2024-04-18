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
    recognition.lang = 'en-US'; // The language code can be dynamically set based on user preferences or application settings
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

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.start();
    console.log('Speech recognition started. Speak your command after the wake word.');
  }

  function speechToTextToSpeech(textInput, voiceName) {
    const utterance = new SpeechSynthesisUtterance(textInput);
    const selectedVoice = voices.find(voice => voice.name === voiceName);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      console.warn("Selected voice not found. Using default voice.");
    }
    utterance.onend = () => {
      console.log("Speech synthesis finished. Ready for next command.");
    };
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
    };
    speechSynthesis.speak(utterance);
  }

  window.initSpeechToSpeech = initSpeechToSpeech;
} else {
  console.log("speechUtils.js is running in a non-browser environment. Speech functionalities are disabled.");
}