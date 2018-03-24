
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
                authDepends: true,
                sectionType: Profile
            },
            {
                name: 'rules',
                title: 'Rules',
                avaliable: true,
                active: false,
                authDepends: false,
                sectionType: Rules
            },
            {
                name: 'scoreboard',
                title: 'Scoreboard',
                avaliable: true,
                active: false,
                authDepends: false,
                sectionType: Scoreboard
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
                title: 'Multiplayer',
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
                active: false,
                authDepends: false
            },
            {
                name: 'multiplayer',
                title: 'Multiplayer',
                avaliable: true,
                active: false,
                authDepends: false
            }
        ]
    }
};

export default tabbarsOprions;