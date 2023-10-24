const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());

// Configurer la connexion à la base de données
const db = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "1234",
  database: "fil_rouge",
});

// Établir la connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données : " + err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

/////////////////////////////////////////////
////////////Gestion des univers//////////////
/////////////////////////////////////////////

// On récupère l'ensemble des univers
app.get("/univers", (req, res) => {
  const query = "SELECT * FROM univers";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'exécution de la requête : " + err);
      res.status(500).send("Erreur serveur");
      return;
    }
    res.json(result);
  });
});

//Création d'un univers
// Route POST pour créer un nouvel univers
app.post("/univers", (req, res) => {
  // Récupérez les données de l'univers à partir du corps de la requête (assurez-vous d'avoir installé le middleware body-parser)
  const {
    description,
    id_utilisateurs,
    nom,
    id_personnages,
    id_images,
    nb_perso,
  } = req.body;

  // Effectuez la requête SQL pour insérer un nouvel univers dans la base de données
  const query =
    "INSERT INTO univers (description, id_utilisateurs, nom, id_personnages, id_images, nb_perso) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [description, id_utilisateurs, nom, id_personnages, id_images, nb_perso],
    (err, result) => {
      if (err) {
        console.error("Erreur lors de l'insertion de l'univers : " + err);
        res.status(500).json({ error: "Erreur serveur" });
        return;
      }

      const universId = result.insertId; // L'ID de l'univers nouvellement créé

      // Vous pouvez renvoyer l'univers nouvellement créé en réponse
      db.query(
        "SELECT * FROM univers WHERE id = ?",
        [universId],
        (err, rows) => {
          if (err) {
            console.error(
              "Erreur lors de la récupération de l'univers nouvellement créé : " +
                err
            );
            res.status(500).json({ error: "Erreur serveur" });
            return;
          }

          if (rows.length === 0) {
            res.status(404).json({ error: "Univers non trouvé" });
            return;
          }

          res.json(rows[0]); // Renvoie le nouvel univers créé
        }
      );
    }
  );
});

//Récupération d'un univers
app.get("/univers/:id", (req, res) => {
  const universId = req.params.id;
  const query = "SELECT * FROM univers WHERE id = ?";

  db.query(query, [universId], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'exécution de la requête : " + err);
      res.status(500).send("Erreur serveur");
      return;
    }

    if (result.length === 0) {
      res.status(404).send("Univers non trouvé");
      return;
    }

    res.json(result[0]); // Renvoie le premier (et unique) résultat correspondant à l'ID de l'univers
  });
});

//Modification d'un univers
// Route PUT pour mettre à jour un univers existant
app.put("/univers/:id", (req, res) => {
  const universId = req.params.id; // Récupérez l'ID de l'univers à partir des paramètres de la requête
  const {
    description,
    id_utilisateurs,
    nom,
    id_personnages,
    id_images,
    nb_perso,
  } = req.body;

  // Vérifiez que toutes les données nécessaires sont présentes
  if (
    !description ||
    !id_utilisateurs ||
    !nom ||
    !id_personnages ||
    !id_images ||
    !nb_perso
  ) {
    res.status(400).json({ error: "Tous les champs sont obligatoires" });
    return;
  }

  // Effectuez la requête SQL pour mettre à jour l'univers dans la base de données
  const query =
    "UPDATE univers SET description = ?, id_utilisateurs = ?, nom = ?, id_personnages = ?, id_images = ?, nb_perso = ? WHERE id = ?";
  db.query(
    query,
    [
      description,
      id_utilisateurs,
      nom,
      id_personnages,
      id_images,
      nb_perso,
      universId,
    ],
    (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour de l'univers : " + err);
        res.status(500).json({ error: "Erreur serveur" });
        return;
      }

      // Vérifiez si l'univers a été mis à jour avec succès
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Univers non trouvé" });
        return;
      }

      res.json({ message: "Univers mis à jour avec succès" });
    }
  );
});

