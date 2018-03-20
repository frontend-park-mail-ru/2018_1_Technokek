'use stric';

import utils from '../../../components/utiles.js';

class AbstractToggler {
    constructor(selector) {
        this._el = document.querySelector(selector);
    }
    
    changeItems() {
        for (let item of this._togglingItems) {
            item.toggle();
        }
    }
}

class AbstractTogglingItem {
    constructor({
        parent = document,
        selector = null,
        childElement = null,
        hidden = true,
    }) {
        this._el = parent.querySelector(selector);
        this._child = childElement;
        
        this._el.hidden = hidden;
    }

    render() {
        this._el.appendChild(this._child.element);

        if (this._child.render) {
            this._child.render();
        }
    }

    toggle() {
        this._el.hidden = !this._el.hidden;
    }

    get hidden() {
        return this._el.hidden;
    }
    
    set hidden(value) {
        this._el.hidden = value;
    }
}

export {
    AbstractToggler,
    AbstractTogglingItem
};