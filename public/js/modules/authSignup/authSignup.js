'use strict';

import utils from '../../components/utiles.js';
import globalValues from '../../components/gloabalData.js';
import IAbstractForm from '../tools/abstractForm/abstractForm.js';
import * as Buttons from '../tools/buttons/buttons.js';

const noop = () => null;

class AbstractForm {
    constructor({selector = 'body', templateFunction = utils.noop, hidden = false, changeFormSlot = utils.noop} = {}) {
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

class AuthForm extends IAbstractForm {
    constructor(togglingSlot) {      
        super({
            formTitle: 'Login',
            fields: [
                {
                    label: 'Email',
                    type: globalValues.inputTypes.email,
                    placeholder: 'Email',
                    id: 'auth-email',
                    name: 'email'
                },
                {
                    label: 'Password',
                    type: globalValues.inputTypes.password,
                    placeholder: 'Password',
                    id: 'auth-password',
                    name: 'password'
                }
            ],
            downButtons: [
                new Buttons.SubmitInput({
                    text: 'Login!'
                }),
                new Buttons.PassiveButton({
                    text: 'Registation',
                    events: [
                        {
                            name: 'click',
                            handler: togglingSlot
                        }   
                    ]
                })
            ]
        });
    }

    toggle() {
        this._el.hidden = !this._el.hidden;
    }
}

class SignupForm extends IAbstractForm {
    constructor(togglingSlot) {      
        super({
            formTitle: 'Registration',
            fields: [
                {
                    label: 'Nickname',
                    type: globalValues.inputTypes.text,
                    placeholder: 'Nickname',
                    id: 'signup-nickname',
                    name: 'nickname'
                },
                {
                    label: 'Email',
                    type: globalValues.inputTypes.email,
                    placeholder: 'Email',
                    id: 'signup-email',
                    name: 'email'
                },
                {
                    label: 'Password',
                    type: globalValues.inputTypes.password,
                    placeholder: 'Password',
                    id: 'signup-password',
                    name: 'password'
                },
                {
                    label: 'Repeat рassword',
                    type: globalValues.inputTypes.password,
                    placeholder: 'Repeat password',
                    id: 'signup-password',
                    name: 'repeat-password'
                }
            ],
            downButtons: [
                new Buttons.SubmitInput({
                    text: 'Register!'
                }),
                new Buttons.PassiveButton({
                    text: 'Login',
                    events: [
                        {
                            name: 'click',
                            handler: togglingSlot
                        }   
                    ]
                })
            ]
        });
    }

    toggle() {
        this._el.hidden = !this._el.hidden;
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

        this._experimentalForm = new AuthForm(this.changeForms.bind(this));
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

        this._el.appendChild(this._experimentalForm.element);
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
