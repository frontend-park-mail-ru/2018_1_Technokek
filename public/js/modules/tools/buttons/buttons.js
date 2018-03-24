'use strict';

import utiles from '../../../components/utiles.js';
import buttonsStyles from './buttonsStyles.js';

class Button {
    constructor({
            text = '',
            events = [],
            style = '',
            wide = false,
    } = {}) {
        const elHtml = window.buttonTmplTemplate({ text, style });
        this._el = utiles.htmlToElements(elHtml)[0];

        if (wide) {
            this._el.style.width = '100%';
        }

        this.addListeners(events);
        this.addListeners([{
            name: 'click',
            event: (evt) => evt.preventDefault()
        }]);
    }

    get element() {
        return this._el;
    }

    addListeners(events) {
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
            style: buttonsStyles.PRIMARY,
            wide
        });
    }
}

class PLayButton extends Button {
    constructor({text = '', events = [], wide = false} = {}) {
        super({ 
            text, 
            events,
            style: buttonsStyles.PLAY,
            wide
        });
    }
}

class PassiveButton extends Button {
    constructor({text = '', events = [], wide = false} = {}) {
        super({ 
            text, 
            events,
            style: buttonsStyles.PASSIVE,
            wide
        });
    }
}

export {PrimaryButton, PassiveButton, PLayButton};