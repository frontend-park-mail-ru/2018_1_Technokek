'use strict';

import utiles from '../../../components/utiles.js';

class IAbstractForm {
    constructor({
        formTitle = '',
        fields = [],
        url = '/',
        method = 'POST',
        downButtons = []
    } = {}) {
        const elHtml = window.abstractformTmplTemplate({
            formElements: {formTitle, fields, url, method, downButtons}
        });

        this._el = utiles.htmlToElements(elHtml)[0];
        this._insertDownButtons(downButtons);
    }

    get element() {
        return this._el;
    }

    _insertDownButtons(downButtons) {
        const downButtonsContainer = this._el.querySelector('.js-form-sumbit-section');
        
        for(let button of downButtons) {
            downButtonsContainer.appendChild(button.element);
        }
    }
}

export default IAbstractForm;