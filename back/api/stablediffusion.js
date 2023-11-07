const fs = require("fs");
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

let stableDiffusionUrl = "https://clipdrop-api.co/text-to-image/v1";

async function generateImage(prompt) {
  let formData = new FormData();
  formData.append("prompt", prompt);

  let requestOptions = {
    method: "POST",
    headers: {
      "x-api-key": process.env.CLIPDROP_API_KEY,
    },
    body: formData,
    redirect: "follow",
  };

  try {
    const response = await fetch(stableDiffusionUrl, requestOptions);
    const buffer = await response.arrayBuffer();

    let outputName = Math.random().toString(36).substring(2) + ".png";
    const outputDir = "./generatedImages";

    // Vérifiez si le dossier existe, sinon, créez-le
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    fs.writeFileSync(outputDir + "/" + outputName, Buffer.from(buffer));
    console.log("Saved output to " + outputDir + "/" + outputName);
  } catch (error) {
    console.error("Error generating or saving image:", error);
  }
}

module.exports = { generateImage };
