'use sctrict';

import ScoreboardSubsection from './subsections.js';
import modes from '../../../../components/globalData/modes.js';

const subsectionsOptions = {
    name: 'scoreboard',
    tabs: [
        {
            name: modes.SP,
            title: 'Singleplayer',
            avaliable: true,
            active: false,
            authDepends: false,
            sectionType: ScoreboardSubsection,
            sectionData: modes.SP
        },
        {
            name: modes.MP,
            title: 'Multiplayer',
            avaliable: true,
            active: false,
            authDepends: false,
            sectionType: ScoreboardSubsection,
            sectionData: modes.MP
        }
    ]
};

export default subsectionsOptions;