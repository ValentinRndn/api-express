const mysql = require("mysql2");
const bodyParser = require("body-parser");
const port = 3000;
// const router= express.Router();
const dbInstance = require("../services/db").getInstance();

const Message = require("../back/class/messages.class");

const env = require("dotenv").config();
const jwt = require("jsonwebtoken");
const Chatopenai = require("../back/api/openai");

//////////////////////////////////////////////
//////////////MESSAGES////////////////////////
//////////////////////////////////////////////

//récupération message user
exports.getMessage = (req, res) => {
  const idMessage = req.originalUrl.split("/")[2];
  const sql = `SELECT m.contenu FROM messages m JOIN utilisateurs u on m.id_utilisateur=u.id WHERE u.id = ?;`;
  const values = [idMessage];


  dbInstance.db.query(sql, values, (err, rows, fields) => {
    if (err) {
      console.error("Erreur lors de la récupération des messages :", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des messages" });
    }
    res.status(200).json(rows);
  });
};

exports.sendMessage = async (req, res) => {
  let message = Message.fromMap(req.body);
  const secretkey = process.env.TOKEN_KEY ;
  var tokenBearer = req.headers.authorization;
  var token = tokenBearer.split(" ")[1]; // on récupère le token sans le bearer
  var decoded = jwt.verify(token, secretkey); // on décode le token
  var idUser = decoded.id;
  var isHumain = true;

  const sql =
    "INSERT INTO messages (isHumain, date_dernier_message, contenu, id_utilisateur, id_personnage) VALUES (?, NOW(), ?, ?, ?)";
  const values = [isHumain, message.contenu, idUser, message._id_personnage];

  try {
    // First database insert
    const firstInsertResult = await new Promise((resolve, reject) => {
      dbInstance.db.query(sql, values, (err, result) => {
        if (err) {
          console.error("Erreur lors de l'insertion :", err);
          reject(err);
        } else {
          console.log("Enregistrement inséré avec succès !");
          resolve(result);
        }
      });
    });

    // Generate response and perform the second database insert
    let idPersonnage = message._id_personnage;
    var reponse = await Chatopenai.generateResponseForMessage(
      idUser,
      idPersonnage
    );
    console.log(reponse);

    const sql2 =
      "INSERT INTO messages (isHumain, date_dernier_message, contenu, id_utilisateur, id_personnage) VALUES (?, NOW(), ?, ?, ?)";
    const valuesMessage = [
      reponse.isHumain,
      reponse.contenu,
      reponse.id_utilisateur,
      reponse._id_personnage,
    ];

    const secondInsertResult = await new Promise((resolve, reject) => {
      dbInstance.db.query(sql2, valuesMessage, (err, result) => {
        if (err) {
          console.error("Erreur lors de l'insertion :", err);
          reject(err);
        } else {
          console.log("Enregistrement inséré avec succès !");
          resolve(result);
        }
      });
    });

    res.status(201).json({ message: "Enregistrement inséré avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'insertion" });
  }
};

module.exports = exports;