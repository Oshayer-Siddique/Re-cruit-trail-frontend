import React, { useState } from 'react';
import axios from 'axios';

function TranscribeButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');

  const handleTranscribe = () => {
    setIsLoading(true);

    axios.post('http://localhost:5000/transcribefile', null, {
      responseType: 'json' // Change responseType to 'json'
    })
    .then(response => {
      setTranscribedText(response.data.transcription); // Access 'transcription' property
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error fetching transcribed text:', error);
      setIsLoading(false);
    });
  };

  return (
    <div>
      <h2>Transcribe Audio and Get Text</h2>
      <button onClick={handleTranscribe} disabled={isLoading}>
        {isLoading ? 'Transcribing...' : 'Transcribe'}
      </button>
      {transcribedText && ( // Only render if transcribedText is not empty
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'auto' }}>
        <textarea
          style={{ width: '100%', height: '100%', border: 'none', resize: 'none' }}
          value={transcribedText}
          readOnly
        />
      </div>
      )}
    </div>
  );
}

export default TranscribeButton;
