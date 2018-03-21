'use strict';

import profileModel from '/js/models/profile/model.js';
import profileEvents from '/js/models/profile/eventsNames.js';
import utiles from '/js/components/utiles.js';
import eventBus from '/js/components/arcitectureElements/eventBus.js';
import * as Buttons from '/js/modules/tools/buttons/buttons.js';


class AuthorizedSection {
    constructor (seclector) {
        this._el = document.querySelector(seclector);

        eventBus.on(profileEvents.AUTHORIZED(), () => {
            this._el.hidden = false;
        });
        eventBus.on(profileEvents.DEAUTHORIZED(), () => {
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