'use strict';

import AuthSignup from '../authSignup/authSignup.js';

class Mainscreen {
    constructor(selector) {
        this._el = document.querySelector(selector);
    }

    clear() {
        this._el.innerHTML = '';
    }

    render() {
        this._el.innerHTML = window.mainscreenTmplTemplate();
        if(!this._inners) {
            this._createInners();
        }
        for(let inner of this._inners) {
            inner.render();
        }
    }

    _createInners() {
        this._inners = [
            new AuthSignup('.js-login-register-section')
        ];
    }

}

export default Mainscreen;