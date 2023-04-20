import React, { useState } from 'react';
import styles from '../style/Mock.module.css';
import ReactQuill from 'react-quill';
import { Spin } from "antd";
import Audio from './Audio';
import 'react-quill/dist/quill.snow.css'; // Import the styles
//https://www.youtube.com/watch?v=LX_DXLlaymg
const TextFields = () => {
  const [inputValue, setInputValue] = useState([{ role: 'user', content: '' }]);
  const [outputValue, setOutputValue] = useState([
    { role: 'assistant', content: 'Hello, I am an Amazon interviewer. How can I help you today?' },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [useAudio, setUseAudio] = useState(false);
  const [transcript, setTranscript] = useState('');

  // I want to add a button to switch between text and audio and after I click button again, it will stop
  // record and save the audio on local and send the audio to the server
  const handleInputChange = (newInputContent) => {

    const newMessage = {
      role: 'user',
      content: newInputContent,
    };

    setInputValue((prevInputValue) => [...prevInputValue, newMessage]);
  };
  const handleTranscript = (transcription) => {
    console.log(transcription);
    handleInputChange(transcription);
  };
  const handleSubmit = async () => {
    //console.log("Yeah");
    setIsLoading(false);
    fetch('http://localhost:8199/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputValue }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(true);
        const newMessage = { role: 'assistant', content: `${data.completion.content}` };
        setOutputValue((prevOutputValue) => [...prevOutputValue, newMessage]);
      });
  };

  // Function to display messages in the textarea
  const displayMessages = () => {
    return outputValue.map((msg) => `[${msg.role}] ${msg.content}`).join('\n');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.scientificHeading} id="displayTextTitle">Display Text</h2>
      <textarea
        value={displayMessages()}
        readOnly
        className={styles.outputTextArea}
      ></textarea>
      <h2 className={styles.scientificHeading} id="userInputTitle">User Input</h2>
      <div>
          {isLoading ? (
            <div></div>
          ) : (
            <Spin tip="Loading..." size="large" />
          )}
        </div>

        <div>{useAudio? (<div>Audio</div>):(<div></div>)}</div>
        <div className={styles.inputTextArea}>
          <ReactQuill value={inputValue[inputValue.length - 1].content} onChange={handleInputChange} />
        </div>
      <br />
      <div className={styles.buttonWrapper}>
        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit
        </button>
        <Audio onTranscriptChange={handleTranscript} />      
        </div>
    </div>
  );
};

export default TextFields;