//Delete d'un univers et ses personnages
// Route DELETE pour supprimer un univers
app.delete("/univers/:id", (req, res) => {
  const universId = req.params.id; // Récupérez l'ID de l'univers à partir des paramètres de la requête
  const query = "DELETE FROM univers WHERE id = ?";

  db.query(query, [universId], (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression de l'univers : " + err);
      res.status(500).json({ error: "Erreur serveur" });
      return;
    }

    // Vérifiez si l'univers a été supprimé avec succès
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Univers non trouvé" });
      return;
    }

    res.json({ message: "Univers supprimé avec succès" });
  });
});

/////////////////////////////////////////////
////////Gestion des Personnages//////////////
/////////////////////////////////////////////

//Récupération de l'ensemble des personnages d'un univers
app.get("/univers/:id/personnages", (req, res) => {
  const universId = req.params.id; // Récupérez l'ID de l'univers à partir des paramètres de la requête
  const query =
    "SELECT p.id, p.nom, p.id_images, p.id_messages FROM personnages p " +
    "INNER JOIN univers up ON up.id = p.id_univers " +
    "WHERE p.id_univers = ?";

  db.query(query, [universId], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'exécution de la requête : " + err);
      res.status(500).json({ error: "Erreur serveur" });
      return;
    }

    res.json(result);
  });
});

//Création d'un personnage dans un univers
// Route POST pour créer un personnage dans un univers
app.post("/univers/:id/personnages", (req, res) => {
  const universId = req.params.id; // Récupérez l'ID de l'univers à partir des paramètres de la requête
  const {nom, id_images, id_messages, id_univers } = req.body; // Récupérez les données du personnage à partir du corps de la requête

  // Effectuez la requête SQL pour insérer un nouveau personnage dans la table "personnages"
  const insertQuery = "INSERT INTO personnages (nom, id_images, id_messages, id_univers) VALUES (?, ?, ?, ?)";
  db.query(insertQuery, [nom, id_images, id_messages, id_univers], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion du personnage : " + err);
      res.status(500).json({ error: "Erreur serveur" });
      return;
    }

    const personnageId = result.insertId; // L'ID du personnage nouvellement créé

    res.json({ message: "Personnage créé avec succès" });
  });
});

//Modification d'un personnage dans un univers
// Route PUT pour mettre à jour un personnage dans un univers
app.put("/univers/:universId/personnages/:personnageId", (req, res) => {
  const universId = req.params.universId; // Récupérez l'ID de l'univers à partir des paramètres de la requête
  const personnageId = req.params.personnageId; // Récupérez l'ID du personnage à partir des paramètres de la requête
  const { nom, id_images, id_messages } = req.body; // Récupérez les données mises à jour du personnage à partir du corps de la requête

  // Vérifiez que toutes les données nécessaires sont présentes
  if (!nom || !id_images || !id_messages) {
    res.status(400).json({ error: "Tous les champs sont obligatoires" });
    return;
  }

  // Vérifiez que le personnage appartient bien à l'univers spécifié
  const checkOwnershipQuery = "SELECT id FROM personnages WHERE id = ? AND id_univers = ?";

  db.query(checkOwnershipQuery, [personnageId, universId], (err, result) => {
    if (err) {
      console.error("Erreur lors de la vérification de l'appartenance du personnage à l'univers : " + err);
      res.status(500).json({ error: "Erreur serveur" });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: "Personnage non trouvé dans cet univers" });
      return;
    }

    // Effectuez la requête SQL pour mettre à jour le personnage dans la base de données
    const updateQuery = "UPDATE personnages SET nom = ?, id_images = ?, id_messages = ? WHERE id = ?";

    db.query(updateQuery, [nom, id_images, id_messages, personnageId], (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour du personnage : " + err);
        res.status(500).json({ error: "Erreur serveur" });
        return;
      }

      res.json({ message: "Personnage mis à jour avec succès" });
    });
  });
});


