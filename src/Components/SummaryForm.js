// src/SummaryForm.js
import React, { useState } from 'react';
import axios from 'axios';

const SummaryForm = () => {
  const [conversation, setConversation] = useState('');
  const [command, setCommand] = useState('');
  const [summary, setSummary] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/customsummary', { conversation, command });
      setSummary(response.data.sentence);
    } catch (error) {
      console.error('Error generating summary:', error);
    }
  };

  return (
    <div>
      <h2>Generate Summary</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="conversation">Conversation:</label>
          <textarea id="conversation" value={conversation} onChange={(e) => setConversation(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="command">Command:</label>
          <input type="text" id="command" value={command} onChange={(e) => setCommand(e.target.value)} required />
        </div>
        <button type="submit">Generate Summary</button>
      </form>
      {summary && (
        <div>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummaryForm;
