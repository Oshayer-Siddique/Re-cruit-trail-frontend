import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import TextForm from "./Components/TextForm";
import About from "./Components/About";
import Alert from "./Components/Alert";
import AudioRecorder from "./Components/AudioRecorder";
import VoiceRecorder from "./Components/VoiceRecorder";
import GreetingForm from "./Components/GreetingForm";
import AudioFileUpload from "./Components/AudioFileUpload";
import Conversation from "./Components/Conversation";
import ConversationFile from "./Components/ConversationFile";
import TranscribeButton from "./Components/TranscribeButton";
import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//let name = "Oshayer"

function App() {
  const [mode, setMode] = useState("dark");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      //document.body.style.backgroundColor = '#0c2d57';
      document.body.style.backgroundImage = 'url("./bg.jpg")';
      document.body.style.backgroundSize = "cover";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "#fffffff";
      document.body.style.backgroundImage = 'url("./bg.jpg")';
      document.body.style.backgroundSize = "cover";
    }
  };
  return (
    <Router>
      <div>
        <Navbar mode={mode} togglemode={toggleMode} />

        <div className="container">
          <Switch>
            <Route path="/upload">
              <div class="rectangle2"></div>
              <div class="rectangle4"></div>

              

              <AudioFileUpload></AudioFileUpload>
              <TranscribeButton></TranscribeButton>
              <ConversationFile></ConversationFile>
            </Route>

            <Route path="/">
              <div class="rectangle">
                <h5>Audio Transcription</h5>
              </div>

              <div className="rectangle1">
                <h5>Summary</h5>
              </div>

              <div className="rectangle3">
                <h5>Conversation</h5>
              </div>

              <AudioRecorder></AudioRecorder>

              <Conversation></Conversation>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;