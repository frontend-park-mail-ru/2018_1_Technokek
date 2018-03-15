'use strict';

import AbstractSection from '../abstractSection.js';
import Table from '../../../tools/table/table.js';
import utiles from '../../../../components/utiles.js';
import globalValues from '../../../../components/gloabalData.js';
import httpRequester from '../../../../components/http.js';
import scoreboardModel from '../../../../models/scoreboardModel.js';

import * as Buttons from '../../../tools/buttons/buttons.js';


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

        const tableContainer = this._el.querySelector('.js-singleplayer-scoreboard-container');
        tableContainer.appendChild(this._scoreboardTable.element);

        this._renderButtons();
    }

    _renderButtons() {
        this._singleplayerBtn = new Buttons.UnderliningButton({
            text: 'Singleplayer',
            isActive: true
        });

        this._multiplayerBtn = new Buttons.UnderliningButton({
            text: 'Multiplayer',
            isActive: false
        });

        const container = this._el.querySelector('.js-scoreboard-buttons');
        container.appendChild(this._singleplayerBtn.element);
        container.appendChild(this._multiplayerBtn.element);
    }
}

export default Scoreboard;