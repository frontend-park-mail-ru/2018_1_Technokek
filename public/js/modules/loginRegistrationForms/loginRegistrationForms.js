'use strict';

const noop = () => null;

class AbstractForm {
    constructor({selector = 'body', templateFunction = noop, hidden = false} = {}) {
        this._el = document.querySelector(selector);
        this._templateFunction = templateFunction;
        this._hidden = hidden;
        this._updateHidden();
    }

    get hidden() {
        return this._hidden;
    }

    set hidden(val) {
        this._hidden = Boolean(val);
        this._updateHidden();
    }

    render() {
        this._el.innerHTML = this._templateFunction();
    }

    _updateHidden() {
        if(this._hidden)
            this._el.setAttribute('hidden', '');
        else
            this._el.removeAttribute('hidden', '');
    }
}

class LoginRegistrationForm {

    constructor(selector) {
        this._el = document.querySelector(selector);
    }

    clear() {
        this._el.innerHTML = '';
    }

    render() {
        this._el.innerHTML = window.loginregistrationformsTmplTemplate();

        if(!this._forms) {
            this._createForms();
        }

        for(let form of this._forms) {
            form.render();
        }
    }

    _createForms() {
        this._forms = [
            new AbstractForm({
                selector: '.login-section', 
                templateFunction: window.loginformTmplTemplate,
                hidden: false
            }),
            new AbstractForm({
                selector: '.register-section', 
                templateFunction: window.registrationformTmplTemplate,
                hidden: true
            })
        ];
    }
}

export default LoginRegistrationForm;