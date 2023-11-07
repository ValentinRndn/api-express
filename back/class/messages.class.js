class Messages {
  constructor(id, isHumain, date_dernier_message) {
    this._id = id;
    this._isHumain = isHumain;
    this._date_dernier_message = date_dernier_message;
  }

  // Getters
  get id() {
    return this._id;
  }

  get isHumain() {
    return this._isHumain;
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

  set date_dernier_message(newDateDernierMessage) {
    this._date_dernier_message = newDateDernierMessage;
  }

  //toMap
  toMap() {
    return {
      id: this._id,
      isHumain: this._isHumain,
      date_dernier_message: this.date_dernier_message
    };
  }

  //FromMap
  static fromMap(map) {
    return new Messages(map.id, map.isHumain, map.date_dernier_message);
  }
}

module.exports = Messages;
