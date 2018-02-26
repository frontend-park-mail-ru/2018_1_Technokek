'use strict';

class Rules {
    constructor(selector) {
        this._el = document.querySelector(selector);
        this._hidden = true;
        this._updateHidden();
    }

    get hidden() {
        return this._hidden;
    }

    set hidden(val) {
        this._hidden = Boolean(val);
    }

    render() {
        this._el.innerHTML = window.rulesTmplTemplate();
        this._updateHidden();
    }

    _updateHidden() {
        if(this._hidden)
            this._el.setAttribute('hidden', '');
        else
            this._el.removeAttribute('hidden');
    }
}

export default Rules;