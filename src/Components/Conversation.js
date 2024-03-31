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
    <div className=" pt-4">
      <button disabled={loading} onClick={fetchConversation} className="load-button">{loading ? "Loading..." : "Generate Conversation"}</button>
      {conversationData && !loading && (
        <div className="border p-1 ">
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



