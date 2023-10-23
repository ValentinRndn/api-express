const express = require("express");
const mysql = require("mysql2");

const app = express();

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

//Récupération d'un univers
app.get("/univers/:id", (req, res) => {
  db.query(
    "SELECT * FROM univers WHERE id=id",
    [req.params.id],
    (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

//Modification d'un univers

//Delete d'un univers et ses personnages

/////////////////////////////////////////////
////////Gestion des Personnages//////////////
/////////////////////////////////////////////

//Récupération de l'ensemble des personnages d'un univers
app.get("/univers/id/personnages", (req, res) => {
  const query = "SELECT * FROM personnages WHERE id=id";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'exécution de la requête : " + err);
      res.status(500).send("Erreur serveur");
      return;
    }
    res.json(result);
  });
});

//Création d'un personnage dans un univers

// Démarrer le serveur Express sur un port
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
