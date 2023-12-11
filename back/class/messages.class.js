class Messages {
  constructor(id, isHumain, contenu, id_personnage, date_dernier_message) {
    this._id = id;
    this._isHumain = isHumain;
    this.contenu = contenu;
    this.id_personnage = id_personnage;
    this._date_dernier_message = date_dernier_message;
  }

  // Getters
  get id() {
    return this._id;
  }

  get isHumain() {
    return this._isHumain;
  }
  
  get contenu() {
    return this._contenu;
  }

  get id_personnage() {
    return this._id_personnage;
  }

  get date_dernier_message() {
    return this._date_dernier_message;
  }

  // Setters
  set id(newId) {
    this._id = newId;
  }

  set isHumain(newIsHumain) {
    this._isHumain = newIsHumain;
  }

  set contenu(newContenu) {
    this._contenu = newContenu;
  }

  set id_personnage(newIdPersonnage) {
    this._id_personnage = newIdPersonnage;
  }

  set date_dernier_message(newDateDernierMessage) {
    this._date_dernier_message = newDateDernierMessage;
  }

  //toMap
  toMap() {
    return {
      id: this._id,
      isHumain: this._isHumain,
      contenu: this._contenu,
      id_personnage: this.id_personnage,
      date_dernier_message: this.date_dernier_message
    };
  }

  //FromMap
  static fromMap(map) {
    return new Messages(map.id, map.isHumain, map.contenu, map.id_personnage, map.date_dernier_message);
  }



  
}

module.exports = Messages;
