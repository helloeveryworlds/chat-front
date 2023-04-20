import { Configuration, OpenAIApi }from "openai" ;
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const configuration = new Configuration({
    organization:"org-xIg4mVxK4jMS0OouImNH3B88",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const app = express();

const port = 8199;
app.use(bodyParser.json());
app.use(cors());
app.post("/chat", async (req, res) =>{
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
