'use strict';

import utiles from '../../../components/utiles.js';

class AbstractForm {
    constructor({
        formTitle = '',
        fields = [],
        downButtons = []
    } = {}) {
        const elHtml = window.abstractformTmplTemplate({
            formElements: {formTitle, fields, downButtons}
        });

        this._el = utiles.htmlToElements(elHtml)[0];
        this._fields = fields;
        console.log(this._fields);
        this._downButtons = downButtons;
        this._insertDownButtons();
    }

    get element() {
        return this._el;
    }

    get buttons() {
        return this._downButtons;
    }

    reset() {
        this._el.reset();
    }

    setValues(values) {
        this.reset();
        
        for(let val of values) {
            const input = this._el.querySelector(`input[type='${val.name}']`);
            input.value = val.value;
        }
    }

    ejectData(callback = utiles.noop) {
        console.log(this._fields);        
        const formdata = this._fields.reduce((allFields, field) => {
            allFields[field.name] = this._el.elements[field.name].value;
            return allFields;
        }, {});

        this.reset();
        console.log(formdata);
        callback(formdata);
    }

    _insertDownButtons(downButtons) {
        const downButtonsContainer = this._el.querySelector('.js-form-sumbit-section');
        
        for(let button of this._downButtons) {
            downButtonsContainer.appendChild(button.element);
        }
    }
}

export default AbstractForm;