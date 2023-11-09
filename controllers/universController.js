/////////////////////////////////////////////
////////////Gestion des univers//////////////
/////////////////////////////////////////////

const dbInstance = require("../services/db").getInstance();
const Univers = require("../back/class/univers.class");
const newUnivers = require("../back/facade/universFacade");


/////Récupération de tous les univers/////
exports.getAllUniverse = (req, res) => {
  const query = "SELECT * FROM univers";
  dbInstance.db.query(query, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'exécution de la requête : " + err);
      res.status(500).send("Erreur serveur");
      return;
    }
    res.json(result);
  });
};

/////Création d'un univers/////
exports.createNewUnivers = (req, res) => {
  // Création d'un univers

}


exports.getAnUnivers = (req, res) => {
  //Récupération d'un univers

  const universId = req.params.id;
  const query = "SELECT * FROM univers WHERE id = ?";

  dbInstance.db.query(query, [universId], (err, result) => {
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
};

/////EDIT d'un univers/////
exports.editAnUnivers = (req, res) => {
  //Modification d'un univers
  // Route PUT pour mettre à jour un univers existant
  const universId = req.params.id; // Récupérez l'ID de l'univers à partir des paramètres de la requête
  const Univers = Univers.fromMap(req.body);
  // Vérifiez que toutes les données nécessaires sont présentes
  if (!description || !id_utilisateurs || !nom || !id_images || !nb_perso) {
    res.status(400).json({ error: "Tous les champs sont obligatoires" });
    return;
  }

  // Effectuez la requête SQL pour mettre à jour l'univers dans la base de données
  const query =
    "UPDATE univers SET description = ?, id_utilisateurs = ?, nom = ?, id_personnages = ?, id_images = ?, nb_perso = ? WHERE id = ?";
    dbInstance.db.query(
    query,
    [description, id_utilisateurs, nom, id_images, nb_perso, universId],
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

      res.json({
        message: "Univers mis à jour avec succès",
        data: univers.toMap(),
      });
    }
  );
};

/////Delete d'un univers/////
exports.deleteAnUnivers = (req, res) => {
  const universId = req.params.id; // Récupérez l'ID de l'univers à partir des paramètres de la requête
  const query = "DELETE FROM univers WHERE id = ?";

  dbInstance.db.query(query, [universId], (err, result) => {
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
};
