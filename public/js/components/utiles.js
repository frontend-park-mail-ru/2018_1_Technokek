"use strict";

class Utiles {
    get htmlToElements() {
        return html => {
            const template = document.createElement("template");
            template.innerHTML = html;

            return template.content.childNodes;
        };
    }

    get noop() {
        return () => null;
    }
}

const utiles = new Utiles();

export default utiles;
