'use strict';

import utiles from "../../../../../components/utiles.js";
import historyModel from '../../../../../models/historyModel.js';
import globalValues from '../../../../../components/gloabalData.js';
import Table from '../../../../tools/table/table.js';

import * as Buttons from '../../../../tools/buttons/buttons.js';

const historyMode = {
    SINGLEPLAYER: 'singleplayer',
    MULTIPLAYER: 'multiplayer'
};

class HistorySection {
    constructor() {
        historyModel.addDataClearedListener(this._clear.bind(this));
        historyModel.addDataChangedListener(this._setData.bind(this));
        
        historyModel.addSwitchToSingleplayerListener(this._toSingleplayer.bind(this));
        historyModel.addSwitchToMultiplayerListener(this._toMultiplayer.bind(this));
    }

    render() {
        const template = window.historysectionTmplTemplate();
        this._el = utiles.htmlToElements(template)[0];

        this._renderButtons();
        this._renderTables();

        historyModel.toSingleplayerMode();
    }

    get element() {
        return this._el;
    }

    _renderButtons() {
        this._singleplayerBtn = new Buttons.UnderliningButton({
            text: 'Singleplayer',
            isActive: true,
            events: [{
                name: 'click',
                handler: historyModel.toSingleplayerMode.bind(historyModel)
            }]
        });

        this._multiplayerBtn = new Buttons.UnderliningButton({
            text: 'Multiplayer',
            isActive: false,
            events: [{
                name: 'click',
                handler: historyModel.toMultiplayerMode.bind(historyModel)
            }]
        });
        
        this._loadMoreBtn = new Buttons.PassiveButton({
            text: 'Load more',
            wide: true,
            events: [{
                name: 'click',
                handler: (evt) => {
                    evt.preventDefault();
                    historyModel.loadNextPage();
                }
            }]
        });

        const tabsContainer = this._el.querySelector('.js-history-buttons');
        tabsContainer.appendChild(this._singleplayerBtn.element);
        tabsContainer.appendChild(this._multiplayerBtn.element);

        const loadMoreContainer = this._el.querySelector('.js-load-more-container');
        loadMoreContainer.appendChild(this._loadMoreBtn.element);
    }

    _renderTables() {
        this._singleplayerTable = new Table({
            columnsOptions: globalValues.tablesOptions.gameHistory.singleplayer
        });

        this._multiplayerTable = new Table({
            columnsOptions: globalValues.tablesOptions.gameHistory.multiplayer
        });

        this._singleplayerTable.render();
        this._multiplayerTable.render();

        this._sTableContainer = this._el.querySelector('.js-singleplayer-history-container');
        this._mTableContainer = this._el.querySelector('.js-multiplayer-history-container');

        this._sTableContainer.appendChild(this._singleplayerTable.element);
        this._mTableContainer.appendChild(this._multiplayerTable.element);
    }

    _toSingleplayer() {
        console.log('to single player porfile');
        this._singleplayerBtn.acitvate();
        this._multiplayerBtn.deactivate();
        this._mTableContainer.hidden = true;
        this._sTableContainer.hidden = false;
    }

    _toMultiplayer() {
        console.log('to single MP porfile');
        this._multiplayerBtn.acitvate();
        this._singleplayerBtn.deactivate();
        this._mTableContainer.hidden = false;
        this._sTableContainer.hidden = true;
    }

    _clear() {
        this._singleplayerTable.clear();
        this._multiplayerTable.clear();
    }

    _setData() {
        console.log('set data history');

        this._clear();

        if (historyModel.mode === historyMode.SINGLEPLAYER) {
            this._singleplayerTable.extendRows(historyModel.data);
        }
        if (historyModel.mode === historyMode.MULTIPLAYER) {
            this._multiplayerTable.extendRows(historyModel.data);
        }
    }
}

export default HistorySection;