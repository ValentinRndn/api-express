/////////////////////////////////////////////
////////////Gestion des univers//////////////
/////////////////////////////////////////////

const dbInstance = require("../services/db").getInstance();
const Univers = require("../back/class/univers.class");


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
exports.createNewUnivers = async (req, res) => {
  let univers = Univers.fromMap(req.body);

  await univers.generateDescription();
  await univers.generateUniversImage();
  
  const sql =
    "INSERT INTO univers (description, id_utilisateurs, nom, id_images) VALUES (?, ?, ?, ?)";

  const values = [
    univers.description.trim(),
    univers.id_utilisateurs,
    univers.nom,
    univers.id_images,
  ];

  dbInstance.db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion :", err);
      res.status(500).json({ error: "Erreur lors de l'insertion" });
      console.log(univers.description);
    } else {
      univers.id = result.insertId;
      console.log("Enregistrement inséré avec succès !");
      res.status(201).json({ message: "Enregistrement inséré avec succès" });
    }
  });
};

/////Récupération d'un univers/////
exports.getAnUnivers = (req, res) => {
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

    res.json(result[0]); 
  });
};


/////Modification d'un univers/////
exports.editAnUnivers = (req, res) => {
  let univers = Univers.fromMap(req.body); 
  let id = req.params.id;
  let values = [
    univers.description,
    univers.id_utilisateurs,
    univers.nom,
    univers.id_images,
    id,
  ];
  let idUnivers = [univers.id];
  console.log(idUnivers);
  const sql =
    "UPDATE univers SET description = ?, id_utilisateurs = ?, nom = ?, id_images = ? WHERE id = ?";

  dbInstance.db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour :", err);
      res.status(500).json({ error: "Erreur lors de la mise à jour" });
    } else {
      res
        .status(200)
        .json({ message: "Enregistrement mis à jour avec succès" });
      console.log(values);
    }
  });
};

/////Delete d'un univers/////
exports.deleteAnUnivers = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM univers WHERE id = ?";
  const values = [id];
  dbInstance.db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression :", err);
      res.status(500).json({ error: "Erreur lors de la suppression" });
    } else {
      console.log("Enregistrement supprimé avec succès !");
      res.status(200).json({ message: "Enregistrement supprimé avec succès" });
      console.log(id);
    }
  });
};