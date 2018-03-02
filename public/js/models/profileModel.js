'use strict';

import globalValues from '../components/gloabalData.js';
import httpRequester from '../components/http.js';
import { listeners } from 'cluster';

class ProfileHistory {
    constructor() {
    }
}

class ProfileModel {
    constructor( { profileModule = {}, authForm = {}, signupForm = {} } = {} ) {
        this._isAuthinticated = false;
        this._profileModule = profileModule;
        this._authForm = authForm;
        this._signupForm = signupForm;
        this._authListeners = [];
        this._deauthListeners = [];
    }

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

    auth(authData) {
        console.log('auth', authData);

        httpRequester.doPost({
            url: globalValues.apiUrls.POST.AUTH,
            callback: (err, resp) => {
                this.checkAuth();
            },
            data: authData
        });   
    }

    signup(signupData) {
        console.log('signup', signupData);
    }

    logout() {
        console.log('logut');
    }

    setProfileModule(value) {
        console.log('setProfileModule');
    }

    get data() {
        console.log('[get] data');
        return true;
    }

    get email() {
        console.log('[get] emial');
        return true;
    }

    set email(value) {
        console.log('[set] email');
    }

    get nickname() {
        console.log('[get] nickname');
        return true;
    }

    set nickname(value) {
        console.log('[set] nickname');
    }

    changePassword({ oldPassword = '', newPassword = '' } = {}) {
        console.log('changePassword');
    }

    get history() {
        console.log('[get] history');
        return true;
    }

    get authenticated() {
        return this._isAuthinticated;
    }

    addAuthListener(listener) {
        this._authListeners.push(listener);
    }

    addDeauthListener(listener) {
        this._deauthListeners.push(listeners);
    }

    _deauthenticate() {
        console.log('deauthenticate');
        this._isAuthinticated = false;
        
        for (let listener of this._deauthListeners) {
            listener();
        }
    }

    _authenticate(resp) {
        console.log('authenticate', resp);
        this._isAuthinticated = true;

        for(let listener of this._authListeners) {
            listener();
        }
    }
}

const profileModel = new ProfileModel();

export default profileModel;