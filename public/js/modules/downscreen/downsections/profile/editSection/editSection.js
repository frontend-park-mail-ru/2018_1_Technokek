'use strict';

import globalValues from '../../../../../components/gloabalData.js';
import utiles from '../../../../../components/utiles.js';
import * as Toggling from '../../../../tools/toggling/toggling.js';
import * as Buttons from '../../../../tools/buttons/buttons.js';
import AbstractForm from '../../../../tools/abstractForm/abstractForm.js';
import profileModel from '../../../../../models/profileModel.js';


class FieldView {
    constructor({label = '', value = ''} = {}) {
        const template = window.viewmodeTmplTemplate({ label: label, value: value });
        this._el = utiles.htmlToElements(template)[0];
    }

    render() { }

    get element() {
        return this._el;
    }
}

// Поле редактирования в режиме отображения
class EditFieldToggler extends Toggling.AbstractTogglingItem {
    constructor({
        parent = document,
        selector = null, 
        childElement = {}, 
        hidden = true, 
        togglingBtnText = '', 
        togglingBtnListener = utiles.noop
    } = {}) {
        super({ parent, selector, childElement, hidden });

        this._changeBtn = new Buttons.PassiveButton({
            text: togglingBtnText,
            events: [{
                name: 'click',
                handler: (evt) => {
                    evt.preventDefault();
                    togglingBtnListener();
                }
            }]
        });
        console.log(this._changeBtn);
    }

    render() {
        super.render();

        const template = window.fieldtogglerTmplTemplate();
        const inners = utiles.htmlToElements(template);
        
        while (inners.length) {
            this._el.appendChild(inners[0]);
        }

        const btnContainer = this._el.querySelector('.js-edit-container-params');
        btnContainer.appendChild(this._changeBtn.element);
    }

    toggle() {
        super.toggle();
        if (this._child.reset) {
            this._child.reset();
        }
    }
}

// TODO: 
class NicknameToggler extends Toggling.AbstractToggler {
    render() {
        console.log(this._el);

        this._togglingItems = [
            new EditFieldToggler({
                parent: this._el,
                selector: '.js-view-item',
                childElement: new FieldView({ label: 'Nickname' }),
                hidden: false,
                togglingBtnText: 'Change',
                togglingBtnListener: this.changeItems.bind(this)
            }),
            new EditFieldToggler({
                parent: this._el,
                selector: '.js-form-item',
                childElement: new AbstractForm({
                    fields: globalValues.formsOptions.nicknameForm.fields,
                    fieldTemplateFunction: window.editinputTmplTemplate,
                    templateFunction: window.editmodeTmplTemplate
                }),
                hidden: true,
                togglingBtnText: 'Cancel',
                togglingBtnListener: this.changeItems.bind(this)
            })
        ];

        for (let item of this._togglingItems) {
            item.render();
        }
    }
}

class EmailToggler extends Toggling.AbstractToggler {
    render() {
        this._togglingItems = [
            new EditFieldToggler({
                parent: this._el,
                selector: '.js-view-item',
                childElement: new FieldView({ label: 'Email' }),
                hidden: false,
                togglingBtnText: 'Change',
                togglingBtnListener: this.changeItems.bind(this)
            }),
            new EditFieldToggler({
                parent: this._el,
                selector: '.js-form-item',
                childElement: new AbstractForm({
                    fields: globalValues.formsOptions.emailForm.fields,
                    fieldTemplateFunction: window.editinputTmplTemplate,
                    templateFunction: window.editmodeTmplTemplate
                }),
                hidden: true,
                togglingBtnText: 'Cancel',
                togglingBtnListener: this.changeItems.bind(this)
            })
        ];

        for (let item of this._togglingItems) {
            item.render();
        }
    }
}

class PasswordToggler extends Toggling.AbstractToggler {
    render() {
        this._togglingItems = [
            new EditFieldToggler({
                parent: this._el,
                selector: '.js-view-item',
                childElement: new FieldView({ label: 'Password', value: '***...***' }),
                hidden: false,
                togglingBtnText: 'Change',
                togglingBtnListener: this.changeItems.bind(this)
            }),
            new EditFieldToggler({
                parent: this._el,
                selector: '.js-form-item',
                childElement: new AbstractForm({
                    fields: globalValues.formsOptions.passwordForm.fields,
                    fieldTemplateFunction: window.editinputTmplTemplate,
                    templateFunction: window.editmodeTmplTemplate
                }),
                hidden: true,
                togglingBtnText: 'Cancel',
                togglingBtnListener: this.changeItems.bind(this)
            })
        ];

        for (let item of this._togglingItems) {
            item.render();
        }
    }
}

class EditSection {
    constructor() {
        const template = window.editsectionTmplTemplate();
        this._el = utiles.htmlToElements(template)[0];
    }

    render() {
        this._nicknameToggler = new NicknameToggler('.js-edit-nickname');
        this._nicknameToggler.render();

        this._emailToggler = new EmailToggler('.js-edit-email');
        this._emailToggler.render();

        this._passwordToggler = new PasswordToggler('.js-edit-password');
        this._passwordToggler.render();
        
        this._insertForms();
    }

    get element() {
        return this._el;
    }

    toggle() {
        this._el.hidden = !this._el.hidden;
    }

    get hidden() {
        return this._el.hidden;
    }

    set hidden(val) {
        this._el.hidden = Boolean(val);
    }

    _insertForms() {
        const container = this._el.querySelector('.js-edit-fields-list');

        
    }
}

export default EditSection;