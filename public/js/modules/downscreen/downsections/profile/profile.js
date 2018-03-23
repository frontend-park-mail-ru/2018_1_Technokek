'use strict';

import utiles from '/js/components/utiles.js';
import globalValues from '/js/components/gloabalData.js';

import profileModel from '/js/models/profile/model.js';
import profileEvents from '/js/models/profile/eventsNames.js';

import * as Buttons from '/js/modules/tools/buttons/buttons.js';
import * as Toggling from '/js/modules/tools/toggling/toggling.js';
import AbstractForm from '/js/modules/tools/abstractForm/abstractForm.js';
import AbstractSection from '../abstractSection.js';
import EditSection from './editSection/editSection.js';
import HistorySection from './historySection/historySection.js';
import eventBus from '/js/components/arcitectureElements/eventBus.js';

const modes = {
    SHOW: 0,
    EDIT: 1
};

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
        this._insertSections();
        this._checkMode();
    }

    _reload() {
        
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
        this._updateTmplField('.js-nickname-field', newNickname);
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
        eventBus.on(profileEvents.AUTHORIZED(), this._toShowMode.bind(this));
        eventBus.on(profileEvents.DATA_CHANGED(), this._updateTmplData.bind(this));
        eventBus.on(profileEvents.DEAUTHORIZED(), this._clearTmplData.bind(this));
    }

    _insertButtons() {
        this._buttons = {
            editBtn: new Buttons.PrimaryButton({
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
            stopEditBtn: new Buttons.PrimaryButton({
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

    _insertSections() {
        this._editSection = new EditSection();
        this._historySection = new HistorySection();
        const container = this._el.querySelector('.js-profile-center');
        
        this._historySection.render();
        
        container.appendChild(this._editSection.element);
        container.appendChild(this._historySection.element);
        
        this._editSection.render();
        
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

        this._historySection.element.hidden = val;
        this._buttons.editBtn.element.hidden = val;
        this._el.querySelector('.js-personal-info').hidden = val;
    }
}

export default Profile;