class Univers {
    constructor(description, nbPersonnage, id_utilisateur, nom, id_personnage, id_image, nb_perso) {
        this._description = description;
        this._nbPersonnage = nbPersonnage;
        this._id_utilisateur = id_utilisateur;
        this._nom = nom;
        this._id_personnage = id_personnage;
        this._id_image = id_image;
        this._nb_perso = nb_perso;
    }

    // Getters
    get description() {
        return this._description;
    }

    get nbPersonnage() {
        return this._nbPersonnage;
    }

    get id_utilisateur() {
        return this._id_utilisateur;
    }

    get nom() {
        return this._nom;
    }

    get id_personnage() {
        return this._id_personnage;
    }

    get id_image() {
        return this._id_image;
    }

    get nb_perso() {
        return this._nb_perso;
    }

    // Setters
    set description(newDescription) {
        this._description = newDescription;
    }

    set nbPersonnage(newNbPersonnage) {
        this._nbPersonnage = newNbPersonnage;
    }

    set id_utilisateur(newIdUtilisateur) {
        this._id_utilisateur = newIdUtilisateur;
    }

    set nom(newNom) {
        this._nom = newNom;
    }

    set id_personnage(newIdPersonnage) {
        this._id_personnage = newIdPersonnage;
    }

    set id_image(newIdImage) {
        this._id_image = newIdImage;
    }

    set nb_perso(newNbPerso) {
        this._nb_perso = newNbPerso;
    }
}

