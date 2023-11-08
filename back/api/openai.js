const open  = require('openai');
// const db = require("../../services/db");

const openai = new open({
  apiKey: process.env.OPENAI_API_KEY,
});

class ChatOpenAi {
  static async generateDescription(universeName) {
    const reponse = await openai.completions.create({
      model: "text-ada-001",
      prompt:
        "Génère moi une description de l'univers fictif de" + universeName,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
    });
    return reponse.choices[0].text;
  }
}


module.exports = ChatOpenAi;