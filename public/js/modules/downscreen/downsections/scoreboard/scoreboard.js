'use strict';

import AbstractSection from '../abstractSection.js';
import Table from '../../../tools/table/table.js';
import utiles from '../../../../components/utiles.js';
import globalValues from '../../../../components/gloabalData.js';
import httpRequester from '../../../../components/http.js';

const scoreboardExample = [
    {
        'index': 1,
        'nickname': 'VitalyCherkov',
        'score': 1200
    },
    {
        'index': 2,
        'nickname': 'ShportIvan',
        'score': 1000
    },
    {
        'index': 3,
        'nickname': 'BusovVlad',
        'score': 800
    },
    {
        'index': 4,
        'nickname': 'KirillGadzhiev',
        'score': 700
    },
    {
        'index': 5,
        'nickname': 'KazantsevaKsy',
        'score': 600
    }
];

const MODE = {
    SINGLEPLAYER: 'singleplayer',
    MULTIPLAYER: 'multiplayer'
};

class Scoreboard extends AbstractSection{
    render() {
        const template = window.scoreboardTmplTemplate();
        this._el.appendChild(utiles.htmlToElements(template)[0]);

        this._scoreboardTable = new Table({
            columnsOptions: globalValues.tablesOptions.scoreboard.singleplayer
        });
        this._scoreboardTable.render();
        this._scoreboardTable.extendRows(scoreboardExample);

        const tableContainer = this._el.querySelector('.js-table-score-container');
        console.log('SBT: ', this._scoreboardTable.element);
        tableContainer.appendChild(this._scoreboardTable.element);
    }

    _loadSingleplayerScoreboard({
        mode = MODE.singleplayer,
        page = 1, 
        withClearing = false
    }) {
        if (withClearing) {
            this._scoreboardTable.clear();
        }

        httpRequester.doGet({
            url: globalValues.apiUrls.GET.SCOREBOARD,
            callback: (err, responce) => {
                console.log(err, responce);
            },
            data: { mode, page }
        });
    }
}

export default Scoreboard;