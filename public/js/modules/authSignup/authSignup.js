'use strict';

import utils from '../../components/utiles.js';
import globalValues from '../../components/gloabalData.js';
import AbstractForm from '../tools/abstractForm/abstractForm.js';
import * as Buttons from '../tools/buttons/buttons.js';
import * as Toggling from '../tools/toggling/toggling.js';

class AuthForm extends AbstractForm {
    constructor() {      
        const authFormOptions = globalValues.formsOptions.authForm;
        
        super({
            formTitle: authFormOptions.formTitle,
            fields: authFormOptions.fields,
            downButtons: [
                new Buttons.SubmitInput(authFormOptions.buttons.submit),
                new Buttons.PassiveButton(authFormOptions.buttons.changeForm)
            ]
        });
    }
}

class SignupForm extends AbstractForm {
    constructor() {
        const signupFormOptions = globalValues.formsOptions.signupForm;
        
        super({
            formTitle: signupFormOptions.formTitle,
            fields: signupFormOptions.fields,
            downButtons: [
                new Buttons.SubmitInput(signupFormOptions.buttons.submit),
                new Buttons.PassiveButton(signupFormOptions.buttons.changeForm)
            ]
        });
    }
}

class AuthFormContainer extends Toggling.AbstractTogglingItem {
    constructor({selector = '', togglingHandler = utils.noop} = {}) {
        super({
            selector,
            childElement: new AuthForm(),
            hidden: false,
        });;

        this._child.buttons[1].addListeners([
            {
                name: 'click',
                handler: togglingHandler
            }
        ]);
    }
}

class SignupFormContainer extends Toggling.AbstractTogglingItem {
    constructor({selector = '', togglingHandler = utils.noop} = {}) {
        super({
            selector,
            childElement: new SignupForm(),
            hidden: true,
        });

        console.log(this._child.buttons.changeForm);

        this._child.buttons[1].addListeners([
            {
                name: 'click',
                handler: togglingHandler
            }
        ]);
    }
}

class AuthSignup extends Toggling.AbstractToggler {
    clear() {
        this._el.innerHTML = '';
    }

    render() {
        this._el.innerHTML = window.authsignupTmplTemplate();

        if(!this._togglingItems) {
            this._createForms();
        }
    }

    _createForms() {
        this._togglingItems = [
            new AuthFormContainer({
                selector: '.js-auth-section',
                togglingHandler: this.changeItems.bind(this)
            }),

            new SignupFormContainer({
                selector: '.js-signup-section',
                togglingHandler: this.changeItems.bind(this)
            })
        ];
    }
}

export default AuthSignup;
