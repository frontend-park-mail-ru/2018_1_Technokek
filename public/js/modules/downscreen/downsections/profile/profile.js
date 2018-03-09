'use strict';

import utiles from '../../../../components/utiles.js';
import profileModel from '../../../../models/profileModel.js';
import * as Buttons from '../../../tools/buttons/buttons.js';
import AbstractSection from '../abstractSection.js';


class Profile extends AbstractSection {
    constructor(tabModel = {}) {
        super(tabModel);

        this._el.innerHTML = '';
        const template = window.profileTmplTemplate();
        this._el.appendChild(utiles.htmlToElements(template)[0]);

        this._connectToProfileModel();
    }

    render() {
        console.log('render');
        this._insertButtons();
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
        console.log('field val: ', value);
        const field = this._el.querySelector(fieldName);
        console.log(field);
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
                wide: true
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

        const logoutBtnContainer = this._el.querySelector('.js-logout-btn-section');
        logoutBtnContainer.innerHTML = '';
        logoutBtnContainer.appendChild(this._buttons.logoutBtn.element);
    }

    _toShowMode() {
        this._updateTmplData();
    }

    _toEditMode() {

    }
}

export default Profile;