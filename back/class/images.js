class Images {
    constructor(id, url) {
        this._id = id;
        this._url = url;
    }

    // Getters
    get id() {
        return this._id;
    }

    get url() {
        return this._url;
    }

    // Setters
    set id(newId) {
        this._id = newId;
    }

    set url(newUrl) {
        this._url = newUrl;
    }
}

