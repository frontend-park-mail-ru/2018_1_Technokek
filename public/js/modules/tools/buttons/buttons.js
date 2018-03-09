'use strict';

import utiles from '../../../components/utiles.js';

class AbstractButton {
    constructor({
            text = '',
            events = [],
            templateFunction = utiles.noop,
            wide = false
    } = {}) {
        const elHtml = templateFunction({ text });
        this._el = utiles.htmlToElements(elHtml)[0];

        if (wide) {
            this._el.style.width = '100%';
        }

        this._createListeners(events);
    }

    get element() {
        return this._el;
    }

    addListeners(events) {
        this._createListeners(events);
    }

    _createListeners(events) {
        for (let event of events) {
            this._el.addEventListener(event.name, event.handler);
        }
    }
}

class ActiveButton extends AbstractButton {
    constructor({text = '', events = [], wide = false} = {}) {
        super({ 
            text, 
            events,
            templateFunction: window.activebuttonTmplTemplate,
            wide
        });
    }
}

class PassiveButton extends AbstractButton {
    constructor({text = '', events = [], wide = false} = {}) {
        super({ 
            text, 
            events,
            templateFunction: window.passivebuttonTmplTemplate,
            wide
        });
    }
}

class SubmitInput extends AbstractButton {
    constructor({text = 'Submit', events = [], wide = false}) {
        super({
            text,
            events, 
            templateFunction: window.submitinputTmplTemplate,
            wide
        });
    }
}

export {ActiveButton, PassiveButton, SubmitInput};