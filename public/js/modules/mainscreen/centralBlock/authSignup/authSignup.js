'use strict';

import utils from '../../../../components/utiles.js';
import globalValues from '../../../../components/gloabalData.js';
import AbstractForm from '../../../tools/abstractForm/abstractForm.js';
import * as Buttons from '../../../tools/buttons/buttons.js';
import * as Toggling from '../../../tools/toggling/toggling.js';
import profileModel from '../../../../models/profileModel.js';
import utiles from '../../../../components/utiles.js';

class BaseAuthSignupForm extends AbstractForm {
    constructor({formOptions = {}, reciverCallback = utiles.noop} = {}) {
        super({
            formTitle: formOptions.formTitle,
            fields: formOptions.fields,
            submitBtnText: formOptions.submitBtnText,
            reciverCallback,
            downButtons: [
                new Buttons.PassiveButton(formOptions.changeFormBtn)
            ]
        });
    }
}

class AuthForm extends BaseAuthSignupForm {
    constructor() {      
        super({
            formOptions: globalValues.formsOptions.authForm, 
            reciverCallback: profileModel.auth.bind(profileModel)
        });
    }
}

class SignupForm extends BaseAuthSignupForm {
    constructor() {      
        super({
            formOptions: globalValues.formsOptions.signupForm, 
            reciverCallback: profileModel.signup.bind(profileModel)
        });
    }

    _isValid() {
        const baseResult = super._isValid();
        return this._comparePasswords() && baseResult; 
    }

    _comparePasswords() {
        const password = this._getFieldByName('password');
        const passwordRepeat = this._getFieldByName('repeat-password');

        console.log(password, passwordRepeat);

        if (password.value !== passwordRepeat.value) {
            passwordRepeat.error = globalValues.errors.input.passwordsCmp;       
            return false;
        }

        return true;
    }

    _getFieldByName(name) {
        for (let field of this._fields) {
            if (field.name === name) {
                return field;
            }
        }
    }
}

class AuthSignupFormContainer extends Toggling.AbstractTogglingItem {
    constructor({selector = '', togglingHandler = utils.noop, childFormClass = Object, hidden = true} = {}) {
        super({
            selector,
            childElement: new childFormClass(),
            hidden,
        });

        this._child.buttons[0].addListeners([
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
        const template = window.authsignupTmplTemplate();        
        const elements = utiles.htmlToElements(template);

        while (elements.length) {
            this._el.appendChild(elements[0]);
        }

        if (!this._togglingItems) {
            this._createForms();
        }

        for (let item of this._togglingItems) {
            item.render();
        }

        profileModel.addDeauthListener((evt) => {
            this._el.hidden = false;
        });

        profileModel.addAuthListener((evt) => {
            this._el.hidden = true;
        });
    }

    _createForms() {
        this._togglingItems = [
            new AuthSignupFormContainer({
                selector: '.js-auth-section',
                togglingHandler: this.changeItems.bind(this),
                childFormClass: AuthForm,
                hidden: false
            }),

            new AuthSignupFormContainer({
                selector: '.js-signup-section',
                togglingHandler: this.changeItems.bind(this),
                childFormClass: SignupForm,
                hidden: true
            })
        ];
    }
}

export default AuthSignup;
