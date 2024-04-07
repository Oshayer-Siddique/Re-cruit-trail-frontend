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
import SummaryForm from "./Components/SummaryForm";

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
              <AudioFileUpload/>
              <TranscribeButton/>
              <ConversationFile/>
            </Route>

            <Route path="/">

              <AudioRecorder />

              <Conversation />

              {/* <GreetingForm></GreetingForm> */}

              {/* <SummaryForm /> */}



            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
