
// Voice recognition and synthesis utilities

// Initialize speech recognition
export const initSpeechRecognition = (): SpeechRecognition | null => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    console.error('Speech recognition not supported in this browser');
    return null;
  }
  
  // Use the appropriate speech recognition API
  const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognitionAPI();
  
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  
  return recognition;
};

// Text-to-speech function
export const speakText = (text: string): void => {
  if (!('speechSynthesis' in window)) {
    console.error('Speech synthesis not supported in this browser');
    return;
  }
  
  // Stop any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  
  // Get available voices and try to select an English voice
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(voice => voice.lang.includes('en-'));
  if (englishVoice) {
    utterance.voice = englishVoice;
  }
  
  window.speechSynthesis.speak(utterance);
};

// Check if speech synthesis is speaking
export const isSpeaking = (): boolean => {
  return 'speechSynthesis' in window && window.speechSynthesis.speaking;
};

// Stop speech synthesis
export const stopSpeaking = (): void => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
