'use strict';

import profileModel from '../../../../models/profileModel.js';

class AuthorizedSection {
    constructor (seclector) {
        this._el = document.querySelector(seclector);

        profileModel.addAuthListener(() => {
            this._el.hidden = false;
        });

        profileModel.addDeauthListener(() => {
            this._el.hidden = true;
        });
    }

    render() {

    }
}

export default AuthorizedSection;