import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../styles/AudioRecorder.css';

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcription, setTranscription] = useState({ message: '', description: '' });
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const mediaRecorder = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = handleDataAvailable;
        mediaRecorder.current.start();
        setIsRecording(true);
      })
      .catch(error => console.error('Error accessing microphone:', error));
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setAudioBlob(event.data);
    }
  };

  const handleUpload = () => {
    if (!audioBlob) {
      alert('Please record audio first.');
      return;
    }

    const formData = new FormData();
    formData.append('audio', audioBlob, 'recorded_audio.wav');

    // Set loading state to true when uploading starts
    setIsLoading(true);

    axios.post('http://localhost:5000/transcribe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response.data);
      setTranscription(response.data);
      // Set loading state to false when transcription is received
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error uploading file: ', error);
      alert('Error uploading file.');
      // Set loading state to false on error
      setIsLoading(false);
    });
  };

  return (
    <div>
      <h2>Audio Recorder</h2>
      {!isRecording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
      {audioBlob && (
        <button onClick={handleUpload}>Transcribe Audio</button>
      )}
      {transcription.message && (
        <div>
          <h3>Audio Transcription</h3>
          {isLoading ? ( // Show loading screen if isLoading is true
            <p>Loading...</p>
          ) : (
            <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
              <p>{transcription.description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;


