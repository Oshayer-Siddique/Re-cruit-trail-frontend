import React, { useState } from 'react';
import '../styles/Recorder.css';

const Recorder = () => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [audioURL, setAudioURL] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
        }
      });

      recorder.addEventListener('stop', () => {
        const blob = new Blob(recordedChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
      });

      recorder.start();
      setRecording(true);
      setMediaRecorder(recorder);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div className="recorder-container">
      <div className="controls">
        <button onClick={recording ? stopRecording : startRecording} className={`record-button ${recording ? 'recording' : ''}`}>
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>
        {audioURL && <audio src={audioURL} controls />}
      </div>
    </div>
  );
};

export default Recorder;
