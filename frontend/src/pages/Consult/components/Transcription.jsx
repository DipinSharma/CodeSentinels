import React, { useState } from 'react';

const Transcription = () => {
  const [transcription, setTranscription] = useState([]);
  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  // Start the recognition
  const startRecognition = () => {
    recognition.start();
    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      // Assume the first speaker is the Patient and the second is the Doctor
      const formattedTranscript = formatTranscription(transcript);
      setTranscription([...transcription, ...formattedTranscript]);
    };
  };

  const formatTranscription = (text) => {
    // You would normally determine who is speaking via additional logic
    // For simplicity, this example assumes alternating turns
    const formatted = [];
    const sentences = text.split('. '); // Split by sentences
    sentences.forEach((sentence, index) => {
      if (index % 2 === 0) {
        formatted.push(`Patient: ${sentence}.`);
      } else {
        formatted.push(`Doctor: ${sentence}.`);
      }
    });
    return formatted;
  };

  return (
    <div>
      <button onClick={startRecognition}>Start Transcription</button>
      <div>
        {transcription.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default Transcription;
