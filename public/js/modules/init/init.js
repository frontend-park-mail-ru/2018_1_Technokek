'use strict';

// const template = require('.init.tmpl.js');
class Init {
    constructor(selector = 'body') {
        this._el = document.querySelector(selector);
    }

    clear() {
        this._el.innerHTML = '';
    }

    render() {
        this._el.innerHTML = window.initTmplTemplate();
    }
}

export default Init;
