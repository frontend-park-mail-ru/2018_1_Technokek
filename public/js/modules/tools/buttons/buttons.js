'use strict';

import utiles from '../../../components/utiles.js';

class AbstractButton {
    constructor({
            text = '',
            events = [],
            templateFunction = utiles.noop
    } = {}) {
        const elHtml = templateFunction({ text });
        this._el = utiles.htmlToElements(elHtml)[0];
        this._createListeners(events);
    }

    get element() {
        return this._el;
    }

    addListeners(events) {
        this._createListeners(events);
    }

    _createListeners(events) {
        for(let event of events) {
            this._el.addEventListener(event.name, event.handler);
        }
    }
}

class ActiveButton extends AbstractButton {
    constructor({text = '', events = []} = {}) {
        super({ 
            text, 
            events,
            templateFunction: window.activebuttonTmplTemplate
        });
    }
}

class PassiveButton extends AbstractButton {
    constructor({text = '', events = []} = {}) {
        super({ 
            text, 
            events,
            templateFunction: window.passivebuttonTmplTemplate
        });
    }
}

class SubmitInput extends AbstractButton {
    constructor({text = 'Submit', events = []}) {
        super({
            text,
            events, 
            templateFunction: window.submitinputTmplTemplate
        });
    }
}

export {ActiveButton, PassiveButton, SubmitInput};