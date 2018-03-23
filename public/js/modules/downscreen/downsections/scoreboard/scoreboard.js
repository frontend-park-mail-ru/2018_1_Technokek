'use strict';

import AbstractSection from '/js/modules/tools/section/absctractSection.js';
import Table from '../../../tools/table/table.js';
import utiles from '../../../../components/utiles.js';
import globalValues from '../../../../components/gloabalData.js';
import scoreboardModel from '../../../../models/scoreboardModel.js';

import * as Buttons from '../../../tools/buttons/buttons.js';
import eventBus from '../../../../components/arcitectureElements/eventBus.js';
import tabbarEvents from '../../../../models/tabbar/eventsNames.js';


const scoreboardMode = {
    SINGLEPLAYER: 'singleplayer',
    MULTIPLAYER: 'multiplayer'
};

class Scoreboard extends AbstractSection{
    constructor(parentEl, tabModel = {}) {
        super(parentEl, tabModel);

        scoreboardModel.addDataClearedListener(this._clear.bind(this));
        scoreboardModel.addDataChangedListener(this._setData.bind(this));
        
        scoreboardModel.addSwitchToSingleplayerListener(this._toSingleplayer.bind(this));
        scoreboardModel.addSwitchToMultiplayerListener(this._toMultiplayer.bind(this));

        
        eventBus.on(
            tabbarEvents.ACTIVE_CHANGED({
                tabbarName: this._tabModel.parentName,
                tabName: this.name
            }),
            () => {
                if (this._tabModel.active) {
                    scoreboardModel.toSingleplayerMode();
                }
            }
        );
     }

    render() {
        const template = window.scoreboardTmplTemplate();
        this._el.appendChild(utiles.htmlToElements(template)[0]);

        this._renderButtons();
        this._renderTables();
        scoreboardModel.toSingleplayerMode();
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
                handler: (evt) => {
                    evt.preventDefault();
                    scoreboardModel.loadNextPage();
                }
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
        this._singleplayerBtn.acitvate();
        this._multiplayerBtn.deactivate();
        this._mTableContainer.hidden = true;
        this._sTableContainer.hidden = false;
    }

    _toMultiplayer() {
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
        this._clear();

        if (scoreboardModel.mode === scoreboardMode.SINGLEPLAYER) {
            this._singleplayerTable.extendRows(scoreboardModel.data);
        }
        if (scoreboardModel.mode === scoreboardMode.MULTIPLAYER) {
            this._multiplayerTable.extendRows(scoreboardModel.data);
        }
    }
}

export default Scoreboard;