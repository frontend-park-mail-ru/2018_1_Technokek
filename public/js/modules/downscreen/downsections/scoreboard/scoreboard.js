'use strict';

import AbstractSection from '/js/modules/tools/section/absctractSection.js';
import SMTablesModule from '../../../tools/smTablesModule/smTablesModule.js';
import tabbarsOptions from '../../../../components/globalData/tabbarsOptions.js';



class Scoreboard extends AbstractSection {
    render() {
        console.log('scoreboard options', tabbarsOptions.SCOREBOARD);
        this._innderModule = new SMTablesModule(tabbarsOptions.SCOREBOARD);
        this._innderModule.render();
        this._el.appendChild(this._innderModule.element);
    }
}

export default Scoreboard;