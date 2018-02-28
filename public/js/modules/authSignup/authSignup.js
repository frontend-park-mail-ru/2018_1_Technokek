'use strict';

const noop = () => null;

class AbstractForm {
    constructor({selector = 'body', templateFunction = noop, hidden = false, changeFormSlot = noop} = {}) {
        this._el = document.querySelector(selector);
        this._templateFunction = templateFunction;
        this._el.hidden = hidden;
        this._changeFormSlot = changeFormSlot;
        this._listenersCreated = false;
    }

    get hidden() {
        return this._el.hidden;
    }

    set hidden(val) {
        this._el.hidden = Boolean(val);
    }

    render() {
        this._el.innerHTML = this._templateFunction();
        
        if(!this._listenersCreated) {
            this._createEventListeners(); 
        }
    }

    toggle() {
        this._el.hidden = !this._el.hidden;
    }

    _createEventListeners() {
        const formChanger = this._el.querySelector('.js-change-form');
        formChanger.addEventListener('click', this._changeFormSlot);
        this._listenersCreated = true;
    }
}

class AuthSignup {

    constructor(selector) {
        this._el = document.querySelector(selector);

        this._formsOprions = [
            {
                selector: '.register-section', 
                templateFunction: window.signupformTmplTemplate,
                hidden: true,
                changeFormSlot: this.changeForms.bind(this)
            },
            {
                selector: '.login-section', 
                templateFunction: window.authformTmplTemplate,
                hidden: false,
                changeFormSlot: this.changeForms.bind(this)
            }
        ];
    }

    clear() {
        this._el.innerHTML = '';
    }

    render() {
        this._el.innerHTML = window.authsignupTmplTemplate();

        if(!this._forms) {
            this._createForms();
        }

        for(let form of this._forms) {
            form.render();
        }
    }

    changeForms() {
        if(this._forms) {
            for(let form of this._forms) {
                form.toggle();
            }
        }
    }

    _createForms() {
        this._forms = this._formsOprions.map(option => new AbstractForm(option)); 
    }
}

export default AuthSignup;
