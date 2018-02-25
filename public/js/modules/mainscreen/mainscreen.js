'use strict';

class Mainscreen {
    constructor(selector) {
        this._el = document.querySelector(selector);
    }

    clear() {
        this._el.innerHTML = '';
    }

    render() {
        this._el.innerHTML = window.mainscreenTmplTemplate();
    }

}

export default Mainscreen;