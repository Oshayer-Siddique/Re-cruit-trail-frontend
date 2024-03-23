import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import TextForm from './Components/TextForm';
import About from './Components/About';
import Alert from './Components/Alert';
import AudioRecorder from './Components/AudioRecorder';
import VoiceRecorder from './Components/VoiceRecorder';
import GreetingForm from './Components/GreetingForm';
import AudioFileUpload from './Components/AudioFileUpload';
import Conversation from './Components/Conversation';
import ConversationFile from './Components/ConversationFile';
import TranscribeButton from './Components/TranscribeButton';
import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


//let name = "Oshayer"

function App() {

  const [mode, setMode] = useState('dark');

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#0a335c';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }

  }
  return (


    <Router>
      <div>
        <Navbar title="Momentum" about="ABOUT US" mode={mode} togglemode={toggleMode} />
        <Alert />
        <div className="container">
          <Switch>
            {/* <Route path="/about">
              <About />
            </Route> */}

            <Route path="/">
              {/* <AudioRecorder></AudioRecorder> */}
              {/* <VoiceRecorder></VoiceRecorder> */}
              <AudioRecorder></AudioRecorder>

              
              {/* <GreetingForm></GreetingForm> */}
              <Conversation></Conversation>
              <AudioFileUpload></AudioFileUpload>
              <TranscribeButton></TranscribeButton>
              <ConversationFile></ConversationFile>
              
            </Route>
          </Switch>
        </div>
      </div>
    </Router>

 




  );
}



export default App;
