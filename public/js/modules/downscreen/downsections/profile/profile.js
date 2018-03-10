'use strict';

import utiles from '../../../../components/utiles.js';
import profileModel from '../../../../models/profileModel.js';
import * as Buttons from '../../../tools/buttons/buttons.js';
import * as Toggling from '../../../tools/toggling/toggling.js';
import AbstractSection from '../abstractSection.js';

const modes = {
    SHOW: 0,
    EDIT: 1
};

// Поле редактирования в режиме отображения
class EditFieldOnShow extends Toggling.AbstractTogglingItem {
    constructor({
        
    }) {

    }
}

// Поле редактирования в режиме формы
class EditFieldOnForm extends Toggling.AbstractTogglingItem {

}

class EditFieldToggler extends Toggling.AbstractToggler {

}

class EditSection {
    constructor() {
        const template = window.editsectionTmplTemplate();
        this._el = utiles.htmlToElements(template)[0];
    }

    render() {

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

class Profile extends AbstractSection {
    constructor(tabModel = {}) {
        super(tabModel);

        this._el.innerHTML = '';
        const template = window.profileTmplTemplate();
        this._el.appendChild(utiles.htmlToElements(template)[0]);

        this._mode = modes.EDIT;

        this._connectToProfileModel();
    }

    render() {
        this._insertButtons();
        this._insertEditSection();
        this._checkMode();
    }

    _updateTmplData() {
        this._updateTmplEmail(profileModel.email);
        this._updateTmplNickname(profileModel.nickname);
        this._updateTmplGames(profileModel.games);
        this._updateTmplScore(profileModel.score);
    }

    _clearTmplData() {
        this._updateTmplEmail('');
        this._updateTmplNickname('');
        this._updateTmplGames('');
        this._updateTmplScore('');
    }

    _updateTmplEmail(newEmail) {
        this._updateTmplField('.js-email-field', newEmail);
    }

    _updateTmplNickname(newNickname) {
        // this._updateTmplField('js-nickname-field', newNickname);
    }

    _updateTmplGames(newGamesCount) {
        this._updateTmplField('.js-games-field', newGamesCount);
    }

    _updateTmplScore(newScore) {
        this._updateTmplField('.js-score-field', newScore);
    }

    _updateTmplField(fieldName, value) {
        const field = this._el.querySelector(fieldName);
        field.textContent = value;
    }

    _connectToProfileModel() {
        profileModel.addAuthListener(this._toShowMode.bind(this));
        profileModel.addDataChangedListener(this._updateTmplData.bind(this));
        profileModel.addDeauthListener(this._clearTmplData.bind(this));
    }

    _insertButtons() {
        this._buttons = {
            editBtn: new Buttons.ActiveButton({
                text: 'Edit Profile',
                wide: true,
                events: [{
                    name: 'click',
                    handler: (evt) => {
                        evt.preventDefault();
                        this._toEditMode();
                    }
                }]
            }),
            stopEditBtn: new Buttons.ActiveButton({
                text: 'To profile',
                wide: true,
                events: [{
                    name: 'click',
                    handler: (evt) => {
                        evt.preventDefault();
                        this._toShowMode();
                    }
                }]
            }),
            logoutBtn: new Buttons.PassiveButton({
                text: 'Logout',
                wide: true,
                events: [{
                    name: 'click',
                    handler: (evt) => {
                        evt.preventDefault();
                        profileModel.logout();
                    }
                }]
            })
        };

        const editBtnContainer = this._el.querySelector('.js-edit-btn-section');
        editBtnContainer.innerHTML = '';
        editBtnContainer.appendChild(this._buttons.editBtn.element);
        editBtnContainer.appendChild(this._buttons.stopEditBtn.element);

        const logoutBtnContainer = this._el.querySelector('.js-logout-btn-section');
        logoutBtnContainer.innerHTML = '';
        logoutBtnContainer.appendChild(this._buttons.logoutBtn.element);
    }

    _insertEditSection() {
        this._editSection = new EditSection();
        const container = this._el.querySelector('.js-profile-center');
        container.appendChild(this._editSection.element);
    }

    _checkMode() {
        switch (this._mode) {
            case modes.EDIT:
                this._toEditMode();
                break;
            case modes.SHOW:
                this._toShowMode();
                break;
            default:
                break;
        }
    }

    _toShowMode() {
        this._mode = modes.SHOW;

        this._updateTmplData();

        this._editElementsHidden(true);
        this._showElementsHidden(false);
    }

    _toEditMode() {
        this._mode = modes.EDIT;

        this._editElementsHidden(false);
        this._showElementsHidden(true);
    }

    _editElementsHidden(val) {
        val = Boolean(val);
        
        this._editSection.hidden = val;
        this._buttons.stopEditBtn.element.hidden = val;
    }

    _showElementsHidden(val) {
        val = Boolean(val);

        this._buttons.editBtn.element.hidden = val;
        this._el.querySelector('.js-personal-info').hidden = val;
    }
}

export default Profile;