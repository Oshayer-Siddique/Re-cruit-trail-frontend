import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AudioFileUpload.css'

function AudioFileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }
  
    // Rename the file with a specific name
    const renamedFile = new File([file], 'uploaded_file.mp3', {
      type: file.type,
    });
  
    const formData = new FormData();
    formData.append('file', renamedFile);
  
    axios
      .post('https://re-cruit-trial-backend.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
        alert('File uploaded successfully.');
      })
      .catch((error) => {
        console.error('Error uploading file: ', error);
        alert('Error uploading file.');
      });
  };

  return (
    <div className='audio-upld-container'>
      <input type="file" accept="audio/*" onChange={handleFileChange} className="centered-input" />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default AudioFileUpload;