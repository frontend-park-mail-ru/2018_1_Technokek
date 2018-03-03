'use strict';

import globalValues from '../components/gloabalData.js';
import httpRequester from '../components/http.js';
import utiles from '../components/utiles.js';

class ProfileHistory {
    constructor() {
    }
}

class ProfileModel {
    constructor() {
        this._isAuthinticated = false;    
        this._authListeners = [];
        this._deauthListeners = [];
        this._dataChangedListeners = [];
    }

// ---------------------------------------------------------------------------------
// responces
// ---------------------------------------------------------------------------------

    checkAuth() {
        console.log('checkAuth');
        
        httpRequester.doGet({
            url: globalValues.apiUrls.GET.ME,
            callback: (err, resp) => {
                if (err) {
                    this._deauthenticate();
                }
                else {
                    this._authenticate(resp);
                }
            }
        });
    }

    auth({ data = {}, callback = utiles.noop } = {}) {
        console.log('auth', data);

        httpRequester.doPost({
            url: globalValues.apiUrls.POST.AUTH,
            callback: (err, resp) => {
                this.checkAuth();
            },
            data
        });   
    }

    signup({ data = {}, callback = utiles.noop } = {}) {
        console.log('signup', data);
    }

    logout() {
        console.log('logut');
        this._deauthenticate();
    }

// ---------------------------------------------------------------------------------
// getters
// ---------------------------------------------------------------------------------

    get data() {
        console.log('[get] data');
        return true;
    }

    get email() {
        console.log('[get] emial');
        return true;
    }

    get nickname() {
        console.log('[get] nickname');
        return true;
    }

    get score() {
        console.log('[get] score');
        return true;
    }

    get games() {
        console.log('[get] games');
        return true;
    }

// ---------------------------------------------------------------------------------
// setters
// ---------------------------------------------------------------------------------

    changeEmail({ value = '', callback = utiles.noop } = {}) {
        console.log('[set] email');
        this._dataChanged();
    }

    changeNickname({ value = '', callback = utiles.noop } = {}) {
        console.log('[set] nickname');
        this._dataChanged();
    }

    changePassword({ oldPassword = '', newPassword = '', callback = utiles.noop } = {}) {
        console.log('changePassword');
        this._dataChanged();
    }

    get history() {
        console.log('[get] history');
        return true;
    }

    get authenticated() {
        return this._isAuthinticated;
    }

// ---------------------------------------------------------------------------------
// work with listeners
// ---------------------------------------------------------------------------------

    addAuthListener(listener) {
        this._authListeners.push(listener);
    }

    addDeauthListener(listener) {
        this._deauthListeners.push(listener);
    }

    addDataChangedListener(listener) {
        this._dataChangedListeners.push(listener);
    }

// ---------------------------------------------------------------------------------
// private signals
// ---------------------------------------------------------------------------------

    _deauthenticate() {
        console.log('deauthenticate');
        this._isAuthinticated = false;
        this._data = null;
        
        for (let listener of this._deauthListeners) {
            listener();
        }
    }

    _authenticate(resp) {
        console.log('authenticate', resp);
        this._isAuthinticated = true;
        this._data = resp;

        for(let listener of this._authListeners) {
            listener();
        }
    }

    _dataChanged() {
        for (let listener of this._dataChangedListeners) {
            listener();
        }
    }
}

const profileModel = new ProfileModel();

export default profileModel;