'use strict';

import AbstractSection from '../abstractSection.js';
import Table from '../../../tools/table/table.js';
import utiles from '../../../../components/utiles.js';
import globalValues from '../../../../components/gloabalData.js';

class Scoreboard extends AbstractSection{
    render() {
        const template = window.scoreboardTmplTemplate();
        this._el.appendChild(utiles.htmlToElements(template)[0]);
    
        this._scoreboardTable = new Table(globalValues.tablesOptions.scoreboard.singleplayer);
        this._scoreboardTable.render();

        const tableContainer = this._el.querySelector('.js-table-score-container');
        tableContainer.appendChild(this._scoreboardTable.element);
    }
}

export default Scoreboard;