// Conversation.js
import React, { useState } from 'react';
import '../styles/Conversation.css';

const Conversation = () => {
  const [conversationData, setConversationData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchConversation = () => {
    setLoading(true);
    fetch('http://localhost:5000/conversation')
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

export default Conversation;



const conversationStyles = `
/* Conversation container */
.conversation-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

/* Load Conversation button */
button.load-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button.load-button:hover {
  background-color: #45a049;
}

/* Conversation box */
.conversation-box {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 20px;
  max-height: 400px;
  overflow-y: auto;
  transition: max-height 0.3s ease;
}

/* Message container */
.message {
  background-color: #f9f9f9;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

/* Speaker name */
.speaker {
  margin: 0;
  font-weight: bold;
  color: #333;
  font-size: 18px;
}

/* Message content */
.message-content {
  margin: 10px 0;
  font-size: 16px;
}

/* Timestamp */
.timestamp {
  margin: 0;
  color: #777;
  font-size: 14px;
}`
;
