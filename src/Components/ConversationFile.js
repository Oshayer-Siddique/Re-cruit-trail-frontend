import React, { useState, useEffect } from 'react';
import '../styles/ConversationFile.css';

const ConversationFile = () => {
  const [conversationData, setConversationData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchConversation = () => {
    setLoading(true);
    fetch('https://re-cruit-trial-backend.onrender.com/conversationfile')
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

  // Handle speaker name change
  const handleSpeakerChange = (index, event) => {
    const oldSpeaker = conversationData[index].speaker;
    const newSpeaker = event.target.value;

    // Create a new array with updated speakers
    const updatedConversation = conversationData.map(message => {
      if (message.speaker === oldSpeaker) {
        return { ...message, speaker: newSpeaker };
      } else {
        return message;
      }
    });

    setConversationData(updatedConversation);
  };

  return (
    <div className="conversation-container">
      <div className='upload-conbtn'>
      <button onClick={fetchConversation} className="load-button">Conversation</button>

      </div>


      {loading && <p>Loading...</p>}
      {conversationData && !loading && (
        <div className="conversation-box1">
          {conversationData.map((message, index) => (
            <div key={index} id={`message-${index}`} className="message">
              <p className="timestamp">{message.timestamp}</p>
              <p className="speaker">
                <input
                  type="text"
                  value={message.speaker}
                  onChange={(event) => handleSpeakerChange(index, event)}
                  className="speaker-input"
                />
                :
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