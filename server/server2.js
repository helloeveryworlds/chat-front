import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import mic from 'mic';
import { Readable } from 'stream';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { Configuration, OpenAIApi } from 'openai';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
//https://medium.com/codingthesmartway-com-blog/speech-to-text-use-node-js-and-openais-whisper-api-to-record-transcribe-in-one-step-c9a1fd441765
const configuration = new Configuration({
  organization:"org-xIg4mVxK4jMS0OouImNH3B88",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
ffmpeg.setFfmpegPath(ffmpegPath);


// Transcribe audio

  // Helper function to delay the execution
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function transcribeAudio(filename) {
  await delay(3500); // 1000 milliseconds = 1 second

  const transcript = await openai.createTranscription(
    fs.createReadStream(filename),
    "whisper-1"
  );
  return transcript.data.text;
}



// Main function
/*async function main() {
  const audioFilename = "/Users/fuhaoruan/Downloads/recording.wav";
  //await recordAudio(audioFilename);
  const transcription = await transcribeAudio(audioFilename);
  console.log("Transcription:", transcription);
  fs.unlink("/Users/fuhaoruan/Downloads/recording.wav", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File deleted successfully");
    }
  });
}*/
//main();


const app = express();

const port = 8000;
app.use(bodyParser.json());
app.use(cors());
app.post("/whisper", async (req, res) =>{
  
    const audioFilename = "/Users/fuhaoruan/Downloads/recording.wav";
  //await recordAudio(audioFilename);
  const transcription = await transcribeAudio(audioFilename);
  console.log("Transcription:", transcription);
  fs.unlink("/Users/fuhaoruan/Downloads/recording.wav", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File deleted successfully");
    }
  });
  res.send(transcription);
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
