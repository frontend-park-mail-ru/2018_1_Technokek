'use stric';

import utils from '../../../components/utiles.js';

class AbstractToggler {
    constructor(selector) {
        this._el = document.querySelector(selector);
    }
    
    changeItems() {
        for(let item of this._togglingItems)
            item.toggle();
    }
}

class AbstractTogglingItem {
    constructor({
        selector = null,
        childElement = null,
        hidden = true,
    }) {
        console.log(selector, childElement.element, hidden);
        this._el = document.querySelector(selector);
        this._child = childElement;
        console.log(this._el);
        this._el.appendChild(this._child.element);
        this._el.hidden = hidden;
    }

    render() {
        if(this._child.render) {
            this._child.render();
        }
    }

    toggle() {
        this._hidden = this._el.hidden = !this._el.hidden;
    }
}

export {
    AbstractToggler,
    AbstractTogglingItem
};