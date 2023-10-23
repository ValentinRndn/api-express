class Personnages {
    constructor(id, nom, id_image, id_message) {
        this._id = id;
        this._nom = nom;
        this._id_image = id_image;
        this._id_message = id_message;
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

    get id_message() {
        return this._id_message;
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

    set id_message(newIdMessage) {
        this._id_message = newIdMessage;
    }
}
