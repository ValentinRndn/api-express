/////////////////////////////////////////////
////////Gestion des Personnages//////////////
/////////////////////////////////////////////

const dbInstance = require("../services/db").getInstance();
const Character = require('../back/class/characters.class'); 

/////////////////////Récupération de tous les personnages/////////////////////
exports.getAllCharacters = (req, res) => {
  const id = req.originalUrl.split("/")[2];
  const sql = "SELECT * FROM personnages WHERE id_univers = ?";
  const values = [id];

  dbInstance.db.query(sql, values, (err, rows, fields) => {
    if (err) {
      console.error("Erreur lors de la récupération des personnages :", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des personnages" });
      console.log(sql, values);
    } else {
      res.status(200).json(rows);
      console.log(sql, values);
    }
  });
};

/////////////////////Création d'un personnage dans un univers/////////////////////
//Création d'un personnage dans un univers
exports.createCharacter = async (req, res) => {
  const universId = req.params.id; // Récupérez l'ID de l'univers à partir des paramètres de la requête
  const { nom, id_images, id_univers } = req.body; // Récupérer les données du personnage à partir du corps de la requête

  // Effectuez la requête SQL pour insérer un nouveau personnage dans la table "personnages"
  const characterImg = Character.fromMap(req.body);
  await characterImg.generateCharacterImage();
   insertQuery =
    "INSERT INTO personnages (nom, id_images, id_univers) VALUES (?, ?, ?)";

    dbInstance.db.query(
    insertQuery,
    [nom, id_images, id_univers],
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
exports.updateCharacter = (req, res) => {
  let personnage = Character.fromMap(req.body); //from map
  const idCharacter = req.params.idCharacter; //req.params.id;
  let sql =
    "UPDATE personnages SET nom = ?, id_images = ?, id_univers = ? WHERE id = ?";
  const values = [
    personnage.nom,
    personnage.id_images,
    personnage.id_univers,
    idCharacter,
  ];
  dbInstance.db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion :", err);
      res.status(500).json({ error: "Erreur lors de l'insertion" });
    } else {
      console.log("Enregistrement inséré avec succès !");
      res.status(200).json({ message: "Enregistrement inséré avec succès" });
    }
  });
};

exports.deleteCharacter = (req, res) => {
  const personnagesData = req.body;
  const id = req.params.idCharacter;
  let sql = "DELETE FROM personnages WHERE id = ?";
  const values = [id];
  dbInstance.db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression :", err);
      res.status(500).json({ error: "Erreur lors de la suppression" });
    } else {
      console.log("Enregistrement supprimé avec succès !");
      res.status(200).json({ message: "Enregistrement supprimé avec succès" });
    }
  });
};