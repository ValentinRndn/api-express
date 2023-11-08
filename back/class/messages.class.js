class Messages {
  constructor(id, isHumain, content, id_personnage, date_dernier_message) {
    this._id = id;
    this._isHumain = isHumain;
    this.content = content;
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
  
  get content() {
    return this._content;
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

  set content(newContent) {
    this._content = newContent;
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
      content: this._content,
      id_personnage: this.id_personnage,
      date_dernier_message: this.date_dernier_message
    };
  }

  //FromMap
  static fromMap(map) {
    return new Messages(map.id, map.isHumain, map.content, map.id_personnage, map.date_dernier_message);
  }
}

module.exports = Messages;
