'use strict';

import AuthSignup from '../authSignup/authSignup.js';
import Tabbar from '../tabbar/tabbar.js';
import GlobalValues from '../../components/gloabalData.js';

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
        console.log(GlobalValues.initialTabs);
        this._inners = [
            new AuthSignup('.js-login-register-section'),
            new Tabbar({
                selector: '.js-tabbar',
                tabs: window.GlobalValues.initialTabs
            })
        ];
    }

}

export default Mainscreen;