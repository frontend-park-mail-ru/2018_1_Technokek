'use strict';

import Mainscreen from '../mainscreen/mainscreen.js';
import Downscreen from '../downscreen/downscreen.js';

class Init {
    constructor(selector = 'body') {
        this._el = document.querySelector(selector);
    }

    clear() {
        this._el.innerHTML = '';
    }

    render() {
        this._el.innerHTML = window.initTmplTemplate();
        
        this._downscreen = new Downscreen('.js-down-screen');
        this._downscreen.render();

        this._mainscreen = new Mainscreen('.js-main-screen');
        this._mainscreen.render();
    }
}

export default Init;
