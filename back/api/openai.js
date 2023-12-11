const open = require("openai");
const Message = require("../class/messages.class");
const dbInstance = require("../../services/db").getInstance();
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

  static async generateResponseForMessage(idUser, idPersonnage) {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT m.contenu, m.isHumain, p.nom FROM `messages` m INNER JOIN personnages p on m.id_personnage=p.id WHERE m.id_utilisateur=? AND m.id_personnage=? ORDER BY m.`date_dernier_message` ASC;";
      const values = [idUser, idPersonnage];
      console.log(sql, values);

      dbInstance.db.query(sql, values, async (err, rows, fields) => {
        if (err) {
          console.error("Erreur lors de la récupération des messages :", err);
          res
            .status(500)
            .json({ error: "Erreur lors de la récupération des messages" });
          return;
        }
        let tabMessage = [];

        for (let row of rows) {
          let prefix = null;
          let i = 0;
          if (i == 0) {
            prefix =
              "Dans le cadre d'un jeu rôle tu prends le rôle de " +
              row.nom +
              " dans le but de faire conversation avec l'utilisateur de l'application.";
            i++;
          }
          let monMessage = Message.fromMap(row);
          var format = {
            role: monMessage.isHumain ? "user" : "assistant",
            content: prefix + monMessage._contenu,
          };
          tabMessage.push(format);
        }
        console.log(tabMessage);

        const openai = new open({
          apiKey: process.env.OPENAI_API_KEY,
        });
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo", 
          messages: tabMessage,
          temperature: 1,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        console.log(response.choices[0].message.content);
        let messageUtilisateur = new Message();
        messageUtilisateur.contenu = response.choices[0].message.content;
        messageUtilisateur.isHumain = false;
        messageUtilisateur._id_personnage = idPersonnage;
        messageUtilisateur.id_utilisateur = idUser;

        resolve(messageUtilisateur);
      }); //query premiere
    }); //promise
  } //function
}

module.exports = ChatOpenAi;
