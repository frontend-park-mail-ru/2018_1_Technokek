'use strict';

class TabDelegate {
    constructor({
        parent = {},
        tabModel = {}
    } = {}) {
        this._el = parent.element.querySelector(tabModel.jsClass);
    }
}

export default TabDelegate;