'use strict';

class Profile {
    constructor(selector) {
        this._el = document.querySelector(selector);
        this._el.hidden = true;
    }

    get hidden() {
        return this.el._hidden;
    }

    set hidden(val) {
        this._el.hidden = Boolean(val);
    }

    render() {
        this._el.innerHTML = window.profileTmplTemplate();
    }
}

export default Profile;