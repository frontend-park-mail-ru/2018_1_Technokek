'use strict';

import globalValues from '../components/gloabalData.js';

class TabModel {
    constructor ({ name = '', title = '', active = false, avaliable = true } = {}) {
        this._name = name;
        this._title = title;
        this._active = active;
        this._avaliable = avaliable;
        this._jsClass = `js-${this._name}-section`;
    }

// ---------------------------------------------------------------------------------
// getters
// ---------------------------------------------------------------------------------

    get title() {
        return this._title;
    }

    get name() {
        return this._name;
    }

    get active() {
        return this._active;
    }

    get avaliable () {
        return this._avaliable;
    }

    get jsClass() {
        return this._jsClass;
    }

// ---------------------------------------------------------------------------------
// setters
// ---------------------------------------------------------------------------------

    set title(value) {
        this._title = this.title;
        this.titleChanged();
    }

    set active(value) {
        this._active = Boolean(value);
        this._activeChanded();
    }

    set avaliable(value) {
        this._avaliable = Boolean(value);
        this._avaliableChanged();
    }

    toggle() {
        this._hidden = !this._hidden;
        this._hiddenChanded();
    }

// ---------------------------------------------------------------------------------
// signals
// ---------------------------------------------------------------------------------

    addTitleListener(listener) {
        if (!this._titleListeners) {
            this._titleListeners = [];
        }

        this._titleListeners.push(listener);
    }

    addActiveListener(listener) {
        if (!this._activeListeners) {
            this._activeListeners = [];
        }

        this._activeListeners.push(listener);
    }

    addAvaliableListener(listener) {
        if (!this._avaliableListeners) {
            this._avaliableListeners = [];
        }

        this._avaliableListeners.push(listener);
    }

    _titleChanged() {
        this._callListenersArray(this._titleListeners);
    }

    _activeChanded() {
        this._callListenersArray(this._activeListeners);
    }

    _avaliableChanged() {
        this._callListenersArray(this._avaliableListeners);
    }

    _callListenersArray(listeners) {
        if (listeners) {
            for (let listener of listeners) {
                listener();
            }       
        }
    }
}

const tabsModels = globalValues.tabsOptions.map((item) => {
    return new TabModel(item);
});

export default tabsModels;