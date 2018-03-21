'use strict';

import globalValues from '../../components/gloabalData.js';
import httpRequester from '../../components/http.js';
import utiles from '../../components/utiles.js';
import eventBus from '../../components/arcitectureElements/eventBus.js';
import eventsTypes from '../../components/eventsTypes.js';
import profileEvents from './eventsNames.js';

class ProfileModel {
    constructor() {
        this._isAuthinticated = false;
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
            data,
            callback: (err, resp) => {
                if (err) {
                    callback(err);
                }

                this.checkAuth();
            }
        });
    }

    signup({ data = {}, callback = utiles.noop } = {}) {
        console.log('signup', data);

        httpRequester.doPost({
            url: globalValues.apiUrls.POST.SIGNUP,
            data,
            callback: (err, resp) => {
                if (err) {
                    callback(err);
                }
                
                this.checkAuth();
            }
        });
    }

    logout() {
        console.log('logut');

        httpRequester.doPost({
            url: globalValues.apiUrls.POST.LOGOUT
        });

        this.checkAuth();
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
        return this._data.email;
    }

    get nickname() {
        console.log('[get] nickname');
        return this._data.nickname;
    }

    get score() {
        console.log('[get] score');
        return this._data.score;
    }

    get games() {
        console.log('[get] games');
        return this._data.games;
    }

// ---------------------------------------------------------------------------------
// setters
// ---------------------------------------------------------------------------------

    changeEmail({ data = '', callback = utiles.noop } = {}) {
        console.log('[set] email');

        this._changeField({
            data: {
                field: 'email',
                value: data.email
            },
            callback
        });    
    }

    changeNickname({ data = '', callback = utiles.noop } = {}) {
        console.log('[set] nickname');

        this._changeField({
            data: {
                field: 'nickname',
                value: data.nickname
            },
            callback
        });  
    }

    changePassword({ data = {}, callback = utiles.noop } = {}) {
        console.log('changePassword');
        
        this._changeField({
            data: {
                field: 'password',
                value: data['old-password'],
                'new-password': data['new-password'],
                'new-password-repeat': data['new-password-repeat']
            },
            callback
        });  
    }

    get history() {
        console.log('[get] history');
        return true;
    }

    get authenticated() {
        return this._isAuthinticated;
    }

    _changeField({ data = {}, callback = utiles.noop } = {}) {
        console.log('field data to send', data);

        httpRequester.doPost({
            url: globalValues.apiUrls.POST.EDIT_USER,
            data,
            callback(err, resp) {
                if (err) {
                    callback(err);
                }
                else {
                    profileModel.checkAuth();
                }
            }
        });
    }

// ---------------------------------------------------------------------------------
// private signals
// ---------------------------------------------------------------------------------

    _deauthenticate() {
        console.log('deauthenticate');
        this._isAuthinticated = false;
        this._data = null;

        eventBus.call(profileEvents.DEAUTHORIZED());
        
        this._callListenersArray(this._deauthListeners);
    }

    _authenticate(resp) {
        console.log('authenticate', resp);
        this._data = resp;

        if (!this._isAuthinticated) {
            this._isAuthinticated = true;

            eventBus.call(profileEvents.AUTHORIZED());

            this._callListenersArray(this._authListeners);
        }

        this._dataChanged();
    }

    _dataChanged() {
        console.log('data changed');

        eventBus.call(profileEvents.DATA_CHANGED());

        this._callListenersArray(this._dataChangedListeners);
    }

    _callListenersArray(listeners) {
        for (let listener of listeners) {
            listener();
        }       
    }
}

const profileModel = new ProfileModel();

export default profileModel;