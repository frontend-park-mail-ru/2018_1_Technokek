'use strict';

import utiles from '../../../components/utiles.js';
import buttonsTypes from './buttonsTypes.js';

class Button {
    constructor({
            text = '',
            events = [],
            type = utiles.noop,
            wide = false,
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

class PrimaryButton extends Button {
    constructor({text = '', events = [], wide = false} = {}) {
        super({ 
            text, 
            events,
            templateFunction: window.primarybuttonTmplTemplate,
            wide
        });
    }
}

class PLayButton extends Button {
    constructor({text = '', events = [], wide = false} = {}) {
        super({ 
            text, 
            events,
            templateFunction: window.playbuttonTmplTemplate,
            wide
        });
    }
}

class PassiveButton extends Button {
    constructor({text = '', events = [], wide = false} = {}) {
        super({ 
            text, 
            events,
            templateFunction: window.passivebuttonTmplTemplate,
            wide
        });
    }
}

class SubmitInput extends Button {
    constructor ({text = 'Submit', events = [], wide = false}) {
        super({
            text,
            events, 
            templateFunction: window.submitinputTmplTemplate,
            wide
        });
    }
}

class UnderliningButton extends Button {
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



class Mixin {
    constructor() {
        this._a = false;
    }  

    get a() {
        return a;
    }

    set a(val) {
        this._a = val;
    }
}

class B {
    constructor(mixinClass) {
        Object.assign(this, new mixinClass());
    }
}



export {PrimaryButton, PassiveButton, SubmitInput, UnderliningButton, PLayButton};