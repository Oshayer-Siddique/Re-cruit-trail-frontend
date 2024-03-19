import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "../styles/AudioRecorder.css";
export default function AudioRecorder() {
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-USA" });


  const stopListening = () => SpeechRecognition.stopListening();

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();


  if(!browserSupportsSpeechRecognition){
    return null
  }  
  return (
    <div className="container">
      <h2>Speech to text converter</h2>
      <div className="main-container">
        {transcript}
      </div>

      <div className="btn-style">
        <button onClick={startListening}>Start Listening</button>
        <button onClick={stopListening}>Stop Listening</button>
      </div>
    </div>
  );
}
