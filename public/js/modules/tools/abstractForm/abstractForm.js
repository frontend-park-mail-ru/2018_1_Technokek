'use strict';

import * as Buttons from '../buttons/buttons.js';
import utiles from '../../../components/utiles.js';

class AbstractForm {
    constructor({
        formTitle = '',
        fields = [],
        submitBtnText = 'Submit',
        reciverCallback = utiles.noop,
        downButtons = []
    } = {}) {
        this._submitBtn = new Buttons.SubmitInput({
            text: submitBtnText,
            events: [{
                name: 'click',
                handler: this._processSubmit.bind(this)
            }]
        });

        const elHtml = window.abstractformTmplTemplate({
            formElements: {formTitle, fields}
        });

        this._el = utiles.htmlToElements(elHtml)[0];
        this._fields = fields;
        this._downButtons = downButtons;
        this._insertDownButtons();

        this._reciverCallback = reciverCallback;
    }

    get element() {
        return this._el;
    }

    get buttons() {
        return this._downButtons;
    }

    reset() {
        this._el.reset();
        this._resetErrors();
    }

    setValues(values) {
        this.reset();
        
        for (let val of values) {
            const input = this._el.querySelector(`input[type='${val.name}']`);
            input.value = val.value;
        }
    }

    ejectData(callback = utiles.noop) {    
        const formdata = this._fields.reduce((allFields, field) => {
            allFields[field.name] = this._el.elements[field.name].value;
            return allFields;
        }, {});

        this.reset();
        callback({
            data: formdata,
            callback: this._outputErrors.bind(this)
        });
    }

    _insertDownButtons(downButtons) {
        const downButtonsContainer = this._el.querySelector('.js-form-sumbit-section');
        
        downButtonsContainer.appendChild(this._submitBtn.element);

        for (let button of this._downButtons) {
            downButtonsContainer.appendChild(button.element);
        }
    }

    _outputErrors(err) {
        const errorContainer = this._el.querySelector('.js-common-errors');
        errorContainer.innerHtml = '';
        errorContainer.textContent = err.error;
    }

    _resetErrors() {
        const errorContainer = this._el.querySelector('.js-common-errors');
        errorContainer.innerHtml = '';
    }

    _processSubmit(evt) {
        evt.preventDefault();
        this.ejectData(this._reciverCallback);
    }
}

export default AbstractForm;