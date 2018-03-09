'use strict';

import AuthSugnup from './authSignup/authSignup.js';
import utiles from '../../../components/utiles.js'; 
import AuthorizedSection from './authorizedSection/authorizedSection.js';

class CentralBlock {
    constructor() {
        const template = window.centralblockTmplTemplate();
        this._el = utiles.htmlToElements(template)[0];
    }

    get element() {
        return this._el;
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
            new AuthSugnup('.js-login-register-section'),
            new AuthorizedSection('.js-authorized-section')
        ];
    }    
}

export default CentralBlock;