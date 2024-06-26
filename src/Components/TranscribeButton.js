import React, { useState } from 'react';
import axios from 'axios';
import '../styles/TranscribeButton.css';


function TranscribeButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');

  // const [transcribedText, setTranscribedText] = useState('Df g byu yu biyb iyb iub g yib hb khbh jbh bl bln jkn kjg in jkb i');

  const handleTranscribe = () => {
    setIsLoading(true);

    axios.post('https://re-cruit-trial-backend.onrender.com/transcribefile', null, {
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
    <div >

      {/* <h2>Transcribe Audio and Get Conversion</h2> */}
      <div className='upld-transcribe-btn'>
      <button onClick={handleTranscribe} disabled={isLoading}>
        {isLoading ? 'Transcribing...' : 'Transcribe'}
      </button>
        
      </div>
      {/* <div className='audo-head-container'>
          
      </div> */}
      {transcribedText && ( // Only render if transcribedText is not empty
        <div className='upld-trans'>
        <div className='text-cont'>
        <textarea
          
          value={transcribedText}
          readOnly
        />

        </div>

      </div>
      )}
    </div>
  );
}

export default TranscribeButton;