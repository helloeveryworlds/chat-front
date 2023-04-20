import React, { useState, useEffect } from 'react';

const Microphone = () => {
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    let audioContext;
    let audioInput;
    let analyser;

    const initializeMicrophone = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioInput = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        audioInput.connect(analyser);
        analyser.fftSize = 32;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const updateAudioLevel = () => {
          analyser.getByteFrequencyData(dataArray);
          const level = dataArray.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(level);
          requestAnimationFrame(updateAudioLevel);
        };

        updateAudioLevel();
      } catch (err) {
        console.error('Error initializing microphone:', err);
      }
    };

    initializeMicrophone();

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  return (
    <div>
      <h2>Microphone Audio Level:</h2>
      <div>{audioLevel.toFixed(2)}</div>
    </div>
  );
};

export default Microphone;
