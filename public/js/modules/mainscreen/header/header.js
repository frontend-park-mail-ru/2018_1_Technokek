'use strict';

import utiles from '../../../components/utiles.js';

class Header {
    constructor() {
        const template = window.headerTmplTemplate();
        this._el = utiles.htmlToElements(template)[0];
    }

    render() { 

    }

    get element() {
        return this._el;
    }

}

export default Header;