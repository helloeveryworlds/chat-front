import { useState } from "react";

function RecordAudio(props) {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const[transcript, setTranscript] = useState("");
  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(mediaRecorder);

        mediaRecorder.start();

        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          const audioUrl = URL.createObjectURL(audioBlob);
          const link = document.createElement("a");
          link.href = audioUrl;
          link.download = "recording.wav";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });

        setRecording(true);
      })
      .catch((err) => console.error(err));
      
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function getTranscription(data) {
    
     const response = await fetch("http://localhost:8000/whisper", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const transcription = await response.text();
      return transcription;
    } else {
      throw new Error("An error occurred while getting the transcription");
    }
  }
  const stopRecording = async () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      console.log(1);
      const transcription = await getTranscription({ audio: mediaRecorder });
      setTranscript(transcription);
      console.log(transcription);
      props.onTranscriptChange(transcription);
    }
  };
  return (
    <div>
      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
    </div>
  );
}
export default RecordAudio;

