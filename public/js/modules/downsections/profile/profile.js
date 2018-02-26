'use strict';

class Profile {
    constructor(selector) {
        this._el = document.querySelector(selector);
    }

    render() {
        this._el.innerHTML = window.profileTmplTemplate();
    }
}

export default Profile;