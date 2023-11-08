const { generateImage } = require("../api/stablediffusion");

class Characters {
  constructor(id, nom, id_image, id_univers) {
    this._id = id;
    this._nom = nom;
    this._id_image = id_image;
    this._id_univers = id_univers;
  }

  // Getters
  get id() {
    return this._id;
  }

  get nom() {
    return this._nom;
  }

  get id_image() {
    return this._id_image;
  }

  get id_univers() {
    return this._id_univers;
  }

  // Setters
  set id(newId) {
    this._id = newId;
  }

  set nom(newNom) {
    this._nom = newNom;
  }

  set id_image(newIdImage) {
    this._id_image = newIdImage;
  }

  set id_univers(newIdUnivers) {
    this._id_univers = newIdUnivers;
  }

  //toMap
  toMap() {
    return {
      id: this._id,
      nom: this._nom,
      id_image: this._id_image,
      id_univers: this._id_univers,
    };
  }

  //FromMap
  static fromMap(map) {
    return new Personnages(
      map.id,
      map.nom,
      map.id_image,
      map.id_univers
    );
  }

  //Génération d'une image pour le character
  async generateCharacterImage() {
    const prompt = "Génère moi une image de " +this.nom + ", je veux que ce soit un portait de sa tête."
    generateImage(prompt);
  }
}

module.exports = Characters;
