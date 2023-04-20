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
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
ffmpeg.setFfmpegPath(ffmpegPath);

// Record audio
function recordAudio(filename) {
  return new Promise((resolve, reject) => {
    const micInstance = mic({
      rate: "16000",
      channels: "1",
      fileType: "wav",
    });

    const micInputStream = micInstance.getAudioStream();
    const output = fs.createWriteStream(filename);
    const writable = new Readable().wrap(micInputStream);

    console.log("Recording... Press Ctrl+C to stop.");

    writable.pipe(output);

    micInstance.start();

    process.on("SIGINT", () => {
      micInstance.stop();
      console.log("Finished recording");
      resolve();
    });

    micInputStream.on("error", (err) => {
      reject(err);
    });
  });
}

// Transcribe audio
async function transcribeAudio(filename) {
  const transcript = await openai.createTranscription(
    fs.createReadStream(filename),
    "whisper-1"
  );
  return transcript.data.text;
}

// Main function
async function main() {
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
}

main();

/*
const app = express();

const port = 8000;
app.use(bodyParser.json());
app.use(cors());
app.post("/whisper", async (req, res) =>{
  const { inputValue } = req.body;
  console.log(inputValue);
    const completion = await openai.createChatCompletion({
                //{"role": "user", "content":`${message}`},
          //{role:""}
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an Amazon algorithm interviewer." },
          ...inputValue,
        ],
    })
    res.json({
        completion: completion.data.choices[0].message
    })
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
*/