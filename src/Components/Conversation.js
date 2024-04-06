// Conversation.js
import React, { useState } from 'react';
import '../styles/AudioRecorder.css';

const Conversation = () => {
  const [conversationData, setConversationData] = useState(null);
  const [loading, setLoading] = useState(false);

  // const [conversationData, setConversationData] = useState([{timestamp:0, speaker: "Lorem", message:"Donec at libero pellentesque, porta quam eu, elementum justo. Donec at convallis nisl, at dignissim justo. Maecenas ultricies in nulla non mattis. Cras fermentum odio nec sem dignissim, ac dapibus velit ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec non porta neque, id ultricies libero. Nulla quis lectus nulla."}, {timestamp:2, speaker: "Ipsum", message:"Donec at libero pellentesque, porta quam eu, elementum justo. Donec at convallis nisl, at dignissim justo. Maecenas ultricies in nulla non mattis. Cras fermentum odio nec sem dignissim, ac dapibus velit ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec non porta neque, id ultricies libero. Nulla quis lectus nulla."},]);
  // const [loading, setLoading] = useState(false);

  const fetchConversation = () => {
    setLoading(true);
    fetch('https://re-cruit-trial-backend.onrender.com/conversation')
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
      <div className='conver-btn-container'>
      <button onClick={fetchConversation} className="load-button">Conversation</button>

      </div>


      {loading && <p>Loading...</p>}
      {conversationData && !loading && (
        <div className="conversation-box">
          <h5>Conversation</h5>
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

export default Conversation;


