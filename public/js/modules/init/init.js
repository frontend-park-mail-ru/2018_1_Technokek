'use strict';

import Mainscreen from '../mainscreen/mainscreen.js';
class Init {
    constructor(selector = 'body') {
        this._el = document.querySelector(selector);
    }

    clear() {
        this._el.innerHTML = '';
    }

    render() {
        this._el.innerHTML = window.initTmplTemplate();
        this._mainscreen = new Mainscreen('.main-screen');
        this._mainscreen.render();
    }
}

export default Init;