//Delete  d'un personnage dans un univers
// Route DELETE pour supprimer un personnage d'un univers
app.delete("/univers/:universId/personnages/:personnageId", (req, res) => {
  const universId = req.params.universId; // Récupérez l'ID de l'univers à partir des paramètres de la requête
  const personnageId = req.params.personnageId; // Récupérez l'ID du personnage à partir des paramètres de la requête

  // Vérifiez que le personnage appartient bien à l'univers spécifié
  const checkOwnershipQuery = "SELECT id FROM personnages WHERE id = ? AND id_univers = ?";

  db.query(checkOwnershipQuery, [personnageId, universId], (err, result) => {
    if (err) {
      console.error("Erreur lors de la vérification de l'appartenance du personnage à l'univers : " + err);
      res.status(500).json({ error: "Erreur serveur" });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: "Personnage non trouvé dans cet univers" });
      return;
    }

    // Effectuez la requête SQL pour supprimer le personnage de la base de données
    const deleteQuery = "DELETE FROM personnages WHERE id = ?";

    db.query(deleteQuery, [personnageId], (err, result) => {
      if (err) {
        console.error("Erreur lors de la suppression du personnage : " + err);
        res.status(500).json({ error: "Erreur serveur" });
        return;
      }

      res.json({ message: "Personnage supprimé avec succès" });
    });
  });
});



/////////////////////////////////////////////
////////Gestion des Messages ////////////////
/////////////////////////////////////////////

// Route GET pour récupérer l'historique des messages d'une conversation
app.get("/conversations/:conversationId/messages", (req, res) => {
  const conversationId = req.params.conversationId; // Récupérez l'ID de la conversation à partir des paramètres de la requête

  // Récupérez l'historique des messages de la conversation
  const query = "SELECT id, isHumain, date_dernier_message FROM messages WHERE id = ?";

  db.query(query, [conversationId], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'exécution de la requête : " + err);
      res.status(500).json({ error: "Erreur serveur" });
      return;
    }

    res.json(result);
  });
});


// Route POST pour envoyer un nouveau message ou répondre à un message
app.post("/conversations/:conversationId/messages", (req, res) => {
  const conversationId = req.params.conversationId; // Récupérez l'ID de la conversation à partir des paramètres de la requête
  const { isHumain, contenu } = req.body; // Récupérez les données du message à partir du corps de la requête

  // Vérifiez que toutes les données nécessaires sont présentes
  if (isHumain === undefined || contenu === undefined) {
    res.status(400).json({ error: "Tous les champs sont obligatoires" });
    return;
  }

  // Effectuez la requête SQL pour insérer le nouveau message dans la table "messages"
  const insertQuery = "INSERT INTO messages (id, isHumain, contenu) VALUES (?, ?, ?)";
  db.query(insertQuery, [conversationId, isHumain, contenu], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion du message : " + err);
      res.status(500).json({ error: "Erreur serveur" });
      return;
    }

    res.json({ message: "Message envoyé avec succès" });
  });
});

// Route PUT pour régénérer le dernier message d'une conversation
app.put("/conversations/:conversationId/regenerer-dernier-message", (req, res) => {
  const conversationId = req.params.conversationId; // Récupérez l'ID de la conversation à partir des paramètres de la requête
  const { nouveauContenu } = req.body; // Récupérez le nouveau contenu du dernier message à partir du corps de la requête

  // Vérifiez que le contenu du nouveau message est présent
  if (nouveauContenu === undefined) {
    res.status(400).json({ error: "Le contenu du message est obligatoire" });
    return;
  }

  // Effectuez la requête SQL pour mettre à jour le dernier message de la conversation
  const updateQuery = "UPDATE messages SET contenu = ? WHERE id_conversation = ? ORDER BY id DESC LIMIT 1";
  db.query(updateQuery, [nouveauContenu, conversationId], (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour du dernier message : " + err);
      res.status(500).json({ error: "Erreur serveur" });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Conversation non trouvée" });
      return;
    }

    res.json({ message: "Dernier message régénéré avec succès" });
  });
});




// Démarrer le serveur Express sur un port
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
