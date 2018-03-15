'use strict';

import profileModel from './profileModel.js';
import tabsModel from './tabsModels.js';

const scoreboardMode = {
    SINGLEPLAYER: 'singleplayer',
    MULTIPLAYER: 'multiplayer'
};

class ScoreboardModel {
    constructor () {
        this._currentMode = scoreboardMode.SINGLEPLAYER;
        this._currentPage = 0;
        this._perPage = 10;
    }

    get mode() {

    }


    
    toSingleplayerMode() {

    }

    toMultiplayerMode() {

    }



    get data() {
        
    }

    addSwitchToMultiplayerListener(listener) {
        if (!this._switchToMultiplayerListeners) {
            this._switchToMultiplayerListeners = [];
        }

        this._switchToSingleplayerListeners.push(listener);
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

export default scoreboardMode;