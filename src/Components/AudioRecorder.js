import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../styles/AudioRecorder.css';
import microphone from '../microphone.svg';
import playIcon from '../play.svg'; // Replace with your play icon

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcription, setTranscription] = useState({ message: '', description: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // New state for audio playing status
  const mediaRecorder = useRef(null);
  const audioPlayer = useRef(null);

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

    setIsLoading(true); // Set loading state when uploading starts

    axios.post('http://localhost:5000/transcribe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response.data);
      setTranscription(response.data);
      setIsLoading(false); // Set loading state to false after transcription
    })
    .catch(error => {
      console.error('Error uploading file: ', error);
      alert('Error uploading file.');
      setIsLoading(false); // Set loading state to false on error
    });
  };

  const generateSummary = (format) => {
    setIsLoading(true); // Set loading state when generating summary
    axios.post('http://localhost:5000/summary', { conversation: transcription.description, summaryFormat: format })
      .then(response => {
        console.log(response.data);
        setSummary(response.data.sentence);
        setIsLoading(false); // Set loading state to false after summary is received
      })
      .catch(error => {
        console.error('Error generating summary: ', error);
        alert('Error generating summary.');
        setIsLoading(false); // Set loading state to false on error
      });
  };

  const handleFormatClick = (format) => {
    setSelectedFormat(format);
    generateSummary(format);
  };

  const handlePlayAudio = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioPlayer.current.src = audioUrl;
      audioPlayer.current.play();
      setIsAudioPlaying(true); // Set isAudioPlaying to true when audio starts playing
    }
  };

  const handleAudioEnded = () => {
    setIsAudioPlaying(false); // Set isAudioPlaying to false when audio ends
  };

  return (
    <div>
      <img src={microphone} alt="Microphone" width="24" height="24" style={{ marginRight: '8px' }} />
      <br />
      <br />
      {!isRecording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
      {audioBlob && (
        <>
          <button onClick={handleUpload}>Transcribe Audio</button>
          <img src={playIcon} alt="Play Audio" width="24" height="24" style={{ cursor: 'pointer' }} onClick={handlePlayAudio} />
        </>
      )}
      {transcription.message && !isLoading && (
        <div className="transcription-container">
          <h3>Audio Transcription</h3>
          <div className={`transcription-content ${isAudioPlaying ? 'audio-playing' : ''}`}> {/* Apply different class when audio is playing */}
            <p>{transcription.description}</p>
            {/* <button onClick={copyToClipboard}>Copy</button> Add copy button */}
          </div>
          <h3>Select Summary Format:</h3>
          <div>
            <button onClick={() => handleFormatClick('paragraphs')}>Paragraphs</button>
            <button onClick={() => handleFormatClick('bulletPoints')}>Bullet Points</button>
            <button onClick={() => handleFormatClick('timeline')}>Timeline</button>
          </div>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {summary && (
        <div>
          <h3>Summary</h3>
          <div className="summary-box">
            <pre>{summary}</pre>
          </div>
        </div>
      )}
      <audio ref={audioPlayer} controls onEnded={handleAudioEnded} style={{ display: 'none' }} />
    </div>
  );
}

export default AudioRecorder;
