const mysql = require("mysql2");

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

  module.exports = db;