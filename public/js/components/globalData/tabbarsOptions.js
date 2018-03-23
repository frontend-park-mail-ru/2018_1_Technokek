
'use strict';

import Rules from "../../modules/downscreen/downsections/rules/rules.js";
import Profile from "../../modules/downscreen/downsections/profile/profile.js";
import Scoreboard from "../../modules/downscreen/downsections/scoreboard/scoreboard.js";

const tabbarsOprions = {
    MAIN: {
        name: 'main',
        tabs: [
            {
                name: 'profile',
                title: 'Profile',
                avaliable: false,
                active: false,
                sectionType: Profile,
                authDepends: true
            },
            {
                name: 'rules',
                title: 'Rules',
                avaliable: true,
                active: false,
                sectionType: Rules,
                authDepends: false
            },
            {
                name: 'scoreboard',
                title: 'Scoreboard',
                avaliable: true,
                active: false,
                sectionType: Scoreboard,
                authDepends: false
            },
        ]
    },
    HISTORY: {
        name: 'history',
        tabs: [
            {
                name: 'singleplayer',
                title: 'Singleplayer',
                avaliable: true,
                active: true,
                authDepends: false
            },
            {
                name: 'multiplayer',
                title: 'Multiplauer',
                avaliable: true,
                active: false,
                authDepends: false
            }
        ]
    },
    SCOREBOARD: {
        name: 'scoreboard',
        tabs: [
            {
                name: 'singleplayer',
                title: 'Singleplayer',
                avaliable: true,
                active: true,
                authDepends: false
            },
            {
                name: 'multiplayer',
                title: 'Multiplauer',
                avaliable: true,
                active: false,
                authDepends: false
            }
        ]
    }
};

export default tabbarsOprions;