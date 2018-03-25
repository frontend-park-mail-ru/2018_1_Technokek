
'use strict';

import Rules from "../../modules/downscreen/downsections/rules/rules.js";
import Profile from "../../modules/downscreen/downsections/profile/profile.js";
import Scoreboard from "../../modules/downscreen/downsections/scoreboard/scoreboard.js";
import SMTablesModule from "../../modules/tools/smTablesModule/smTablesModule.js";
import SMSubsection from "../../modules/tools/smTablesModule/subsection.js";

import tablesNames from "./tablesNames.js";
import tablesOptions from "./tablesOptions.js";
import modes from "./modes.js";


const tabbarsOptions = {
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
                authDepends: false,
                sectionType: SMSubsection,
                sectionData: {
                    table: tablesOptions[tablesNames.HISTORY][modes.SP]
                }
            },
            {
                name: 'multiplayer',
                title: 'Multiplayer',
                avaliable: true,
                active: false,
                authDepends: false,
                sectionType: SMSubsection,
                sectionData: {
                    table: tablesOptions[tablesNames.HISTORY][modes.MP]
                }
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
                authDepends: false,
                sectionType: SMSubsection,
                sectionData: {
                    table: tablesOptions[tablesNames.SCOREBOARD][modes.SP]
                }
            },
            {
                name: 'multiplayer',
                title: 'Multiplayer',
                avaliable: true,
                active: false,
                authDepends: false,
                sectionType: SMSubsection,
                sectionData: {
                    table: tablesOptions[tablesNames.SCOREBOARD][modes.MP]
                }
            }
        ]
    }
};

export default tabbarsOptions;