/////////////////////////////////////////////
////////Gestion des Personnages//////////////
/////////////////////////////////////////////

const db = require("../services/db");
const Character = require('../back/class/personnages.class'); 

/////////////////////Récupération de tous les personnages/////////////////////
exports.getAllCharacters = (req, res) => {
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
};

/////////////////////Création d'un personnage dans un univers/////////////////////
//Création d'un personnage dans un univers
exports.createCharacter = async (req, res) => {
  const universId = req.params.id; // Récupérez l'ID de l'univers à partir des paramètres de la requête
  const { nom, id_images, id_messages, id_univers } = req.body; // Récupérer les données du personnage à partir du corps de la requête

  // Effectuez la requête SQL pour insérer un nouveau personnage dans la table "personnages"
  const characterImg = Character.fromMap(req.body);
  await characterImg.generateCharacterImage();
   insertQuery =
    "INSERT INTO personnages (nom, id_images, id_messages, id_univers) VALUES (?, ?, ?, ?)";

    db.query(
    insertQuery,
    [nom, id_images, id_messages, id_univers],
    (err, result) => {
      if (err) {
        console.error("Erreur lors de l'insertion du personnage : " + err);
        res.status(500).json({ error: "Erreur serveur" });
        return;
      }

      const personnageId = result.insertId; // L'ID du personnage nouvellement créé

      res.json({ message: "Personnage créé avec succès" });
    }
  );
};


/////////////////////Modification d'un personnage dans un univers/////////////////////
//Modification d'un personnage dans un univers
exports.editCharacter = (req, res) => {
  const universId = req.params.universId; // Récupérez l'ID de l'univers à partir des paramètres de la requête
  const personnageId = req.params.personnageId; // Récupérez l'ID du personnage à partir des paramètres de la requête
  const { nom, id_images, id_messages } = req.body; // Récupérez les données mises à jour du personnage à partir du corps de la requête

  // Vérifiez que toutes les données nécessaires sont présentes
  if (!nom || !id_images || !id_messages) {
    res.status(400).json({ error: "Tous les champs sont obligatoires" });
    return;
  }

  // Vérifiez que le personnage appartient bien à l'univers spécifié
  const checkOwnershipQuery =
    "SELECT id FROM personnages WHERE id = ? AND id_univers = ?";

  db.query(checkOwnershipQuery, [personnageId, universId], (err, result) => {
    if (err) {
      console.error(
        "Erreur lors de la vérification de l'appartenance du personnage à l'univers : " +
          err
      );
      res.status(500).json({ error: "Erreur serveur" });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: "Personnage non trouvé dans cet univers" });
      return;
    }

    // Effectuez la requête SQL pour mettre à jour le personnage dans la base de données
    const updateQuery =
      "UPDATE personnages SET nom = ?, id_images = ?, id_messages = ? WHERE id = ?";

    db.query(
      updateQuery,
      [nom, id_images, id_messages, personnageId],
      (err, result) => {
        if (err) {
          console.error("Erreur lors de la mise à jour du personnage : " + err);
          res.status(500).json({ error: "Erreur serveur" });
          return;
        }

        res.json({ message: "Personnage mis à jour avec succès" });
      }
    );
  });
};


/////////////////////Delete d'un personnage dans un univers/////////////////////
exports.deleteCharacter = (req, res) => {
  const universId = req.params.universId; // Récupérez l'ID de l'univers à partir des paramètres de la requête
  const personnageId = req.params.personnageId; // Récupérez l'ID du personnage à partir des paramètres de la requête

  // Vérifiez que le personnage appartient bien à l'univers spécifié
  const checkOwnershipQuery =
    "SELECT id FROM personnages WHERE id = ? AND id_univers = ?";

  db.query(checkOwnershipQuery, [personnageId, universId], (err, result) => {
    if (err) {
      console.error(
        "Erreur lors de la vérification de l'appartenance du personnage à l'univers : " +
          err
      );
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
};
