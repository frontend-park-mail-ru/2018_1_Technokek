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
        if (!this._inners) {
            this._createInners();
        }

        for (let inner of this._inners) {
            inner.render();
        }
    }

    _createInners() {
        this._inners = [
            new Mainscreen(),
            new Downscreen()
        ];

        for (let inner of this._inners) {
            this._el.appendChild(inner.element);
        }
    }
}

export default Init;
