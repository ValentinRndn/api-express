const newUnivers = require("../api/openai");
const { generateImage } = require("../api/stablediffusion");



class Univers {
  constructor(description, id_utilisateurs, nom, id_images, nb_perso) {
    this._description = description;
    this._id_utilisateur = id_utilisateurs;
    this._nom = nom;
    this._id_images = id_images;
    this._nb_perso = nb_perso;
  }

  // Getters
  get description() {
    return this._description;
  }

  get id_utilisateurs() {
    return this._id_utilisateurs;
  }

  get nom() {
    return this._nom;
  }

  get id_images() {
    return this._id_images;
  }

  get nb_perso() {
    return this._nb_perso;
  }

  // Setters
  set description(newDescription) {
    this._description = newDescription;
  }

  set id_utilisateurs(newIdUtilisateurs) {
    this._id_utilisateurs = newIdUtilisateurs;
  }

  set nom(newNom) {
    this._nom = newNom;
  }

  set id_images(newIdImage) {
    this._id_images = newIdImage;
  }

  set nb_perso(newNbPerso) {
    this._nb_perso = newNbPerso;
  }

  //toMap
  toMap() {
    return {
      id: this._id,
      description: this._description,
      id_utilisateurs: this._id_utilisateurs,
      nom: this._nom,
      id_images: this._id_images,
      nb_perso: this._nb_perso,
    };
  }

  //FromMap
  static fromMap(map) {
    let univers = new Univers(map.id);
    univers._id = map.id;
    univers._description = map.description;
    univers._id_utilisateurs = map.id_utilisateurs;
    univers._nom = map.nom;
    univers._id_images = map.id_images;
    univers._nb_perso = map.nb_perso;

    return univers;
  }
  async generateDescription() {
    this.description = await newUnivers.generateDescription(this);
  }

    // Utilisez la méthode generateImage
    async generateUniversImage() {
      generateImage("Génère-moi une image de" +this.nom);
      console.log("Génération d'une image pour l'univers terminée !");
    }
  }


module.exports = Univers;
