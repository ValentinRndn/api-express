/////////////////////////////////////////////
////////////Gestion des users//////////////
/////////////////////////////////////////////

const dbInstance = require("../services/db").getInstance();


const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

const User = require('../back/class/user.class')
 

dotenv.config({ path: '.env.local' });

const tokenKey = process.env.TOKEN_KEY;

 

// Contrôleur pour créer un utilisateur

exports.createUser = (req, res) => {

  let user = User.fromMap(req.body);  

  const sql = "INSERT INTO utilisateurs (nom, prenom, pseudo, mdp) VALUES (?, ?, ?, ?)";

  const values = [user.nom, user.prenom, user.pseudo, user.mdp];

  dbInstance.db.query(sql, values, (err, result) => {

    if (err) {

      console.error("Erreur lors de l'insertion du user", err);

      res.status(500).json({ error: "Erreur lors de la création du user" });

    } else {

      user._id = result.insertId;

      res.status(201).json({ message: "Utilisateur créé avec succès !", Créé: user.toMap()});

    }

  });

};

 

// Controller pour update un utilisateur

exports.updateUser = (req, res) => {

  const userID = parseInt(req.params.id);

  let user = User.fromMap(req.body);

 

  const columns = [];

  const values = [];

 
  if (user.prenom) {

    columns.push("prenom = ?");

    values.push(user.prenom);

  }
  if (user.nom) {

    columns.push("nom = ?");

    values.push(user.nom);

  }
  if (user.pseudo) {

    columns.push("pseudo = ?");

    values.push(user.pseudo);

  }

  if (user.mdp) {

    columns.push("mdp = ?");

    values.push(user.mdp);

  }


  let sql = "UPDATE utilisateurs SET " + columns.join(", ") + " WHERE id = ?";

  values.push(userID);

 

  dbInstance.db.query(sql, values, (err) => {

    if (err) {

      res.status(500).json({ error: "Erreur lors de la mise à jour du user" });

    } else {

      res.status(200).json({ message: "Utilisateur mis à jour avec succès", data: user.toMap() });

    }

  });

};

 

// Controller pour s'authentifier en tant qu'utilisateur, et récupérer un token

exports.authentification = (req, res) => {

  let user = User.fromMap(req.body);

  const sql = "SELECT * FROM utilisateurs WHERE pseudo = ? AND mdp = ?";
console.log(req.body);
  const values = [user.pseudo, user.mdp];

  dbInstance.db.query(sql, values, (err, result) => {

    if (err) {

      res.status(500).json({ error: "Erreur lors de l'authentification" });

    } else if (result.length > 0) {

      const token = jwt.sign({ id: result[0].id }, tokenKey, { expiresIn: "24h" }, {algorithm: 'RS256'});

      res.status(200).json({ message: "Authentification réussie", Token: token, Utilisateur : user.toMap() });

    } else {

      res.status(401).json({ message: "Authentification échouée" });

    }

  });

};

 

// Contrôleur pour récupérer un utilisateur par son ID

exports.getUserById = (req, res) => {

  const userID = parseInt(req.params.id);

  const sql = "SELECT * FROM utilisateurs WHERE id = ?";

  dbInstance.db.query(sql, [userID], (err, result) => {

    if (err) {

      res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });

    } else {

      res.status(200).json({ user: result[0] });

      console.log(result[0]);

    }

  });

};

 

// Contrôleur pour récupérer tous les utilisateurs

exports.getAllUsers = (req, res) => {

  dbInstance.db.query("SELECT * FROM utilisateurs", (err, rows,) => {

    if (err || rows.length === 0) {

      res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });

    } else {

      const user = rows.map((row) => row);

      res.status(200).json({ user });

    }

  });

};