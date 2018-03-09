'use strict';

import * as Buttons from '../buttons/buttons.js';
import utiles from '../../../components/utiles.js';
import globalValues from '../../../components/gloabalData.js';

class Field {
    constructor({
        type = '',
        id = '',
        name = '',
        label = '',
        placeholder = '',
        required = true,
        minLength = 0,
        value = '',
        error = '',
        message = ''
    } = {}) {
        this._name = name;
        this._required = required;
        this._minLength = minLength;
        const template = window.fieldTmplTemplate({ field: arguments[0] });
        this._el = utiles.htmlToElements(template)[0];
    }

// ----------------------------------------------------------------------------
// getters
// ----------------------------------------------------------------------------

    get element() {
        return this._el;
    }

    get name() {
        return this._name;
    }

    get value() {
        return this._el.querySelector('input').value;
    }

    get error() {
        return this._getSelectorTextContent('.js-field-error');
    }

    get message() {
        return this._getSelectorTextContent('.js-field-message');
    }

// ----------------------------------------------------------------------------
// setters
// ----------------------------------------------------------------------------

    set value(val) {
        this._el.querySelector('input').value = val;
    }

    set error(val) {
        this._setSelectorTextContent('.js-field-error', val);
    }

    set message(val) {
        this._setSelectorTextContent('.js-field-message', val);
    }

// ----------------------------------------------------------------------------
// validation
// ----------------------------------------------------------------------------
    
    validate() {
        this.error = '';
        return this._checkRequired();
    }

// ----------------------------------------------------------------------------
// private
// ----------------------------------------------------------------------------

    _checkRequired() {
        if (this._required && (this.value === '' || this.value == null)) {
            this.error = globalValues.errors.input.required;
            return false;
        }

        return true;
    }

    _getSelectorTextContent(selector) {
        return this._el.querySelector(selector).textContent;
    }

    _setSelectorTextContent(selector, newValue) {
        this._el.querySelector(selector).textContent = newValue;
    }
}

class AbstractForm {
    constructor({
        formTitle = '',
        fields = [],
        submitBtnText = 'Submit',
        reciverCallback = utiles.noop,
        downButtons = []
    } = {}) {
        const template = window.abstractformTmplTemplate({ formElements: formTitle });
        this._el = utiles.htmlToElements(template)[0];

        this._submitBtn = new Buttons.SubmitInput({
            text: submitBtnText,
            events: [{
                name: 'click',
                handler: this._processSubmit.bind(this)
            }]
        });
        this._fields = fields.map((field) => new Field(field));
        this._downButtons = downButtons;
        this._reciverCallback = reciverCallback;
    }

    render() {
        this._insertDownButtons();
        this._insertFields();
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
            const input = this._el.querySelector(`input[name='${val.name}']`);
            input.value = val.value;
        }
    }

    _isValid() {
        let valid = true;
        
        for (let field of this._fields) {
            console.log('validate:', field.value);
            const res = field.validate();
            valid = valid && res;
        }

        return valid;
    }

    _ejectData() {    
        const formdata = this._fields.reduce((allFields, field) => {
            allFields[field.name] = this._el.elements[field.name].value;
            return allFields;
        }, {});

        this.reset();

        this._reciverCallback({
            data: formdata,
            callback: this._outputErrors.bind(this)
        });
    }

    _outputErrors(err) {
        const errorContainer = this._el.querySelector('.js-common-errors');

        errorContainer.innerHtml = '';
        errorContainer.textContent = err.error;
    }

    _resetErrors() {
        const errorContainer = this._el.querySelector('.js-common-errors');
        errorContainer.textContent = '';
    }

    _processSubmit(evt) {
        evt.preventDefault();
        
        if (this._isValid()) {
            this._ejectData();
        }

        this.reset();
    }

    _insertDownButtons() {
        const downButtonsContainer = this._el.querySelector('.js-form-sumbit-section');
        
        downButtonsContainer.appendChild(this._submitBtn.element);

        for (let button of this._downButtons) {
            downButtonsContainer.appendChild(button.element);
        }
    }

    _insertFields() {
        const fieldsSelector = this._el.querySelector('.js-fields-section');

        for (let field of this._fields) {
            fieldsSelector.appendChild(field.element);
        }
    }
}

export default AbstractForm;