'use strict';

import AbstractSection from '../abstractSection.js';
import Table from '../../../tools/table/table.js';
import utiles from '../../../../components/utiles.js';
import globalValues from '../../../../components/gloabalData.js';
import httpRequester from '../../../../components/http.js';
import scoreboardModel from '../../../../models/scoreboardModel.js';
import * as SBModes from '../../../../models/scoreboardModel.js';

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
    constructor(tabModel = {}) {
        super(tabModel);

        this._tabModel.addActiveListener(this._toSingleplayer.bind(this));
        scoreboardModel.addDataClearedListener(this._clear.bind(this));
        scoreboardModel.addDataChangedListener(this._setData.bind(this));
        scoreboardModel.addSwitchToSingleplayerListener(this._toSingleplayer.bind(this));
        scoreboardModel.addSwitchToMultiplayerListener(this._toMultiplayer.bind(this));
    }

    render() {
        const template = window.scoreboardTmplTemplate();
        this._el.appendChild(utiles.htmlToElements(template)[0]);

        // this._scoreboardTable = new Table({
        //     columnsOptions: globalValues.tablesOptions.scoreboard.singleplayer
        // });
        // this._scoreboardTable.render();
        // this._scoreboardTable.extendRows(scoreboardExample);

        // const tableContainer = this._el.querySelector('.js-singleplayer-scoreboard-container');
        // tableContainer.appendChild(this._scoreboardTable.element);

        this._renderButtons();
        this._renderTables();
    }

    _renderButtons() {
        this._singleplayerBtn = new Buttons.UnderliningButton({
            text: 'Singleplayer',
            isActive: true,
            events: [{
                name: 'click',
                handler: scoreboardModel.toSingleplayerMode.bind(scoreboardModel)
            }]
        });

        this._multiplayerBtn = new Buttons.UnderliningButton({
            text: 'Multiplayer',
            isActive: false,
            events: [{
                name: 'click',
                handler: scoreboardModel.toMultiplayerMode.bind(scoreboardModel)
            }]
        });

        this._loadMoreBtn = new Buttons.PassiveButton({
            text: 'Load more',
            wide: true,
            events: [{
                name: 'click',
                handler: scoreboardModel.loadNextPage.bind(scoreboardModel)
            }]
        });

        const tabsContainer = this._el.querySelector('.js-scoreboard-buttons');
        tabsContainer.appendChild(this._singleplayerBtn.element);
        tabsContainer.appendChild(this._multiplayerBtn.element);

        const loadMoreContainer = this._el.querySelector('.js-load-more-container');
        loadMoreContainer.appendChild(this._loadMoreBtn.element);
    }

    _renderTables() {
        this._singleplayerTable = new Table({
            columnsOptions: globalValues.tablesOptions.scoreboard.singleplayer
        });

        this._multiplayerTable = new Table({
            columnsOptions: globalValues.tablesOptions.scoreboard.multiplayer
        });

        this._singleplayerTable.render();
        this._multiplayerTable.render();

        this._sTableContainer = this._el.querySelector('.js-singleplayer-scoreboard-container');
        this._mTableContainer = this._el.querySelector('.js-multiplayer-scoreboard-container');

        this._sTableContainer.appendChild(this._singleplayerTable.element);
        this._mTableContainer.appendChild(this._multiplayerTable.element);
    }

    _toSingleplayer() {
        this._multiplayerBtn.deactivate();
        this._mTableContainer.hidden = true;
        this._sTableContainer.hidden = false;

        scoreboardModel.toSingleplayerMode();
    }

    _toMultiplayer() {
        this._singleplayerBtn.deactivate();
        this._mTableContainer.hidden = false;
        this._sTableContainer.hidden = true;

        scoreboardModel.toMultiplayerMode();
    }

    _clear() {
        this._singleplayerTable.clear();
        this._multiplayerTable.clear();
    }

    _setData() {
        if (scoreboardModel.mode === SBModes.SINGLEPLAYER) {
            this._singleplayerTable.extendRows({
                rows: scoreboardModel.data
            });
        }
        if (scoreboardModel.mode === SBModes.MULTIPLAYER) {
            this._multiplayerTable.extendRows({
                rows: scoreboardModel.data
            });
        }
    }
}

export default Scoreboard;