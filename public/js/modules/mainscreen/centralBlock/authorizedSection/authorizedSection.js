'use strict';

import profileModel from '../../../../models/profileModel.js';
import utiles from '../../../../components/utiles.js';
import * as Buttons from '../../../tools/buttons/buttons.js';


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
        this._multiplayerWithFriend = new Buttons.PLayButton({
            text: 'Play with friend',
            wide: true
        });
        
        this._multiplayerWithStranger = new Buttons.PLayButton({
            text: 'Play with stranger',
            wide: true
        });

        const container = this._el.querySelector('.js-play-buttons-container');
        container.appendChild(this._multiplayerWithFriend.element);
        container.appendChild(this._multiplayerWithStranger.element);
        
    }
}

export default AuthorizedSection;