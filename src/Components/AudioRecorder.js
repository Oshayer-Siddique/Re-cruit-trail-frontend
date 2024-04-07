import React, { useState, useRef } from "react";
import axios from "axios";
import "../styles/AudioRecorder.css";
import microphone from "../microphone.svg";
import playIcon from "../play.svg"; // Replace with your play icon

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcription, setTranscription] = useState({
    message: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // New state for audio playing status
  const [command, setCommand] = useState(""); // State for command input
  const [commandOutput, setCommandOutput] = useState(""); // State for command output
  const mediaRecorder = useRef(null);
  const audioPlayer = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = handleDataAvailable;
        mediaRecorder.current.start();
        setIsRecording(true);
      })
      .catch((error) => console.error("Error accessing microphone:", error));
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
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
      alert("Please record audio first.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioBlob, "recorded_audio.wav");

    setIsLoading(true); // Set loading state when uploading starts

    axios
      .post("http://localhost:5000/transcribe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setTranscription(response.data);
        setIsLoading(false); // Set loading state to false after transcription
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
        alert("Error uploading file.");
        setIsLoading(false); // Set loading state to false on error
      });
  };

  const generateSummary = (format) => {
    setIsLoading(true); // Set loading state when generating summary
    axios
      .post("http://localhost:5000/summary", {
        conversation: transcription.description,
        summaryFormat: format,
      })
      .then((response) => {
        console.log(response.data);
        setSummary(response.data.sentence);
        setIsLoading(false); // Set loading state to false after summary is received
      })
      .catch((error) => {
        console.error("Error generating summary: ", error);
        alert("Error generating summary.");
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

  const handleCommandSubmit = () => {
    // Send conversation and command to backend
    axios
      .post("http://localhost:5000/customsummary", {
        conversation: transcription.description,
        command: command,
      })
      .then((response) => {
        console.log(response.data.sentence);
        setCommandOutput(response.data.sentence); // Set the command output in state
      })
      .catch((error) => {
        console.error("Error sending command: ", error);
        alert("Error sending command.");
      });
  };

  return (
    <div>
      <div className="recorder-container">
        {!isRecording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        <audio ref={audioPlayer} controls onEnded={handleAudioEnded} />
      </div>
      {isLoading && <p>Loading...</p>}
      <div className="bipartition-grid">
        <div className="transcription-container">
          <h5>Transcription</h5>
          <div>
            <div className="trans-container">
              {audioBlob && (
                <>
                  <button onClick={handleUpload}>Transcribe Audio</button>
                  <img
                    src={playIcon}
                    alt="Play Audio"
                    width="24"
                    height="24"
                    className="cursor-pointer"
                    onClick={handlePlayAudio}
                  />
                </>
              )}
            </div>
            {transcription.message && !isLoading && (
              <>
                <div
                  className={`transcription-content ${
                    isAudioPlaying ? "audio-playing" : ""
                  }`}
                >
                  <p className="text-sm">{transcription.description}</p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="summary-box">
          <h5>Summary</h5>
          {transcription.message && !isLoading && (
            <>
              <h6>Select Summary Format:</h6>
              <div className="menu-bar">
                <button onClick={() => handleFormatClick("paragraphs")}>
                  Paragraphs
                </button>
                <button onClick={() => handleFormatClick("bulletPoints")}>
                  Bullet Points
                </button>
                <button onClick={() => handleFormatClick("timeline")}>
                  Timeline
                </button>
              </div>
            </>
          )}
          {summary && (
            <div className="summary-content">
              <pre className="text-sm">{summary}</pre>
            </div>
          )}
        </div>
        {/* Input field for the command */}
        <div className="command-container">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Enter your command"
            
            
          />
          <button onClick={handleCommandSubmit}>Command</button>
        </div>
        {/* Display the command output */}
        {commandOutput && (
          <div className="command-output">
            <h5>Command Output</h5>
            <p>{commandOutput}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AudioRecorder;
