import fs from "fs";

export default async function handler(req, res) {
    const { Configuration, OpenAIApi } = require("openai");
    require("dotenv").config();
    const apiKey = process.env.OPENAI_API_KEY;
    const configuration = new Configuration({
        apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);

    console.log(req.body);

    // TODO: should convert the mask to url

    const response = await openai.createImageEdit(
        req.body.base64Image,
        fs.createReadStream(req.body.maskStream),
        req.body.prompt,
        1,
        "256x256",
    );
    console.log(response.data.data);
    res.status(200).json({ result: response.data.data });
}
