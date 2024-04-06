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
  const mediaRecorder = useRef(null);
  const audioPlayer = useRef(null);

  // const [isRecording, setIsRecording] = useState(false);
  // const [audioBlob, setAudioBlob] = useState(null);
  // const [transcription, setTranscription] = useState({
  //   message: "This is a test recording",
  //   description: "Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.",
  // });
  // const [isLoading, setIsLoading] = useState(false);
  // const [summary, setSummary] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel quam sit amet sem ultrices vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent ut lobortis turpis. Quisque tortor nulla, hendrerit nec lacus in, mollis bibendum dui. Praesent porttitor quam eu diam bibendum, quis sodales tellus varius. In consectetur vitae sapien a pellentesque. Donec at gravida augue, eget tempor nibh. Vestibulum at gravida tellus, sed cursus sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel quam sit amet sem ultrices vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent ut lobortis turpis. Quisque tortor nulla, hendrerit nec lacus in, mollis bibendum dui. Praesent porttitor quam eu diam bibendum, quis sodales tellus varius. In consectetur vitae sapien a pellentesque. Donec at gravida augue, eget tempor nibh. Vestibulum at gravida tellus, sed cursus sapien.");
  // const [selectedFormat, setSelectedFormat] = useState("paragraphs");
  // const [isAudioPlaying, setIsAudioPlaying] = useState(false); // New state for audio playing status
  // const mediaRecorder = useRef(null);
  // const audioPlayer = useRef(null);

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
        <audio
          ref={audioPlayer}
          controls
          onEnded={handleAudioEnded}
        // style={{ display: "none" }}
        />
      </div>
      {isLoading && <p>Loading...</p>}
      <div className="bipartition-grid">

        <div className="transcription-container">
          <h5>Transcription</h5>
          <div>
            <div className="trans-container">
              {audioBlob && (
                <>
                  <button

                    onClick={handleUpload}
                  >
                    Transcribe Audio
                  </button>
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
            {transcription.message && !isLoading && (<>
              <div
                className={`transcription-content ${isAudioPlaying ? "audio-playing" : ""
                  }`}
              >
                {/* Apply different class when audio is playing */}
                <p className="text-sm">{transcription.description}</p>
                {/* <button onClick={copyToClipboard}>Copy</button> Add copy button */}
              </div>
            </>
            )}
          </div>
        </div>



        <div className="summary-box">
          <h5>Summary</h5>
          {transcription.message && !isLoading && (<>
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
          </>)}
          {summary && (
            <div className="summary-content">
              <pre className="text-sm">{summary}</pre>
            </div>
          )}
        </div>
      </div>

    </div>
  );


}

export default AudioRecorder;
