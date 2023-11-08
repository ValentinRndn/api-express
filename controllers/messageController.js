/////////////////////////////////////////////
////////Gestion des Messages ////////////////
/////////////////////////////////////////////

const dbInstance = require("../services/db").getInstance();


/////Récupération de l'historique des messages d'une conversation/////
exports.getAllMessage = (req, res) => {
  const conversationId = req.params.conversationId; // Récupérez l'ID de la conversation à partir des paramètres de la requête

  // Récupérez l'historique des messages de la conversation
  const query =
    "SELECT id, isHumain, content, id_personnage, date_dernier_message FROM messages WHERE id = ?";

    dbInstance.db.query(query, [conversationId], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'exécution de la requête : " + err);
      res.status(500).json({ error: "Erreur serveur" });
      return;
    }

    res.json(result);
  });
};

/////Envoie d'un nouveau message / réponse à un message d'une conversation/////
exports.sendMessage = (req, res) => {
  const conversationId = req.params.conversationId; // Récupérez l'ID de la conversation à partir des paramètres de la requête
  const { isHumain, content } = req.body; // Récupérez les données du message à partir du corps de la requête

  // Vérifiez que toutes les données nécessaires sont présentes
  if (isHumain === undefined || content === undefined) {
    res.status(400).json({ error: "Tous les champs sont obligatoires" });
    return;
  }

  // Effectuez la requête SQL pour insérer le nouveau message dans la table "messages"
  const insertQuery =
    "INSERT INTO messages (id, isHumain, content, id_personnage, date_dernier_message) VALUES (?, ?, ?, ?, ?)";
    dbInstance.db.query(insertQuery, [conversationId, isHumain, content], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion du message : " + err);
      res.status(500).json({ error: "Erreur serveur" });
      return;
    }

    res.json({ message: "Message envoyé avec succès" });
  });
};



/////Régénération d'un message/////
exports.regenerateMessage = (req, res) => {
  const conversationId = req.params.conversationId; // Récupérez l'ID de la conversation à partir des paramètres de la requête
  const { nouveauContenu } = req.body; // Récupérez le nouveau contenu du dernier message à partir du corps de la requête

  // Vérifiez que le contenu du nouveau message est présent
  if (nouveauContenu === undefined) {
    res.status(400).json({ error: "Le contenu du message est obligatoire" });
    return;
  }

  // Effectuez la requête SQL pour mettre à jour le dernier message de la conversation
  const updateQuery =
    "UPDATE messages SET content = ? WHERE id_personnage = ? ORDER BY id DESC LIMIT 1";
    dbInstance.db.query(updateQuery, [nouveauContenu, conversationId], (err, result) => {
    if (err) {
      console.error(
        "Erreur lors de la mise à jour du dernier message : " + err
      );
      res.status(500).json({ error: "Erreur serveur" });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Conversation non trouvée" });
      return;
    }

    res.json({ message: "Dernier message régénéré avec succès" });
  });
};
