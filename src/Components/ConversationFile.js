import React, { useState } from 'react';
import '../styles/ConversationFile.css'; // Import the renamed CSS file

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

  return (
    <div className="conversation-container">
      <button onClick={fetchConversation} className="load-button">Conversation</button>
      {loading && <p>Loading...</p>}
      {conversationData && !loading && (
        <div className="conversation-box">
          {conversationData.map((message, index) => (
            <div key={index} className="message">
              <p className="speaker"><strong>{message.speaker}</strong>:</p>
              <p className="message-content">{message.message}</p>
              <p className="timestamp">Timestamp: {message.timestamp}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConversationFile; // Export with the new component name
