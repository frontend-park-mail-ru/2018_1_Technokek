'use strict';

import globalValues from '../../../../../components/gloabalData.js';
import utiles from '../../../../../components/utiles.js';
import * as Toggling from '../../../../tools/toggling/toggling.js';
import * as Buttons from '../../../../tools/buttons/buttons.js';
import AbstractForm from '../../../../tools/abstractForm/abstractForm.js';
import profileModel from '../../../../../models/profile/model.js';


class FieldView {
    constructor({label = '', value = '', dataGetter = profileModel.data} = {}) {
        const template = window.viewmodeTmplTemplate({ label: label, value: value });
        this._el = utiles.htmlToElements(template)[0];
        this._dataGetter = dataGetter;

        profileModel.addDataChangedListener(this.reloadValue.bind(this));
    }

    render() { }

    get element() {
        return this._el;
    }

    reloadValue() {
        this._el.querySelector('.js-field-value').textContent = this._dataGetter();
    }
}


// Поле редактирования в режиме отображения
class EditFieldTogglingItem extends Toggling.AbstractTogglingItem {
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


class FieldEditToggler extends Toggling.AbstractToggler {
    constructor({
        selector,
        viewChild,
        formChild
    }) {
        super(selector);
        this._viewChild = viewChild;
        this._formChild = formChild;

        profileModel.addDataChangedListener(() => this._toViewMode());
    }

    render() {
        this._togglingItems = [
            new EditFieldTogglingItem({
                parent: this._el,
                selector: '.js-view-item',
                childElement: this._viewChild,
                hidden: false,
                togglingBtnText: 'Change',
                togglingBtnListener: this.changeItems.bind(this)
            }),
            new EditFieldTogglingItem({
                parent: this._el,
                selector: '.js-form-item',
                childElement: this._formChild,
                hidden: true,
                togglingBtnText: 'Cancel',
                togglingBtnListener: this.changeItems.bind(this)
            })
        ];

        for (let item of this._togglingItems) {
            item.render();
        }
    }

    _toViewMode() {
        this._togglingItems[0].hidden = false;
        this._togglingItems[1].hidden = true;
    }
}


class NicknameToggler extends FieldEditToggler {
    constructor(selector) {
        super({
            selector,
            viewChild: new FieldView({ 
                label: 'Nickname', 
                dataGetter: () => profileModel.nickname 
            }),
            formChild: new AbstractForm({
                fields: globalValues.formsOptions.nicknameForm.fields,
                fieldTemplateFunction: window.editinputTmplTemplate,
                templateFunction: window.editmodeTmplTemplate,
                reciverCallback: profileModel.changeNickname.bind(profileModel)
            })
        });
    }
}


class EmailToggler extends FieldEditToggler {

    constructor(selector) {
        super({
            selector,
            viewChild: new FieldView({ 
                label: 'Email', 
                dataGetter: () => profileModel.email 
            }),
            formChild: new AbstractForm({
                fields: globalValues.formsOptions.emailForm.fields,
                fieldTemplateFunction: window.editinputTmplTemplate,
                templateFunction: window.editmodeTmplTemplate,
                reciverCallback: profileModel.changeEmail.bind(profileModel)
            })
        });
    }
}


class PasswordToggler extends FieldEditToggler {

    constructor(selector) {
        super({
            selector,
            viewChild: new FieldView({ 
                label: 'Password', 
                dataGetter: () => '***...***' 
            }),
            formChild: new AbstractForm({
                fields: globalValues.formsOptions.passwordForm.fields,
                fieldTemplateFunction: window.editinputTmplTemplate,
                templateFunction: window.editmodeTmplTemplate,
                reciverCallback: profileModel.changePassword.bind(profileModel)
            })
        });
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
}

export default EditSection;