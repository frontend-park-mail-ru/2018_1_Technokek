'use strict';

class AbstractSection {
    constructor(tabModel = {}) {
        this._tabModel = tabModel;
        this._el = document.querySelector(`.${tabModel.jsClass}`);
        console.log(tabModel);
        console.log(this._el);
        this._tabModel.addAvaliableListener(this.onHiddenChanged.bind(this));
        this._tabModel.addActiveListener(this.onHiddenChanged.bind(this));
        

        this.onHiddenChanged();
    }

    onHiddenChanged() {
        this._el.hidden = !this._tabModel.active || !this._tabModel.avaliable;
    }


}

export default AbstractSection;