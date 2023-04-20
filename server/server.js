import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import { Configuration, OpenAIApi }from "openai" ;

const configuration = new Configuration({
  organization:"org-xIg4mVxK4jMS0OouImNH3B88",
apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(bodyParser.json());
app.use(cors())
// Set up the ChatGPT endpoint
app.post("/chat", async (req, res) => {
  // Get the prompt from the request
  const { prompt } = req.body;
  const maxTokens = 200;
  // Generate a response with ChatGPT
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt,
    max_tokens: maxTokens,
  });
  res.send(completion.data.choices[0].text);
});
// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});