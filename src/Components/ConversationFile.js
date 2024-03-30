import React, { useState, useEffect } from 'react';
import '../styles/ConversationFile.css';

const ConversationFile = () => {
  const [conversationData, setConversationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [synth, setSynth] = useState(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Initialize speech synthesis
  useEffect(() => {
    const synth = window.speechSynthesis;
    setSynth(synth);
  }, []);

  // Fetch conversation data
  const fetchConversation = () => {
    setLoading(true);
    fetch('http://localhost:5000/conversationfile')
      .then(response => response.json())
      .then(data => {
        setConversationData(data.conversation);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching conversation:', error);
        setLoading(false);
      });
  };

  // // Speak the current message
  // const speakMessage = () => {
  //   if (synth && conversationData && conversationData.length > currentMessageIndex) {
  //     const message = conversationData[currentMessageIndex];
  //     const utterance = new SpeechSynthesisUtterance(message.message);
      
  //     // Highlight the current message
  //     const messageDiv = document.getElementById(`message-${currentMessageIndex}`);
  //     if (messageDiv) {
  //       messageDiv.classList.add('highlight');
  //     }

  //     utterance.onend = () => {
  //       setCurrentMessageIndex(prevIndex => prevIndex + 1);

  //       // Remove highlight after speaking ends
  //       if (messageDiv) {
  //         messageDiv.classList.remove('highlight');
  //       }
  //     };

  //     synth.speak(utterance);
  //   }
  // };

  // // Handle play button click
  // const handlePlayClick = () => {
  //   setCurrentMessageIndex(0);
  //   speakMessage();
  // };

  return (
    <div className="conversation-container">
      <button onClick={fetchConversation} className="load-button">Load Conversation</button>
      {/* <button onClick={handlePlayClick} className="play-button" disabled={!conversationData || loading}>Play</button> */}
      {loading && <p>Loading...</p>}
      {conversationData && !loading && (
        <div className="conversation-box">
          {conversationData.map((message, index) => (
            <div key={index} id={`message-${index}`} className="message">
              <p className="timestamp">{message.timestamp}</p>
              <p className="speaker">
                <strong>{message.speaker}</strong>:
              </p>
              <p className="message-content">{message.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConversationFile;
