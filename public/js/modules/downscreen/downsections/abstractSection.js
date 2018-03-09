'use strict';

class AbstractSection {
    constructor(tabModel = {}) {
        this._tabModel = tabModel;
        this._el = document.querySelector(`.${tabModel.jsClass}`);
        this._tabModel.addAvaliableListener(this._onHiddenChanged.bind(this));
        this._tabModel.addActiveListener(this._onHiddenChanged.bind(this));
        

        this._onHiddenChanged();
    }

    _onHiddenChanged() {
        this._el.hidden = !this._tabModel.active || !this._tabModel.avaliable;
    }
}

export default AbstractSection;