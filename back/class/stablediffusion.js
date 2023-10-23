class StableDiffusion {
    constructor(prompt, content) {
        this._prompt = prompt;
        this._content = content;
    }

    // Getters
    get prompt() {
        return this._prompt;
    }

    get content() {
        return this._content;
    }

    // Setters
    set prompt(newPrompt) {
        this._prompt = newPrompt;
    }

    set content(newContent) {
        this._content = newContent;
    }
}
