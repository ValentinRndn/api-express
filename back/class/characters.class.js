const { generateImage } = require("../api/stablediffusion");

class Characters {
  constructor(id, nom, id_images, id_messages, id_univers) {
    this._id = id;
    this._nom = nom;
    this._id_images = id_images;
    this._id_messages = id_messages;
    this._id_univers = id_univers;
  }

  // Getters
  get id() {
    return this._id;
  }

  get nom() {
    return this._nom;
  }

  get id_images() {
    return this._id_images;
  }

  get id_messages() {
    return this._id_messages;
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

  set id_images(newIdImages) {
    this._id_images = newIdImages;
  }

  set id_messages(newIdMessages) {
    this._id_messages = newIdMessages;
  }

  set id_univers(newIdUnivers) {
    this._id_univers = newIdUnivers;
  }

  //toMap
  toMap() {
    return {
      id: this._id,
      nom: this._nom,
      id_images: this._id_images,
      id_messages: this._id_messages,
      id_univers: this._id_univers,
    };
  }

  //FromMap
  static fromMap(map) {
    return new Characters(
      map.id,
      map.nom,
      map.id_images,
      map.id_messages,
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
