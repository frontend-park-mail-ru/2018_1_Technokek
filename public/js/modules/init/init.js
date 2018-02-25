'use strict';

const pug = require('pug');

export default class Init {
    constructor(selector = 'body') {
        this._el = document.querySelector(selector);
    }

    clear() {
        this._el.innerHTML = '';
    }

    render() {
        const compiledFunction = pug.compileFile('init.tmpl.pug');
        _el.innerHTML = compiledFunction();   
    }


}
