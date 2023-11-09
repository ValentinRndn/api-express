const dbInstance = require("../../services/db").getInstance();
const Univers = require("../class/univers.class");

class universFacade {
  async createUnivers(req) {
    const univers = Univers.fromMap(req.body);

    await univers.generateDescription();
    await univers.generateUniversImage();
    console.log(univers.description);
    const query =
      "INSERT INTO univers (description, id_utilisateurs, nom, id_images, nb_perso) VALUES (?, ?, ?, ?, ?)";
    dbInstance.db.query(
      query,
      [
        univers.description.trim(),
        univers.id_utilisateurs,
        univers.nom,
        univers.id_images,
        univers.nb_perso,
      ],
      (err, result) => {
        if (err) {
          console.error("Erreur lors de l'insertion de l'univers : " + err);
          res.status(500).json({ error: "Erreur serveur" });
          return;
        }

        const universId = result.insertId; // L'ID de l'univers nouvellement créé

        // Vous pouvez renvoyer l'univers nouvellement créé en réponse
        dbInstance.db.query(
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

            res.status(201).json({
              message: "Utilisateur créé avec succès !",
              Créé: univers.toMap(),
            });
          }
        );
      }
    );
  }
}

module.exports = new universFacade();