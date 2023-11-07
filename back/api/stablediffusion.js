const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });
const db = require("../../services/db");

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

    //INSERTION DE L'IMAGE EN BASE
    insertQuery = "INSERT INTO images (url) VALUES (?)";

    db.query(insertQuery, [outputName], (err, result) => {
      if (err) {
        console.error("Erreur lors de l'insertion de l'image : " + err);
        res.status(500).json({ error: "Erreur serveur" });
        return;
      }

      const imageId = result.insertId; // L'ID de l'image nouvellement créée

     console.log("Image créée avec succès");
    });
  } catch (error) {
    console.error("Impossible de sauvegarder l'image:", error);
  }
}

module.exports = { generateImage };
