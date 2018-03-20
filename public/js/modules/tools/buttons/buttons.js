'use strict';

import utiles from '../../../components/utiles.js';

class AbstractButton {
    constructor({
            text = '',
            events = [],
            templateFunction = utiles.noop,
            wide = false,
            tall = false,
    } = {}) {
        const elHtml = templateFunction({ text });
        this._el = utiles.htmlToElements(elHtml)[0];

        if (wide) {
            this._el.style.width = '100%';
        }

        if (tall) {
            this._el.style.height = '100%';
            this._el.style['line-height'] = '100%';
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
    constructor({text = '', events = [], wide = false, tall = false} = {}) {
        super({ 
            text, 
            events,
            templateFunction: window.activebuttonTmplTemplate,
            wide,
            tall
        });
    }
}

class PLayButton extends AbstractButton {
    constructor({text = '', events = [], wide = false, tall = false} = {}) {
        super({ 
            text, 
            events,
            templateFunction: window.playbuttonTmplTemplate,
            wide,
            tall
        });
    }
}

class PassiveButton extends AbstractButton {
    constructor({text = '', events = [], wide = false, tall = false} = {}) {
        super({ 
            text, 
            events,
            templateFunction: window.passivebuttonTmplTemplate,
            wide,
            tall
        });
    }
}

class SubmitInput extends AbstractButton {
    constructor ({text = 'Submit', events = [], wide = false}) {
        super({
            text,
            events, 
            templateFunction: window.submitinputTmplTemplate,
            wide
        });
    }
}

class UnderliningButton extends AbstractButton {
    constructor ({ text = 'Submit', events = [], wide = false, isActive = false } = {}) {
        super({
            text,
            events,
            templateFunction: window.underliningbuttonTmplTemplate,
            wide,
        });

        this._setIsActive(isActive);

        this.addListeners([{
            name: 'click',
            handler: (evt) => {
                evt.preventDefault();
            }
        }]);
    }

    get isActive() {
        return this._isActive;
    }

    acitvate() {
        this._setIsActive(true);
    }

    deactivate() {
        this._setIsActive(false);
    }

    _setIsActive(isActive) {
        this._isActive = isActive;
        
        if (this._isActive) {
            this._el.classList.add('active');
        }
        else {
            this._el.classList.remove('active');
        }
    }
}

export {ActiveButton, PassiveButton, SubmitInput, UnderliningButton, PLayButton};