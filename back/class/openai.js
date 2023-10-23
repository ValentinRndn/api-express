class openai {
    constructor(prompt, content, message) {
        this._prompt = prompt;
        this._content = content;
        this._message = message;
    }

    // Getters
    get prompt() {
        return this._prompt;
    }

    get content() {
        return this._content;
    }

    get message() {
        return this._message;
    }

    // Setters
    set prompt(newPrompt) {
        this._prompt = newPrompt;
    }

    set content(newContent) {
        this._content = newContent;
    }

    set message(newMessage) {
        this._message = newMessage;
    }
}

