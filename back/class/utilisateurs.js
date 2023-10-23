class Utilisateurs {
    constructor(id, nom, prenom, pseudo, mdp, id_message) {
        this._id = id;
        this._nom = nom;
        this._prenom = prenom;
        this._pseudo = pseudo;
        this._mdp = mdp;
        this._id_message = id_message;
    }

    // Getters
    get id() {
        return this._id;
    }

    get nom() {
        return this._nom;
    }

    get prenom() {
        return this._prenom;
    }

    get pseudo() {
        return this._pseudo;
    }

    get mdp() {
        return this._mdp;
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

    set prenom(newPrenom) {
        this._prenom = newPrenom;
    }

    set pseudo(newPseudo) {
        this._pseudo = newPseudo;
    }

    set mdp(newMdp) {
        this._mdp = newMdp;
    }

    set id_message(newIdMessage) {
        this._id_message = newIdMessage;
    }
}

