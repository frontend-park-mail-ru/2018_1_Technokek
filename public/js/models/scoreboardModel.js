'use strict';

import profileModel from './profileModel.js';
import httpRequester from '../components/http.js';
import globalValues from '../components/gloabalData.js';

const scoreboardMode = {
    SINGLEPLAYER: 'singleplayer',
    MULTIPLAYER: 'multiplayer'
};

class ScoreboardModel {
    constructor () {
        this._currentMode = null;
        
        this._data = {};
        
        this._data[scoreboardMode.SINGLEPLAYER] = {
            rows: [],
            currentPage: 0
        };

        this._data[scoreboardMode.MULTIPLAYER] = {
            rows: [],
            currentPage: 0
        };
    }

    get mode() {
        return this._currentMode;
    }
    
    toSingleplayerMode() {
        if (this._currentMode !== scoreboardMode.SINGLEPLAYER) {
            this._setMode(scoreboardMode.SINGLEPLAYER);
            this._callSwitchToSingleplayerListeners();
        }
    }

    toMultiplayerMode() {
        if (this._currentMode !== scoreboardMode.MULTIPLAYER) {
            this._setMode(scoreboardMode.MULTIPLAYER);
            this._callSwitchToMultiplayerListeners();
        }
    }

    _setMode(mode) {
        this._currentMode = mode;
        this.clear();
        this.loadNextPage();
    }

    clear() {
        for (let key in this._data) {
            const item = this._data[key];
            item.rows = [];
            item.currentPage = 0;
        }

        this._callDataClearedListeners();
    }

    get data() {
        return this._data[this._currentMode].rows;
    }

    loadNextPage() {
        httpRequester.doGet({
            url: globalValues.apiUrls.GET.SCOREBOARD({
                mode: this._currentMode, 
                pageNumber: this._data[this._currentMode].currentPage + 1
            }),
            callback: (err, resp) => {
                if (!err) {
                    this._addNewData(resp);
                }
            }
        });
    }

    _addNewData(data) {
        this._data[this._currentMode].rows = this._data[this._currentMode].rows.concat(data);
        this._data[this._currentMode].currentPage += 1;
        this._callDataChangedListeners();
    }

// -------------------------------------------------------------------------------
// Events
// -------------------------------------------------------------------------------

    addSwitchToMultiplayerListener(listener) {
        if (!this._switchToMultiplayerListeners) {
            this._switchToMultiplayerListeners = [];
        }

        this._switchToMultiplayerListeners.push(listener);
    }

    addSwitchToSingleplayerListener(listener) {
        if (!this._switchToSingleplayerListeners) {
            this._switchToSingleplayerListeners = [];
        }

        this._switchToSingleplayerListeners.push(listener);
    }

    addDataChangedListener(listener) {
        if (!this._dataChangedListeners) {
            this._dataChangedListeners = [];
        }

        this._dataChangedListeners.push(listener);
    }

    addDataClearedListener(listener) {
        if (!this._dataCleardListeners) {
            this._dataCleardListeners = [];
        }

        this._dataCleardListeners.push(listener);
    }

    _callSwitchToMultiplayerListeners() {
        if(this._switchToMultiplayerListeners) {
            this._callListenersArray(this._switchToMultiplayerListeners);
        }
    }

    _callSwitchToSingleplayerListeners() {
        if(this._switchToSingleplayerListeners) {
            this._callListenersArray(this._switchToSingleplayerListeners);
        }
    }

    _callDataChangedListeners() {
        if(this._dataChangedListeners) {
            this._callListenersArray(this._dataChangedListeners);
        }
    }

    _callDataClearedListeners() {
        if(this._dataCleardListeners) {
            this._callListenersArray(this._dataCleardListeners);
        }
    }

    _callListenersArray(listeners) {
        for (let listener of listeners) {
            listener();
        }
    }
}

const scoreboardModel = new ScoreboardModel();

export default scoreboardModel;