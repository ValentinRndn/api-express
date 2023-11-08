const mysql = require("mysql2");

class Database {
  constructor() {
    this.db = mysql.createConnection({
      host: "localhost",
      user: "admin",
      password: "1234",
      database: "fil_rouge",
    });

    this.connect();
  }

  connect() {
    this.db.connect((err) => {
      if (err) {
        console.error("Erreur de connexion à la base de données : " + err);
        return;
      }
      console.log("Connecté à la base de données MySQL");
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }
    return this.instance;
  }
}

module.exports = Database;
