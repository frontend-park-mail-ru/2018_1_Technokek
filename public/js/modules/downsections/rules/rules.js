'use strict';

class Rules {
    constructor(selector) {
        this._el = document.querySelector(selector);
    }

    render() {
        this._el.innerHTML = window.rulesTmplTemplate();
    }
}

export default Rules;