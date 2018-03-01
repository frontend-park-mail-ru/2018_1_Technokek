'use strict';

import Rules from '../modules/downsections/rules/rules.js';
import Profile from '../modules/downsections/profile/profile.js';
import Scoreboard from '../modules/downsections/scoreboard/scoreboard.js';

class GlobalValues {
    get initialTabs() {
        return [
            {
                title: 'Vilaly Cherkov',
                jsClass: 'js-profile-section',
                sectionSelect: Profile
            },
            {
                title: 'Rules',
                jsClass: 'js-rules-section',
                sectionSelect: Rules
            },
            {
                title: 'Scoreboard',
                jsClass: 'js-scoreboard-section',
                sectionSelect: Scoreboard
            }
        ];
    }

    get inputTypes() {
        return {
            email: 'email',
            password: 'password',
            text: 'text'
        };
    }
}

const globalValues = new GlobalValues();

export default globalValues;