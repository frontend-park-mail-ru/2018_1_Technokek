'use strict';

import httpRequester from '../components/http.js';

class ProfileHistory {
    constructor() {

    }
}

class ProfileModel {
    constructor( { profileModule = {} } = {} ) {
    }

    checkAuth() {
        console.log('checkAuth');
        return true;
    }

    auth(authData) {
        console.log('auth', authData);
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
}

const profileModel = new ProfileModel();

export default profileModel;